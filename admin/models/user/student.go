package user

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/mlog"
	"byxt/admin/router/request_struct"
	"fmt"
	"strconv"
)

type Student struct {
	Id 					int    `json:"id"`
	StudentId       	string `json:"student_id"`
	StudentPassword 	string `json:"student_password"`
	PhoneNumber     	string `json:"phone_number"`
	AnotherContact  	string `json:"another_contact"`
	StudentClassName  	string `json:"class_name"`
	Status          	string `json:"status"`
	StudentName     	string `json:"student_name"`
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

//获取学生列表
func Admin_GetStuList(year int) (int, []Student) {
	var students []Student
	if err := mysql.Db.Raw(
		fmt.Sprintf(
			"SELECT id, student_id, student_name, student_class_name, phone_number, another_contact" +
				"  FROM xtxt_user_students_%d",
			year)).Scan(&students); err.Error != nil {
		fmt.Println(err.Error)
		return code.ERROR, []Student{}
	} else {
		return code.SUCCESS, students
	}
}
//批量导入学生
func StudentMultipleAddModel(sql string) int {
	err := mysql.Db.Exec(sql)
	if err.Error != nil {
		fmt.Println(err)
		return code.ERROR
	}
	return code.SUCCESS
}

//添加学生（单个）
func StudentAdd(stu request_struct.Admin_AddStu, year string) int {
	var status int = code.SUCCESS
	if err := mysql.Db.Exec(
		"INSERT INTO xtxt_user_students_? (student_id, phone_number, another_contact, student_name) VALUES(`?`, `?`, `?`, `?`)",
		year, stu.StudentId, stu.PhoneNumber, stu.AnotherContact, stu.StudentName);
	err != nil {
		status = code.ERROR
	}
	return status
}
//更新学生信息
func StudetUpdate(stu request_struct.Admin_AddStu, year string) int {
	var status int = code.SUCCESS
	if err := mysql.Db.Exec(
		"UPDATE xtxt_user_students_? SET " +
			"student_id = `?`, phone_number = `?`, another_contact = `?`, student_name = `?` Where id = ?",
		year, stu.StudentId, stu.PhoneNumber, stu.AnotherContact, stu.StudentName, stu.ID);
		err != nil {
		status = code.ERROR
	}
	return status
}

//删除
func StudentDelete(id, year string) int {
	var codes int = code.SUCCESS

	if err := mysql.Db.Exec(fmt.Sprintf("DELETE FROM xtxt_user_students_%s WHERE id = %s", year, id)); err.Error != nil {
		codes = code.ERROR
	}


	return codes
}

func StudentSetStatus(id, year, setStatus string) int {
	var status int = code.SUCCESS
	if err := mysql.Db.Exec(
		"UPDATE xtxt_user_students_? SET " +
			"status = `?`" +
			"WHERE id = ?",
		year, setStatus, id);
		err != nil {
		status = code.ERROR
	}
	return status
}

//创建学生表
func CreateTable(year int) int {
	var sql string
	table_name := "xtxt_user_students_" + strconv.Itoa(year)
	sql = "DROP TABLE IF EXISTS "+ table_name +"; CREATE TABLE " + table_name + " LIKE xtxt_user_students_base"
	err := mysql.Db.Exec(sql)
	if err.Error != nil {
		fmt.Println(err)
		return code.ERROR
	}
	return code.SUCCESS
}