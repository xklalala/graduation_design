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

//获取学生列表
func Admin_GetStuList(year int) (int, []Student) {
	var students []Student
	if err := mysql.Db.Raw("SELECT * FROM xtxt_user_student_?", year).Scan(&students); err.Error != nil {
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
		"INSERT INTO xtxt_user_student_? (student_id, phone_number, another_contact, student_name) VALUES(`?`, `?`, `?`, `?`)",
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
		"UPDATE xtxt_user_student_? SET " +
			"student_id = `?`, phone_number = `?`, another_contact = `?`, student_name = `?` Where id = ?",
		year, stu.StudentId, stu.PhoneNumber, stu.AnotherContact, stu.StudentName, stu.ID);
		err != nil {
		status = code.ERROR
	}
	return status
}

func StudentSetStatus(id, year, setStatus string) int {
	var status int = code.SUCCESS
	if err := mysql.Db.Exec(
		"UPDATE xtxt_user_student_? SET " +
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
	sql =  "DROP TABLE IF EXISTS `" + table_name + "`;"
	sql += "CREATE TABLE `" + table_name + "`  ("
	sql += "`id` int(10) NOT NULL AUTO_INCREMENT,"
	sql += "`student_id` char(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学生学号',"
	sql += "`student_name` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,"
	sql += "`student_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'c9268cca058eede53b7728ebd602efb8' COMMENT '密码默认为12345678',"
	sql += "`student_class_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '班级',"
	sql += "`phone_number` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学生手机号',"
	sql += "`another_contact` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '其它联系方式',"
	sql += "`status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号状态，0 禁用， 1 正常',"
	sql += "PRIMARY KEY (`id`) USING BTREE,"
	sql += "UNIQUE INDEX `stu_id`(`student_id`) USING BTREE"
	sql += ") ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '学生表,学生表这里根据年份自建  byxt_user_students_2020' ROW_FORMAT = Dynamic;"

	err := mysql.Db.Exec(sql)
	if err.Error != nil {
		fmt.Println(err)
		return code.ERROR
	}
	return code.SUCCESS
}