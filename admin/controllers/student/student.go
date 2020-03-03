package student

import (
	"byxt/admin/inits/redis"
	"byxt/admin/models/common"
	"byxt/admin/pkg/code"
	"github.com/gin-gonic/gin"
	"net/http"
)

//获取学生所有可以选择的题目
func GetAllXtList(c *gin.Context) {
	//从goken获取到学生毕业届
	token := c.Request.Header.Get("token")
	if data, err := redis.GetUserRedisInfo(token); err != nil {
		code.R(http.StatusOK, code.TOKEN_TIME_OUT, data, c)
	} else {
		res, codes := common.Stu_GetAllXt(data[4])
		code.R(http.StatusOK, codes, res, c)
	}
}

//学生获取选题情况
func GetStudentXtStatus(c *gin.Context) {
	token := c.Request.Header.Get("token")
	if data, err := redis.GetUserRedisInfo(token); err != nil {
		code.R(http.StatusOK, code.TOKEN_TIME_OUT, data, c)
	} else {
		res, codes := common.Stu_GetAllXt(data[4])
		code.R(http.StatusOK, codes, res, c)
	}
}
