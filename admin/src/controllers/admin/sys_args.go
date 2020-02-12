package admin

import (
	"byxt/admin/pkg/code"
	"byxt/admin/router/request_struct"
	"byxt/admin/src/models/admin"
	"github.com/gin-gonic/gin"
	"net/http"
)

//设置学生系统是否开放
func SetStuEnterStatus(c *gin.Context) {
	var status request_struct.SetEnterStatus
	if err := c.ShouldBind(&status); err != nil {
		code.R(http.StatusOK, code.REQUEST_PARMS_ERROR,"", c)
	} else {
		var codes int
		err := admin.SetStudent(status.Status)
		if err != nil {
			codes = code.ERROR
		} else {
			codes = code.SUCCESS
		}
		code.R(http.StatusOK, codes, "", c)
	}
}

//设置教师系统是否开放
func SetTeaEnterStatus(c *gin.Context) {
	var status request_struct.SetEnterStatus
	if err := c.ShouldBind(&status); err != nil {
		code.R(http.StatusOK, code.REQUEST_PARMS_ERROR,"", c)
	} else {
		var codes int
		err := admin.SetTeacher(status.Status)
		if err != nil {
			codes = code.ERROR
		} else {
			codes = code.SUCCESS
		}
		code.R(http.StatusOK, codes, "", c)
	}
}
