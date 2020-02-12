package user

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/mlog"
)

type UserAdmin struct {
	UserId 		string `json:"user_id"`
	Password 	string `json:"password"`
}

//账号是否存在
func ExistUser(userId string) bool {
	var useradmin UserAdmin
	err := mysql.Db.Select("id").Where("user_id = ?", userId).First(&useradmin)
	if err.Error != nil {
		return false
	}
	return true
}
//登陆
func Login(user, pwd string) int {
	var useradmin UserAdmin
	err := mysql.Db.Select("password").Where("user_id = ? ", user).First(&useradmin)
	if err.Error != nil {
		mlog.Info(err.Error)
		return code.USER_USER_NOT_EXIST
	}
	if useradmin.Password != pwd {
		return code.USER_USER_OR_PWD_FALSE
	}
	return code.USER_LOGIN_SUCCESS
}