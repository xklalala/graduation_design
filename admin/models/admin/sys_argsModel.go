package admin

import "byxt/admin/inits/mysql"

type SysParams struct {
	ParamName  string `json:"param_name"`
	ParamValue string `json:"param_value"`
}

//设置学生系统是否开放
func SetStudent(status string) error {

	if status == "true" || status == "false" {

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

	if status == "true" || status == "false" {

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

//获取学生系统和教师系统的开闭情况
func GetStuAndTeaStatus() (map[string]interface{}, error) {
	var res = make(map[string]interface{})
	var args []SysParams
	if err := mysql.Db.Select("*").Where("id > 0").Find(&args); err.Error != nil {
		return map[string]interface{}{}, err.Error
	}
	for _, v := range args {
		res[v.ParamName] = v.ParamValue
	}
	return res, nil
}