package admin

import (
	"byxt/admin/inits/redis"
	"byxt/admin/pkg/code"
	"byxt/admin/router/request_struct"
	"byxt/admin/src/models/admin"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

//设置学生系统是否开放
func SetStuEnterStatus(c *gin.Context) {
	var status request_struct.SetEnterStatus
	if err := c.ShouldBind(&status); err != nil {
		code.R(http.StatusOK, code.REQUEST_PARMS_ERROR,"", c)
	} else {
		var codes int
		fmt.Print(status.Status)

		err := admin.SetStudent(status.Status)
		if err != nil {
			codes = code.ERROR
		} else {
			codes = code.SUCCESS
			redis.Set("STUDENT_ENTRY", status.Status, int(time.Second * 30))
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
			fmt.Printf(status.Status)
			redis.Set("TEACHER_ENTRY", status.Status, int(time.Second * 30))
		}
		code.R(http.StatusOK, codes, "", c)
	}
}

func GetSutTeaStatus(c *gin.Context) {
	data, err := admin.GetStuAndTeaStatus()
	var codes int
	if err != nil {
		fmt.Print(err)
		codes = code.SERVER_ERROR
	}
	codes = code.SUCCESS
	code.R(http.StatusOK, codes, data, c)

}