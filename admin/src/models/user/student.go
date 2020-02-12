package user

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/mlog"
	"fmt"
)

type Student struct {
	StudentId 		string `json:"student_id"`
	StudentPassword string `json:"student_password"`
	PhoneNumber 	string `json:"phone_number"`
	AnotherContact 	string `json:"another_contact"`
	Status 			string `json:"status"`
}

//学生登录
func StuLogin(username, password string) int {
	var student Student
	year := username[0: 4]
	str := fmt.Sprintf("SELECT student_password FROM xtxt_user_students_%s WHERE student_id = ? LIMIT 1", year)
	err := mysql.Db.Raw(str, username).Scan(&student)
	if err.Error != nil {
		fmt.Println(err.Error)
	}
	if err.Error != nil {
		mlog.Info(err.Error)
		return code.USER_USER_NOT_EXIST
	}
	if student.StudentPassword != password {
		return code.USER_USER_OR_PWD_FALSE


	}
	return code.USER_LOGIN_SUCCESS
}