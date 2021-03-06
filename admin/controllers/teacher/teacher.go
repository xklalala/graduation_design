package teacher

import (
	"byxt/admin/inits/redis"
	"byxt/admin/models/teacher"
	"byxt/admin/models/user"
	"byxt/admin/pkg/code"
	"byxt/admin/router/request_struct"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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

//新增选题
func TeaC_AddXt(c *gin.Context) {
	var codes int = code.SUCCESS
	var parms request_struct.Teacher_add_xt
	if err := c.ShouldBind(&parms); err != nil {
		codes = code.REQUEST_PARMS_ERROR
	} else {
		token := c.Request.Header.Get("token")
		data,_ := redis.GetUserRedisInfo(token)
		if len(data) < 5 {
			codes = code.TOKEN_TIME_OUT
		}
		teacher_id, _ := strconv.Atoi(data[5])
		codes = teacher.TeaM_AddXt(parms, c.Param("year"), teacher_id)
	}
	code.R(http.StatusOK, codes, "", c)
}
//修改选题
func TeaC_UpdateXt(c *gin.Context) {
	var codes int = code.SUCCESS
	var parms request_struct.Teacher_add_xt
	if err := c.ShouldBind(&parms); err != nil {
		codes = code.ERROR
	} else {
		codes = teacher.TeaM_Update(parms)
	}
	code.R(http.StatusOK, codes, "", c)
}
//删除选题
func TeaC_DeleteXt(c *gin.Context) {
	var codes int = code.SUCCESS
	var msg string = ""
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		codes = code.REQUEST_PARMS_ERROR
	} else {
		token := c.Request.Header.Get("token")
		data,_ := redis.GetUserRedisInfo(token)
		tea_id, _ := strconv.Atoi(data[5])
		codes, msg = teacher.TeaM_XtDelete(id, tea_id)
		fmt.Print(id)
	}
	code.R(http.StatusOK, codes, map[string]interface{}{"msg":msg}, c)
}
//获取自己的选题
func TeaC_GetXt(c *gin.Context) {
	token := c.Request.Header.Get("token")
	data,_ := redis.GetUserRedisInfo(token)
	teacher_id, _ := strconv.Atoi(data[5])
	codes, res := teacher.TeaM_XtGetAll(c.Param("year"), teacher_id)
	code.R(http.StatusOK, codes, res, c)
}

//教师获取选了选题的学生列表
func TeaC_GetXt_Stu_List(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	year := c.Param("year")
	codes, data := teacher.TeaM_GetSelectStu(id, year)
	code.R(http.StatusOK, codes, data, c)
}

//教师选择学生
func TeaC_Select_Stu(c *gin.Context) {
	var data request_struct.Teacher_Select_Stu
	var codes int = code.SUCCESS
	if err := c.ShouldBind(&data); err != nil {
		codes = code.ERROR
	} else {
		codes = teacher.TeaM_Select_Stu(data.Id, data.XtId)
	}
	code.R(http.StatusOK, codes, data, c)
}