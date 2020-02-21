package admin

import (
	"byxt/admin/models/user"
	"byxt/admin/pkg/code"
	"byxt/admin/router/request_struct"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

//新增教师（单条）
func Admin_AddTeacher(c *gin.Context) {
	var teacher request_struct.Admin_AddTeacher
	status := code.SUCCESS
	if err := c.ShouldBind(&teacher); err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		status = user.AdminAddTeacherModel(teacher)
	}
	code.R(http.StatusOK, status, "", c)
}

//修改教师
func Admin_UpdateTeacher(c *gin.Context) {
	var teacher request_struct.Admin_AddTeacher
	status := code.SUCCESS
	if err := c.ShouldBind(&teacher); err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		status = user.EditTeacher(teacher)
	}
	code.R(http.StatusOK, status, "", c)
}

//删除
func Admin_DeleteTeacher(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	status := user.DeleteTeacher(id)
	code.R(http.StatusOK, status, "", c)
}

func SetTeacherStatus(c *gin.Context) {
	var parms request_struct.UserStatus
	status := code.SUCCESS
	if err := c.ShouldBind(&parms); err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		status = user.SetStatus(parms.Id, parms.Status)
	}
	code.R(http.StatusOK, status, "", c)
}