package admin

import (
	"byxt/admin/models/admin"
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
	id, err := strconv.Atoi(c.Param("id"))
	var status int
	if err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		status = user.DeleteTeacher(id)
	}
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
		fmt.Println("文件出错")
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

//管理员重置教师密码
func Admin_ResertTeaPwd(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	var status int
	if err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		status = user.TeaResertPwd(id)
	}
	code.R(http.StatusOK, status, "", c)
}


//创建学生表（添加年份）
func Admin_AddStudentYear(c *gin.Context) {
	year, err := strconv.Atoi(c.Param("year"))
	var status int
	if err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		status = user.CreateTable(year)
		if status == code.SUCCESS {
			status = admin.StuTabAdd(year)
		} else {
			status = code.ERROR
		}

	}
	code.R(http.StatusOK, status, "", c)
}
//获取学生年份列表
func Admin_StuYearList(c *gin.Context) {
	status, data := admin.StuTabAll()
	code.R(http.StatusOK, status, data, c)
}

//获取具体年份的学生列表
func Admin_StuGetStuList(c *gin.Context) {
	year, err := strconv.Atoi(c.Param("year"))
	var status int
	var data []user.Student
	if err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		status, data = user.Admin_GetStuList(year)
	}
	code.R(http.StatusOK, status, data, c)
}

//新增学生账号
func Admin_AddStu(c *gin.Context) {
	var student request_struct.Admin_AddStu
	var status int
	if err := c.ShouldBind(&student); err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		//新增逻辑
		status = user.StudentAdd(student, c.Param("year"))
	}
	code.R(http.StatusOK, status, "", c)
}
//批量导入学生账号
func Admin_MultipleAddStu(c *gin.Context) {
	year := c.Param("year")
	//获取文件名以及文件读取状态
	filename, err, codes := upfile.Upfile(c)
	if err != nil {
		//上传文件出错
		code.R(http.StatusOK, codes, "", c)
		return

	} else {
		//获取sql语句
		sql, err := util.ExcelGetSql([]string{"student_name", "student_id", "student_class_name"}, "xtxt_user_students_" + year, filename)
		if err != nil {
			fmt.Println(err)
		}
		codes = user.StudentMultipleAddModel(sql)
	}
	code.R(http.StatusOK, codes, "", c)
}

//修改学生信息
func Admin_UpdateStu(c *gin.Context) {
	var student request_struct.Admin_AddStu
	var status int
	if err := c.ShouldBind(&student); err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		//修改逻辑
	}
	code.R(http.StatusOK, status, "", c)
}

//设置学生账号状态
func SetStudentYearStatus(c *gin.Context) {
	var status int = code.SUCCESS
	var setStatus request_struct.UserStatus
	//判断请求参数是否正确
	if err := c.ShouldBind(&setStatus); err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		//请求逻辑
		status = admin.SetStudentYearStatus(setStatus.Id, setStatus.Status)
	}
	code.R(http.StatusOK, status, "", c)
}

//重置学生密码
func Admin_ResertStuPwd(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	var status int
	if err != nil {
		status = code.REQUEST_PARMS_ERROR
	} else {
		status = admin.Admin_resert_stu_pwd(id, c.Param("year"))
	}
	code.R(http.StatusOK, status, "", c)
}

//删除学生
func DeleteStudent(c *gin.Context) {
	codes, msg := user.StudentDelete(c.Param("id"), c.Param("year"))
	code.R(http.StatusOK, codes, map[string]interface{}{"msg": msg}, c)
}