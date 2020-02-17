package request_struct

//用户登录
type Login struct {
	Username 	string `form:"username" binding:"required"`
	Password 	string `form:"password" binding:"required"`
	Type 		string `form:"type" binding:"required"`
}

//设置教师和学生系统进入的状态
type SetEnterStatus struct {
	Status string `form:"status" binding:"required"`
}

//修改密码
type UpdatePassword struct {
	OldPwd string `form:"old_pwd" binding:"required"`
	NewPwd string `form:"new_pwd" binding:"required"`
}