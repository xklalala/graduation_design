package student

import (
	"byxt/admin/inits/redis"
	"byxt/admin/models/common"
	"byxt/admin/pkg/code"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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

//学生选题
func StudentSelectXt(c *gin.Context) {

	token := c.Request.Header.Get("token")
	if data, err := redis.GetUserRedisInfo(token); err != nil {
		code.R(http.StatusOK, code.TOKEN_TIME_OUT, data, c)
	} else {
		id,err:=strconv.Atoi(c.Param("id"))
		var codes, num int
		var msg string
		if err != nil {
			codes = code.REQUEST_PARMS_ERROR
		} else {
			stuId,_:=strconv.Atoi(data[5])
			codes, num, msg = common.StudentXt(stuId, id, data[4])
		}

		code.R(http.StatusOK, codes, map[string]interface{}{"num": num, "msg":msg}, c)
	}
}
//学生获取自己的选题
func StudentGetXtSelf(c *gin.Context) {
	token := c.Request.Header.Get("token")
	if data, err := redis.GetUserRedisInfo(token); err != nil {
		code.R(http.StatusOK, code.TOKEN_TIME_OUT, data, c)
	} else {
		stuId,_:=strconv.Atoi(data[5])
		cdoes, data := common.StudentGetSelfXt(stuId, data[4])
		code.R(http.StatusOK, cdoes, data, c)
	}
}

//学生删除选题
func StudentDeleteXt(c *gin.Context) {
	token := c.Request.Header.Get("token")
	if data, err := redis.GetUserRedisInfo(token); err != nil {
		code.R(http.StatusOK, code.TOKEN_TIME_OUT, data, c)
	} else {
		xtId,err :=strconv.Atoi(c.Param("id"))
		if err != nil {
			code.R(http.StatusOK, code.REQUEST_PARMS_ERROR, "", c)
		} else {
			stuId,_:=strconv.Atoi(data[5])
			codes, msg := common.StudentDeleteXt(stuId, xtId, data[4])
			code.R(http.StatusOK, codes, map[string]interface{}{"msg":msg}, c)
		}
	}
}