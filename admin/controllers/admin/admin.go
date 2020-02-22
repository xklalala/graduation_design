package admin

import (
	"byxt/admin/models/user"
	"byxt/admin/pem"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/upfile"
	"byxt/admin/pkg/util"
	"byxt/admin/router/request_struct"
	"fmt"
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

//更新秘钥
func UpdateSecretKey(c *gin.Context) {
	var codes int
	if err := pem.GenRsaKey(1024); err != nil {
		codes = code.ERROR
	} else {
		codes = code.SUCCESS
	}
	code.R(http.StatusOK, codes, "", c)
}

//批量添加教师账号
func TeacherMultipleAdd(c *gin.Context) {
	//获取文件名以及文件读取状态
	filename, err, codes := upfile.Upfile(c)
	if err != nil {
		//上传文件出错
		code.R(http.StatusOK, codes, "", c)
		return

	} else {
		//获取sql语句
		sql, err := util.ExcelGetSql([]string{"teacher_name", "teacher_id"}, "xtxt_user_teacher", filename)
		if err != nil {
			fmt.Println(err)
		}
		codes = user.TeacherMultipleAddModel(sql)
	}
	code.R(http.StatusOK, codes, "", c)
}