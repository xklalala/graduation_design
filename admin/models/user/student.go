package user

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/mlog"
	"fmt"
)

type Student struct {
	StudentId       string `json:"student_id"`
	StudentPassword string `json:"student_password"`
	PhoneNumber     string `json:"phone_number"`
	AnotherContact  string `json:"another_contact"`
	Status          string `json:"status"`
	StudentName     string `json:"student_name"`
}

//学生登录
func StuLogin(username, password string) (int, string) {
	var student Student
	year := username[0:4]
	sql := fmt.Sprintf("SELECT student_password, student_name FROM xtxt_user_students_%s WHERE student_id = ? LIMIT 1", year)
	err := mysql.Db.Raw(sql, username).Scan(&student)

	if err.Error != nil {
		mlog.Info(err.Error)
		return code.USER_USER_NOT_EXIST, ""
	}
	if student.StudentPassword != password {
		return code.USER_USER_OR_PWD_FALSE, ""
	}
	return code.USER_LOGIN_SUCCESS, student.StudentName
}

//修改密码
func StuUpdatePwd(userId, oldPwd, newPwd string) int {
	var student Student
	year := userId[0:4]
	codes := code.SUCCESS

	sql := fmt.Sprintf("SELECT student_password FROM xtxt_user_students_%s WHERE student_id = ? LIMIT 1", year)
	err := mysql.Db.Raw(sql, userId).Scan(&student)
	if err.Error != nil {
		mlog.Info(err.Error)
		return code.USER_USER_NOT_EXIST
	}
	//新旧密码不相等
	if student.StudentPassword != oldPwd {
		return code.PASSWORD_NOT_EQUALS
	}

	sql = fmt.Sprintf("UPDATE xtxt_user_students_%s SET student_password = ? WHERE student_id = ?", year)
	 if err := mysql.Db.Raw(sql, newPwd, userId); err.Error != nil {
	 	return code.ERROR
	 }

	return codes
}