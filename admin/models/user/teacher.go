package user

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/mlog"
	"fmt"
)

type UserTeacher struct {
	Id				string `json:"id"`
	TeacherId       string `json:"teacher_id"`
	TeacherName     string `json:"teacher_name"`
	TeacherPassword string `json:"teacher_password"`
	PhoneNumber     string `json:"phone_number"`
	AnotherContact  string `json:"another_contact"`
	TeacherStatus   string `json:"teacher_status"`
}

//教师登录
func TeacherLogin(username, password string) (int, string) {
	var teacher UserTeacher
	err := mysql.Db.Select("teacher_password, teacher_name").Where("teacher_id = ?", username).First(&teacher)
	if err.Error != nil {
		mlog.Info(err.Error)
		return code.USER_USER_NOT_EXIST, ""
	}
	if teacher.TeacherPassword != password {
		return code.USER_USER_OR_PWD_FALSE, ""
	}
	return code.USER_LOGIN_SUCCESS, teacher.TeacherName
}

//修改密码
func TeainUpdatePwd(userId, oldPwd, newPwd string) int {
	var teacher UserTeacher
	codes := code.SUCCESS

	err := mysql.Db.Select("teacher_password").Where("teacher_id = ? ", userId).First(&teacher)

	//出错或用户不存在，均处理为用户不存在
	if err != nil {
		mlog.Info(err.Error)
		codes = code.USER_USER_NOT_EXIST
		return codes
	}

	//判断旧密码是否相等
	if teacher.TeacherPassword == oldPwd {
		err = mysql.Db.Model(&teacher).Where("teacher_id = ?", userId).Update("teacher_password", newPwd)
		if err != nil {
			codes = code.ERROR
		}
		//修改成功
		codes = code.SUCCESS
	} else {
		codes = code.PASSWORD_NOT_EQUALS
	}
	return codes
}

//获取所有教师信息
func AdminGetAllTeachrs() []UserTeacher{
	var teacher []UserTeacher
	err := mysql.Db.Select("id, teacher_id, teacher_name, phone_number, another_contact, teacher_status").Where("id > 0").Find(&teacher)
	if err != nil {
		fmt.Println(err.Error)
	}
	for _, v := range teacher {
		fmt.Println(v)
	}
	return teacher

}