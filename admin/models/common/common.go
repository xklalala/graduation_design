package common

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"fmt"
)

type GetXtList struct {
	Id 			int    `json:"id"`
	Title 		string `json:"title"`
	Hard 		string `json:"hard"`
	XtType 		string `json:"xt_type"`
	Describe 	string `json:"describe"`
	Status 		string `json:"status"`
	TeacherName string `json:"teacher_name"`
}


//学生获取所有选题(这个地方需要缓存)
func Stu_GetAllXt(year string) ([]GetXtList, int) {


	codes := code.SUCCESS
	var data []GetXtList
	if err := mysql.Db.Raw("call STU_GET_XT(?)", year).Scan(&data); err.Error != nil {
		codes = code.ERROR
		fmt.Print(err.Error)
	}
	return data, codes
}