package router

import (
	"byxt/admin/pkg/cors"
	"byxt/admin/pkg/setting"
	"byxt/admin/src/controllers"
	admins "byxt/admin/src/controllers/admin"
	users "byxt/admin/src/controllers/user"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(cors.Cors())
	r.Use(gin.Logger())

	gin.SetMode(setting.RUN_MODE)

	r.GET("api/getPublicSecret", controllers.GetPublicPem)

	user := r.Group("api/user:type")
	{
		//登录
		user.POST("/login", users.Login)
		user.GET("/test", users.Test)
		//忘记密码
		user.POST("/forgetpwd", users.ForgetPassword)
	}

	admin := r.Group("api/admin")
	{
		//获取前台路由列表
		admin.GET("/getRoutesList", )
		admin.POST("/setTeaEntryStatus")
		admin.GET("/getTeaAndStuStatus", admins.GetSutTeaStatus)
		admin.POST("/setTeaEntry", admins.SetTeaEnterStatus)
		admin.POST("/setStuEntry", admins.SetStuEnterStatus)
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
