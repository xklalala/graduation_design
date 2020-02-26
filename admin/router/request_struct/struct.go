package request_struct

//用户登录
type Login struct {
	Username 		string `form:"username" binding:"required"`
	Password 		string `form:"password" binding:"required"`
	Type 			string `form:"type" binding:"required"`
}

//设置教师和学生系统进入的状态
type SetEnterStatus struct {
	Status 			string `form:"status" binding:"required"`
}
//设置账号状态
type UserStatus struct {
	Id 				string `form:"id" binding:"required"`
	Status 			string `form:"status" binding:"required"`
}
//修改密码
type UpdatePassword struct {
	OldPwd 			string `form:"old_pwd" binding:"required"`
	NewPwd 			string `form:"new_pwd" binding:"required"`
}

//新增教师, 修改教师信息
type Admin_AddTeacher struct {
	ID				int	   `form:"id"`
	TeacherName 	string `form:"teacher_name" binding:"required"`
	TeacherID 		string `form:"teacher_id" binding:"required"`
	Phone			string `form:"phone"`
	AnotherContact 	string `form:"another_contact"`
}

//新增学生，修改学生信息
type Admin_AddStu struct {
	ID 				 int 	`form:"id"`
	StudentId 		 string `form:"student_id" binding:"required"`
	StudentName 	 string	`form:"student_name" binding:"required"`
	StudentClassName string	`form:"student_class_name" binding:"required"`
	PhoneNumber 	 string	`form:"phone_number"`
	AnotherContact 	 string	`form:"another_contact"`
}
//教师更新账号
type Teacher_update struct {
	ID 				int		`form:"id"`
	Teacher_name 	string  `form:"teacher_name" binding:"required"`
	Phone 			string	`form:"phone"`
	AnotherContact	string	`form:"another_contact"`
}