package teacher

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"byxt/admin/router/request_struct"
	"fmt"
)

type XtMain struct {
	Id 					int    `json:"id"`
	Title 				string `json:"title"`
	TeacherId   		int    `json:"teacher_id"`
	Hard 				string `json:"hard"`
	StudentId 			string `json:"student_id"`
	XtType 				string `json:"xt_type"`
	Describe 			string `json:"describe"`
	Year 				string `json:"year"`
	Status 				string `json:"status"`

}

type tea_getInfo struct {
	Id 					int    `json:"id"`
	Title 				string `json:"title"`
	TeacherId   		int    `json:"teacher_id"`
	Hard 				string `json:"hard"`
	StudentId 			string `json:"student_id"`
	StudentName 		string `json:"student_name"`
	XtType 				string `json:"xt_type"`
	Describe 			string `json:"describe"`
	Year 				string `json:"year"`
	Status 				string `json:"status"`
	StudentClassName 	string `json:"student_class_name"`
	PhoneNumber 		string `json:"phone_number"`
	AnotherContact 		string `json:"another_contact"`
}

//教师获取当前选题的学生列表
type Tea_get_xt_stu struct {
	Key				 	int 	`json:"key"`
	Id 				 	int 	`json:"id"`
	XtId			 	int 	`json:"xt_id"`
	StudentId 		 	string `json:"student_id"`
	StudentName 	 	string `json:"student_name"`
	StudentClassName 	string `json:"student_class_name"`
}

//判度年份是否存在
type Year_Is_Exist struct{
	Status int `json:"status"`
}

type tea_delete_xt struct {
	Codes int 	 `json:"codes"`
	Msg   string `json:"msg"`
}

//新增
func TeaM_AddXt(parms request_struct.Teacher_add_xt, year string, teacher_id int) int {
	var flag Year_Is_Exist
	if err := mysql.Db.Raw("call Year_Is_Exit(?)", year).Scan(&flag); err.Error != nil {
		return code.ERROR
	} else {
		if flag.Status == 0 {
			return code.ERROR
		}
	}

	xtmain := XtMain{
		Title:     parms.Title,
		Hard:      parms.Hard,
		XtType:    parms.Type,
		Describe:  parms.Describe,
		Year:      year,
		TeacherId: teacher_id,
		Status:	   "0",
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
func TeaM_XtDelete(id, tea_id int) (int, string) {
	var data tea_delete_xt
	if err := mysql.Db.Raw("CALL tea_delete_xt(?, ?)", id, tea_id).Scan(&data); err.Error != nil {
		return code.ERROR, ""
	} else {
		return data.Codes, data.Msg
	}
}
//获取所有信息
func TeaM_XtGetAll(year string, tea_id int) (int, []tea_getInfo) {
	var data []tea_getInfo
	sql := "SELECT " +
		"xt.id, xt.title, xt.hard, xt.xt_type, xt.`describe`, xt.`status`, " +
		"stu.student_name, stu.student_id, stu.student_class_name, stu.phone_number, stu.another_contact " +
		"FROM xtxt_xt_main xt LEFT JOIN xtxt_user_students_"+ year +" stu " +
		"ON xt.student_id = stu.id WHERE xt.teacher_id = ? AND xt.`year` = ?"
	if err:= mysql.Db.Raw(sql, tea_id, year).Scan(&data); err.Error != nil {
		return code.ERROR, []tea_getInfo{}
	}
	return code.SUCCESS, data
}

//教师获取当前选题下的学生列表
func TeaM_GetSelectStu(id int, year string) (int, []Tea_get_xt_stu) {
	var data []Tea_get_xt_stu
	sql := "SELECT list.id `key`, list.xt_id, list.id, stu.student_id, stu.student_name, stu.student_class_name " +
		"FROM xtxt_xt_list list,  xtxt_user_students_" + year + " stu " +
		"WHERE list.xt_id = ? AND list.student_id = stu.id"

	if err := mysql.Db.Raw(sql, id).Scan(&data); err.Error != nil {
		return code.ERROR, data
	}
	return code.SUCCESS, data
}

//教师选择学生
func TeaM_Select_Stu(id, xtId int) int {
	if err := mysql.Db.Exec("CALL tea_select_stu(?, ?)", id, xtId); err.Error != nil {
		fmt.Println(err.Error)
		return code.ERROR
	}else{
		return code.SUCCESS
	}
}