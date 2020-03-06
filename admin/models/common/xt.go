package common

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
)

type XtList struct {
	Id 			int 		`json:"id"`
	Student_id 	int 		`json:"student_id"`
	Teacher_id 	int 		`json:"teacher_id"`
	XtId 		int 		`json:"xt_id"`
	Status 		string 		`json:"status"`
}

func StudentXt(stuId, xtId int, year string) int {
	if err := mysql.Db.Exec("CALL StudentXt(?, ?, ?)", stuId, xtId, year); err.Error != nil {
		return code.ERROR
	}
	return code.SUCCESS
}