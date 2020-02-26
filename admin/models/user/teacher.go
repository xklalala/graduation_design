package user

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pem"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/mlog"
	"byxt/admin/router/request_struct"
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
	return code.USER_LOGIN_SUCCESS, username
}

//修改密码
func TeainUpdatePwd(userId, oldPwd, newPwd string) int {
	var teacher UserTeacher
	codes := code.SUCCESS

	err := mysql.Db.Select("teacher_password").Where("teacher_id = ? ", userId).First(&teacher)

	//出错或用户不存在，均处理为用户不存在
	if err.Error != nil {
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

	return teacher
}
//添加教师
func AdminAddTeacherModel(teacher request_struct.Admin_AddTeacher) int {
	status := code.SUCCESS
	teacher_id, _ := pem.RsaDecrypt(teacher.TeacherID)
	addTeacher := UserTeacher{
		TeacherId:       teacher_id,
		TeacherName:     teacher.TeacherName,
		TeacherPassword: "c9268cca058eede53b7728ebd602efb8",
		PhoneNumber:     teacher.Phone,
		AnotherContact:  teacher.AnotherContact,
		TeacherStatus:   "1",
	}
	if err := mysql.Db.Create(&addTeacher); err.Error != nil {
		status = code.ERROR
	}
	return status
}
//更新教师
func EditTeacher(teacher request_struct.Admin_AddTeacher) int {
	var teachers UserTeacher
	teacher_id, _ := pem.RsaDecrypt(teacher.TeacherID)
	addTeacher := map[string]interface{}{
		"TeacherName":		teacher.TeacherName,
		"TeacherId":		teacher_id,
		"PhoneNumber":  	teacher.Phone,
		"AnotherContact":  	teacher.AnotherContact,
	}
	if err := mysql.Db.Model(&teachers).Where("id = ?", teacher.ID).Update(addTeacher); err.Error != nil {
		fmt.Println(err.Error)
		return code.ERROR
	}
	return code.SUCCESS
}

//删除
func DeleteTeacher(id int) int {
	if err := mysql.Db.Where("id = ?", id).Delete(UserTeacher{}); err.Error != nil {
		return code.ERROR
	}
	return code.SUCCESS
}

//修改状态
func SetStatus(id, status string) int {
	var teachers UserTeacher
	if err := mysql.Db.Model(teachers).Where("id = ?", id).Update("teacher_status", status); err.Error != nil {
		fmt.Println(err.Error)
		return code.ERROR
	}
	return code.SUCCESS
}

//批量导入教师
func TeacherMultipleAddModel(sql string) int {
	err := mysql.Db.Exec(sql)
	if err.Error != nil {
		fmt.Println(err)
		return code.ERROR
	}
	return code.SUCCESS
}


//获取单条教师信息
func Tea_GetTeacherInfo(teacher_id string) (UserTeacher, int) {
	var teacher UserTeacher
	var codes int = code.SUCCESS
	err := mysql.Db.Select("id, teacher_name, phone_number, another_contact").Where("teacher_id = ?", teacher_id).Find(&teacher)
	if err.Error != nil {
		codes = code.ERROR
	}
	return teacher, codes
}

//更新教师（教师）
func Teacher_TeacherUpdate(data request_struct.Teacher_update) int {
	var teacher UserTeacher
	addTeacher := map[string]interface{}{
		"TeacherName":		data.Teacher_name,
		"PhoneNumber":  	data.Phone,
		"AnotherContact":  	data.AnotherContact,
	}
	if err := mysql.Db.Model(&teacher).Where("id = ?", data.ID).Update(addTeacher); err.Error != nil {
		fmt.Println(err.Error)
		return code.ERROR
	}
	return code.SUCCESS
}
