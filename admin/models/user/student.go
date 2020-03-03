package user

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/models/admin"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/mlog"
	"byxt/admin/router/request_struct"
	"fmt"
	"strconv"
	"time"
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

//学生登录 return 状态， student_id, 毕业届
func StuLogin(username, password string) (int, string, int, int) {
	var students Student
	//获取各个年份的系统开放情况
	res, _ := admin.GetSysIsOpen()
	//考虑到大部分登陆的都是当前年届的
	now_year := time.Now().Year()
	//如果月份是10月份之后，毕业年份为下一年
	if time.Now().Month() > 10 {
		now_year += 1
	}
	status := code.USER_LOGIN_SUCCESS

	//如果当前毕业届系统关闭
	if !res[strconv.FormatInt(int64(now_year), 10)] {
		status = code.SYSTEM_CLOSE
	} else {
		sql := fmt.Sprintf("SELECT id,student_id, student_password, student_name FROM xtxt_user_students_%d WHERE student_id = ? LIMIT 1", now_year)
		err := mysql.Db.Raw(sql, username).Scan(&students)
		if err.Error != nil {
			mlog.Info(err.Error)
			status = code.USER_USER_NOT_EXIST
		}

		//用户存在
		if students.Id != 0 {
			//如果用户存在，而且密码错误
			if students.StudentPassword != password {
				fmt.Println("存在")
				return code.USER_USER_OR_PWD_FALSE, "", 0, 0
			} else {
				return code.USER_LOGIN_SUCCESS, students.StudentId, now_year, students.Id
			}
		}
	}

	year := username[0:4]
	year_int, _ := strconv.Atoi(year)
	year_int += 4 //默认学号登陆
	//
	//首先根据学号判断毕业届,不考虑留级的
	if !res[strconv.FormatInt(int64(year_int), 10)] {
		status = code.SYSTEM_CLOSE
	} else {
		sql := fmt.Sprintf("SELECT id, student_password, student_name FROM xtxt_user_students_%d WHERE student_id = ? LIMIT 1", year_int)
		err := mysql.Db.Raw(sql, username).Scan(&students)
		if err.Error != nil {
			mlog.Info(err.Error)
			status = code.USER_USER_NOT_EXIST
		}

		//用户存在
		if students.Id != 0 {
			//如果用户存在，而且密码错误
			if students.StudentPassword != password {
				return code.USER_USER_OR_PWD_FALSE, "", 0, 0
			} else {
				status = code.USER_LOGIN_SUCCESS
			}
		}
	}

	return status, students.StudentId, year_int, students.Id
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
	years , _ := strconv.Atoi(year)
	if err := mysql.Db.Exec(fmt.Sprintf("INSERT INTO xtxt_user_students_%d (student_id, phone_number, another_contact, student_name) VALUES('%s', '%s', '%s', '%s')",
		years, stu.StudentId, stu.PhoneNumber, stu.AnotherContact, stu.StudentName));
	err.Error != nil {
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
	sql = " CALL create_student_table(\""+ table_name +"\")"
	err := mysql.Db.Exec(sql)
	if err.Error != nil {
		fmt.Println(err)
		return code.ERROR
	}
	return code.SUCCESS
}