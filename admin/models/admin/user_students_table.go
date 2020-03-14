package admin

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/inits/redis"
	"byxt/admin/pkg/code"
	"fmt"
	"strconv"
)

type UserStudentsTable struct {
	Id 		int 	`json:"id"`
	Year 	int 	`json:"year"`
	Number 	int 	`json:"number"`
	Status 	string 	`json:"status" gorm:"default:'1'"`
	
}
//添加年份
func StuTabAdd(year int) int {
	var model UserStudentsTable = UserStudentsTable{
		Year:   year,
	}
	model.Year = year
	var codes int = code.SUCCESS
	if err := mysql.Db.Create(&model); err.Error != nil {
		codes = code.ERROR
	}
	return codes
}
//获取所有信息
func StuTabAll() (int, []UserStudentsTable) {
	var list []UserStudentsTable
	if err:= mysql.Db.Order("year desc").Find(&list); err.Error != nil {
		return code.ERROR, []UserStudentsTable{}
	} else {
		return code.SUCCESS, list
	}
}
//设置一届学生，系统开放状态
func SetStudentYearStatus(id, status string) int {
	var tables UserStudentsTable
	if err := mysql.Db.Model(tables).Where("id = ?", id).Update("status", status); err.Error != nil {
		fmt.Println(err.Error)
		return code.ERROR
	}
	return code.SUCCESS
}

//更新学生密码
func Admin_resert_stu_pwd(id int, year string) int {
	sql := "UPDATE xtxt_user_students_" + year + " SET student_password = ? WHERE id = ?"
	if err := mysql.Db.Exec(sql, "c9268cca058eede53b7728ebd602efb8", id); err.Error != nil {
		return code.ERROR
	}
	return code.SUCCESS
}

//获得系统是否开放
func GetSysIsOpen() (map[string]bool, error){
	//首先从redis中读取数据状态
	res, err := redis.StuGetEntry("tea")
	if err != nil {
		fmt.Println("tea " ,err)
	}
	if len(res) == 0 {
		var tables []UserStudentsTable
		if err := mysql.Db.Find(&tables); err.Error != nil {
			return map[string]bool{}, err.Error
		}
		for _, v := range tables {
			redis.Hset("stu", strconv.Itoa(v.Year), v.Status, 30*60)
		}
	} else {
		return res, nil
	}
	res, _ = redis.StuGetEntry("stu")
	return res, nil
}
