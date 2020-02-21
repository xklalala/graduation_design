package router

import (
	"byxt/admin/controllers"
	admins "byxt/admin/controllers/admin"
	users "byxt/admin/controllers/user"
	"byxt/admin/pem"
	code2 "byxt/admin/pkg/code"
	"byxt/admin/pkg/cors"
	"byxt/admin/pkg/middleware/jwt"
	"byxt/admin/pkg/setting"
	"byxt/admin/pkg/upfile"
	"github.com/gin-gonic/gin"
	"net/http"
)

func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(cors.Cors())
	r.Use(gin.Logger())

	gin.SetMode(setting.RUN_MODE)

	r.GET("/api/teacherlist", controllers.GetTeacherList)
	r.GET("api/getPublicSecret", controllers.GetPublicPem)
	r.POST("/api/upload", upfile.UpLoadFile)
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
	{	//获取前台路由列表
		admin.GET("/getRoutesList", )
		admin.POST("/setTeaEntryStatus")
		//获取教师和学生的系统状态
		admin.GET("/getTeaAndStuStatus", admins.GetSutTeaStatus)
		//设置教师系统状态
		admin.POST("/setTeaEntry", admins.SetTeaEnterStatus)
		//设置学生系统状态
		admin.POST("/setStuEntry", admins.SetStuEnterStatus)
		//更新系统秘钥
		admin.GET("/updateSecretKey", updateSecretKey)
		//管理员修改密码
		admin.POST("/updatePwd", controllers.UpdatePwd)
		//新增教师账号
		admin.POST("/addTeacher", admins.Admin_AddTeacher)
		//修改教师账号
		admin.POST("/editTeacher", admins.Admin_UpdateTeacher)
		//删除账号
		admin.GET("/delete/:id", admins.Admin_DeleteTeacher)
		//设置教师状态
		admin.POST("/setStatus", admins.SetTeacherStatus)
	}

	stu := r.Group("api/stu")
	{
		stu.GET("getRoutesList")
	}

	tea := r.Group("api/tea")
	{
		tea.GET("getRoutesList")
	}
	return r
}


//更新秘钥
func updateSecretKey(c *gin.Context) {
	var code int
	if err := pem.GenRsaKey(1024); err != nil {
		code = code2.ERROR
	} else {
		code = code2.SUCCESS
	}
	code2.R(http.StatusOK, code, "", c)
}