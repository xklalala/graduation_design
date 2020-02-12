package user

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/mlog"
)
type UserTeacher struct {
	TeacherId 		string `json:"teacher_id"`
	TeacherPassword string `json:"teacher_password"`
	PhoneNumber 	string `json:"phone_number"`
	AnotherContact 	string `json:"another_contact"`
	TeacherStatus 	string `json:"teacher_status"`
}

func TeacherLogin(username, password string) int {
	var teacher UserTeacher
	err := mysql.Db.Select("teacher_password").Where("teacher_id = ?", username).First(&teacher)
	if err.Error != nil {
		mlog.Info(err.Error)
		return code.USER_USER_NOT_EXIST
	}
	if teacher.TeacherPassword != password {
		return code.USER_USER_OR_PWD_FALSE
	}
	return code.USER_LOGIN_SUCCESS
}