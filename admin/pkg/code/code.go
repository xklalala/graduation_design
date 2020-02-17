package code

const (
	SUCCESS 				= 10001
	ERROR 					= 10002
	SYSTEM_CLOSE 			= 10003		//系统关闭
	SECRET_KEY_GET_ERROR	= 10004		//公钥获取失败
	SECRET_KEY_GET_SUCCESS  = 10005
	SERVER_ERROR			= 10006		//服务器错误
	REQUEST_PARMS_ERROR     = 10007		//请求参数错误


	USER_PARAMS_NOT_NULL 	= 20001 	//账号或者密码为空
	USER_USER_NOT_EXIST 	= 20002 	//账号不存在
	USER_USER_OR_PWD_FALSE 	= 20003 	//账号或者密码错误
	USER_LOGIN_TYPE_ERROR 	= 20004		//登陆类型错误
	USER_LOGIN_SUCCESS		= 20005		//登陆成功

	TOKEN_ERROR				= 30001		//token错误
	TOKEN_TIME_OUT			= 30002		//身份信息超时
	TOKEN_PERMISSION_DENY   = 30003		//权限不足

	PASSWORD_NOT_EQUALS		= 40001		//新旧密码不相等


)