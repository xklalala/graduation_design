package teacher

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"byxt/admin/router/request_struct"
	"fmt"
)

type XtMain struct {
	Id 			int    `json:"id"`
	Title 		string `json:"title"`
	TeacherId   int `json:"teacher_id"`
	Hard 		string `json:"hard"`
	StudentId 	string `json:"student_id"`
	XtType 		string `json:"xt_type"`
	Describe 	string `json:"describe"`
	Year 		string `json:"year"`
	status 		string `json:"status"`
}
//新增
func TeaM_AddXt(parms request_struct.Teacher_add_xt, year string, teacher_id int) int {
	if len(year) < 4 {
		return code.REQUEST_PARMS_ERROR
	}
	xtmain := XtMain{
		Title:     parms.Title,
		Hard:      parms.Hard,
		XtType:    parms.Type,
		Describe:  parms.Describe,
		Year:      year,
		TeacherId: teacher_id,
	}
	if err := mysql.Db.Create(&xtmain); err.Error != nil {
		fmt.Println(err.Error)
		return code.ERROR
	}  else {
		return code.SUCCESS
	}
}
//修改
func TeaM_Update(parms request_struct.Teacher_add_xt) int {
	update := map[string]interface{}{
		"title": parms.Title,
		"Hard": parms.Hard,
		"xt_type": parms.Type,
		"describe": parms.Describe,
	}
	var xt XtMain
	if err := mysql.Db.Where("id = ?", parms.Id).Model(&xt).Update(update); err != nil {
		return code.ERROR
	}else {
		return code.SUCCESS
	}
}

//删除
func TeaM_XtDelete(id, tea_id int) int {
	if err := mysql.Db.Where("id = ? AND teacher_id = ?", id, tea_id).Delete(XtMain{}); err.Error != nil {
		return code.ERROR
	} else {
		return code.SUCCESS
	}
}
//获取所有信息
func TeaM_XtGetAll(year string, tea_id int) (int, []XtMain) {
	var data []XtMain
	if err:= mysql.Db.Select("id, title, hard, student_id, xt_type, `describe`, status").Where("year = ? AND teacher_id = ?", year, tea_id).Find(&data); err.Error != nil {
		return code.ERROR, []XtMain{}
	}
	return code.SUCCESS, data
}

