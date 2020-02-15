package admin

import "byxt/admin/inits/mysql"

type SysParams struct {
	ParamName  string `json:"param_name"`
	ParamValue string `json:"param_value"`
}

//设置学生系统是否开放
func SetStudent(status string) error {

	if status == "TRUE" || status == "FALSE" {

		var sysparams SysParams

		err := mysql.Db.Model(&sysparams).Where("param_name = ?", "STUDENT_ENTRY").Update("param_value", status)

		if err.Error != nil {
			return err.Error
		} else {
			return nil
		}

	} else {
		return nil
	}
}

//设置教师系统是否开放
func SetTeacher(status string) error {

	if status == "TRUE" || status == "FALSE" {

		var sysparams SysParams

		err := mysql.Db.Model(&sysparams).Where("param_name = ?", "TEACHER_ENTRY").Update("param_value", status)

		if err.Error != nil {
			return err.Error
		} else {
			return nil
		}

	} else {
		return nil
	}
}
