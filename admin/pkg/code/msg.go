package code

import "github.com/gin-gonic/gin"

var msgFlags = map[int]string{
	SUCCESS: 					"ok",
	ERROR: 						"fail",

	SECRET_KEY_GET_ERROR: 		"公钥获取失败",
	SECRET_KEY_GET_SUCCESS: 	"公钥获取成功",
	SERVER_ERROR:				"服务器错误",

	USER_PARAMS_NOT_NULL: 		"账号或者密码为空",
	USER_USER_NOT_EXIST: 		"账号不存在",
	USER_USER_OR_PWD_FALSE: 	"账号或者密码错误",
	USER_LOGIN_TYPE_ERROR: 		"登陆类型错误",
	USER_LOGIN_SUCCESS:			"登陆成功",
	SYSTEM_CLOSE:				"对不起，系统已经关闭, 无法进入系统",
	REQUEST_PARMS_ERROR:		"请求参数错误",
}

func GetMsg(code int) string {
	msg, ok := msgFlags[code]
	if ok {
		return msg
	}
	return msgFlags[ERROR]

}

func R(httpcode, code int, data interface{}, c *gin.Context) {
	c.JSON(httpcode, gin.H{
		"code": code,
		"message": GetMsg(code),
		"data": data,
	})
}