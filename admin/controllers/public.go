package controllers

import (
	"byxt/admin/models/user"
	"byxt/admin/pem"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/middleware/jwt"
	"byxt/admin/pkg/setting"
	"byxt/admin/router/request_struct"
	"crypto/md5"
	"encoding/hex"
	"github.com/gin-gonic/gin"
	"net/http"
)

//获得公钥
func GetPublicPem(c *gin.Context) {
	public, err := pem.GetPublic()
	var codes int
	if err != nil {
		codes = code.SECRET_KEY_GET_ERROR
	} else {
		codes = code.SECRET_KEY_GET_SUCCESS
	}
	code.R(http.StatusOK, codes, public, c)
}

//修改密码
func UpdatePwd(c *gin.Context) {
	var userInfo request_struct.UpdatePassword
	//参数校验
	if err := c.ShouldBind(&userInfo); err != nil {
		code.R(http.StatusOK, code.REQUEST_PARMS_ERROR, "", c)
	} else {
		//获取用户id
		token := c.Request.Header.Get("token")
		info,err := jwt.GetUserRedisInfo(token)
		if err != nil {
			//如果token获取失败，判定为token超时
			code.R(http.StatusOK, code.TOKEN_TIME_OUT, "", c)
			return
		}
		//解密获得真实密码
		oldpwd, _ := pem.RsaDecrypt(userInfo.OldPwd)
		newpwd, _ := pem.RsaDecrypt(userInfo.NewPwd)

		//加密
		h := md5.New()
		h.Write([]byte(oldpwd + setting.MD5SECRET))
		oldpwd = hex.EncodeToString(h.Sum(nil))
		h.Write([]byte(newpwd + setting.MD5SECRET))
		newpwd = hex.EncodeToString(h.Sum(nil))

		var codes int
		//更新密码
		switch info[0] {
		case "stu":
			codes = user.StuUpdatePwd(info[2], oldpwd, newpwd)
		case "tea":
			codes = user.TeainUpdatePwd(info[2], oldpwd, newpwd)
		case "adm":
			codes = user.AdminUpdatePwd(info[2], oldpwd, newpwd)
		default:
			codes = code.ERROR
		}

		code.R(http.StatusOK, codes, "", c)
	}
}