package common

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
)

type Nums struct {
	Num int `json:"num"`
}

type XtList struct {
	Id 			int 		`json:"id"`
	Student_id 	int 		`json:"student_id"`
	Teacher_id 	int 		`json:"teacher_id"`
	XtId 		int 		`json:"xt_id"`
	Status 		string 		`json:"status"`
}

//学生查询自己的选题信息
type StudentSelfXt struct {
	Id 			int    `json:"id"`
	Title 		string `json:"title"`
	Hard 		string `json:"hard"`
	XtType 		string `json:"xt_type"`
	Describe 	string `json:"describe"`
	TeacherName string `json:"teacher_name"`
	Status		string `json:"status"`
}

//学生获取所有选题
func StudentXt(stuId, xtId int, year string) (int, int) {
	var num Nums
	if err := mysql.Db.Raw("CALL StudentXt(?, ?, ?)", stuId, xtId, year).Scan(&num); err.Error != nil {
		return code.ERROR, 0
	}
	return code.SUCCESS, num.Num
}

//学生获取自己的选题
func StudentGetSelfXt(stuId int, year string)(int, []StudentSelfXt) {
	var xtlist []StudentSelfXt
	var codes int = code.SUCCESS
	err := mysql.Db.Exec("SELECT list.id, main.title, main.hard, main.xt_type, main.`describe`, tea.teacher_name, list.`status` " +
		"FROM xtxt_xt_list list, xtxt_xt_main main,xtxt_user_teacher tea " +
		"WHERE list.student_id = ? AND list.year = ? AND list.xt_id = main.id AND list.teacher_id = tea.id", stuId, year).Scan(&xtlist)

	if err.Error != nil {
		codes = code.SUCCESS
	}
	return codes, xtlist

}