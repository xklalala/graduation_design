package admin

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/models/user"
	"byxt/admin/pkg/code"
)

type UserStudentsTable struct {
	Id 		int 	`json:"id"`
	Year 	int 	`json:"year"`
	Number 	int 	`json:"number"`
	Status 	string 	`json:"status"`
	
}
//添加年份
func StuTabAdd(year int) int {
	var model UserStudentsTable
	model.Year = year
	codes := user.CreateTable(year)
	if codes == code.SUCCESS {
		if err := mysql.Db.Create(model); err.Error != nil {
			codes = code.ERROR
		}
	}
	return codes
}
//获取所有信息
func StuTabAll() (int, []UserStudentsTable) {
	var list []UserStudentsTable
	if err:= mysql.Db.Select("*").Find(&list); err.Error != nil {
		return code.ERROR, []UserStudentsTable{}
	} else {
		return code.SUCCESS, list
	}
}