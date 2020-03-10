package router

import (
	"byxt/admin/controllers"
	admins "byxt/admin/controllers/admin"
	"byxt/admin/controllers/student"
	"byxt/admin/controllers/teacher"
	users "byxt/admin/controllers/user"
	"byxt/admin/pkg/cors"
	"byxt/admin/pkg/middleware/jwt"
	"byxt/admin/pkg/setting"
	"github.com/gin-gonic/gin"
)
//config set stop-writes-on-bgsave-error no
func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(cors.Cors())
	r.Use(gin.Logger())

	gin.SetMode(setting.RUN_MODE)

	r.StaticFile("/api/teacherExample.xlsx", "./static/download/教师上传示例.xlsx")
	r.StaticFile("/api/studentExample.xlsx", "./static/download/学生上传示例.xlsx")
//获取公钥
r.GET("/api/getPublicSecret", controllers.GetPublicPem)


	user := r.Group("api/user:type")
	{
		//登录
		user.POST("/login", users.Login)
		user.GET("/test", users.Test)
		//忘记密码
		user.POST("/forgetpwd", users.ForgetPassword)
	}

	admin := r.Group("api/admin")
	admin.Use(jwt.JWT("adm"))
	{
		//获取教师和学生的系统状态
		admin.GET("/getTeaAndStuStatus", admins.GetSutTeaStatus)
		//设置教师系统状态
		admin.POST("/setTeaEntry", admins.SetTeaEnterStatus)
		//设置学生系统状态
		admin.POST("/setStuEntry", admins.SetStuEnterStatus)
		//更新系统秘钥
		admin.GET("/updateSecretKey", admins.UpdateSecretKey)
		//管理员修改密码
		admin.POST("/updatePwd", controllers.UpdatePwd)

		//新增教师账号
		admin.POST("/addTeacher", admins.Admin_AddTeacher)
		//获取教师列表
		admin.GET("/teacherlist", controllers.GetTeacherList)
		//修改教师账号
		admin.POST("/editTeacher", admins.Admin_UpdateTeacher)
		//删除账号
		admin.GET("/delete/:id", admins.Admin_DeleteTeacher)
		//设置教师状态
		admin.POST("/setStatus", admins.SetTeacherStatus)
		//批量导入教师账号
		admin.POST("/upload", admins.TeacherMultipleAdd)

		//获取学生年份列表
		admin.GET("/getStuYearList", admins.Admin_StuYearList)
		//添加学生年份
		admin.PUT("/addStuYear/:year", admins.Admin_AddStudentYear)
		//获取学生列表（根据年份）
		admin.GET("/getStuList/:year", admins.Admin_StuGetStuList)
		//新增学生账号
		admin.POST("/addStudent/:year", admins.Admin_AddStu)
		//批量导入学生账号
		admin.POST("/multipleAddStu/:year", admins.Admin_MultipleAddStu)
		//修改学生信息
		admin.POST("/updateStu", admins.Admin_UpdateStu)
		//设置学生账号状态
		admin.DELETE("/studentDelete/:id/:year", admins.DeleteStudent)
		//设置年份学生状态
		admin.POST("/stuSetStatus", admins.SetStudentYearStatus)
	}

	stu := r.Group("api/stu")
	{
		stu.GET("/xt", student.GetAllXtList)
		stu.GET("/xt/status")
		stu.PUT("/xt/:id", student.StudentSelectXt)
		stu.GET("/xt/self", student.StudentGetXtSelf)
		stu.DELETE("/xt/:id", student.StudentDeleteXt)
	}

	tea := r.Group("api/tea")
	tea.Use(jwt.JWT("tea"))
	{
		tea.GET("getRoutesList")
		//获取教师信息
		tea.GET("/getTeacherInfo/:teacher_id", teacher.GetTeacherInfo)
		//更新个人信息
		tea.POST("/updateTeacherInfo", teacher.SetTeacherInfo)
		//更新密码
		tea.POST("/updateTeacherPwd", controllers.UpdatePwd)
		//获取学生年份列表
		tea.GET("/getStuYearList", admins.Admin_StuYearList)
		//新增选题
		tea.POST("/xt/:year", teacher.TeaC_AddXt)
		//更新选题
		tea.PUT("/xt", teacher.TeaC_UpdateXt)
		//删除选题
		tea.DELETE("/xt/:id", teacher.TeaC_DeleteXt)
		//教师获取自己的选题
		tea.GET("/xt/:year", teacher.TeaC_GetXt)
		//教师获取选了选题的学生列表
		tea.GET("/xt/:year/:id", teacher.TeaC_GetXt_Stu_List)
		//教师选择学生
		tea.POST("/selectStu", teacher.TeaC_Select_Stu)
	}
	return r
}