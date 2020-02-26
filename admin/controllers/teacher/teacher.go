package teacher

import (
	"byxt/admin/models/user"
	"byxt/admin/pkg/code"
	"byxt/admin/router/request_struct"
	"github.com/gin-gonic/gin"
	"net/http"
)
//获取教师信息
func GetTeacherInfo(c *gin.Context) {
	teacher, codes := user.Tea_GetTeacherInfo(c.Param("teacher_id"))
	code.R(http.StatusOK, codes, teacher, c)
}
//更新信息
func SetTeacherInfo(c *gin.Context) {
	var codes int = code.SUCCESS
	var teacher request_struct.Teacher_update
	if err := c.ShouldBind(&teacher); err != nil {
		codes = code.ERROR
	} else {
		codes = user.Teacher_TeacherUpdate(teacher)
	}
	code.R(http.StatusOK, codes, "", c)
}
//更新密码
func Teacher_UpdatePwd(c *gin.Context) {

}