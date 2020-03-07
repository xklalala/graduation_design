package common

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
)

type Msg struct {
	Msg 	string  `json:"msg"`
	Num 	int `json:"num"`
	Codes 	int 	`json:"codes"`
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
func StudentXt(stuId, xtId int, year string) (int, int, string) {
	var msg Msg
	if err := mysql.Db.Raw("CALL StudentXt(?, ?, ?)", stuId, xtId, year).Scan(&msg); err.Error != nil {
		return code.ERROR, 0, ""
	}
	return msg.Codes, msg.Num, msg.Msg
}

//学生获取自己的选题
func StudentGetSelfXt(stuId int, year string)(int, []StudentSelfXt) {
	var xtlist []StudentSelfXt
	var codes int = code.SUCCESS
	err := mysql.Db.Raw("call stu_get_self_xt(?, ?)", stuId, year).Scan(&xtlist)

	if err.Error != nil {
		codes = code.SUCCESS
	}
	return codes, xtlist
}
//学生删除选题
func StudentDeleteXt(stuId, id int, year string) (int , string){
	var msg Msg
	if err := mysql.Db.Raw("call stu_delete_xt(?, ?, ?)", stuId, id, year).Scan(&msg); err.Error != nil {
		return code.ERROR, ""
	} else {
		return msg.Codes, msg.Msg
	}
}