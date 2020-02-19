package user

import (
	"byxt/admin/inits/mysql"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/mlog"
	"fmt"
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
//修改密码
func AdminUpdatePwd(userId, oldPwd, newPwd string) int {

	var useradmin UserAdmin
	codes := code.SUCCESS

	err := mysql.Db.Select("password").Where("user_id = ? ", userId).First(&useradmin)

	//出错或用户不存在，均处理为用户不存在
	if err.Error != nil {
		mlog.Info(err.Error)
		codes = code.USER_USER_NOT_EXIST
		return codes
	}

	fmt.Println("old pwd "+useradmin.Password)
	fmt.Println("new pwd "+oldPwd)
	//判断旧密码是否相等
	if useradmin.Password == oldPwd {
		err = mysql.Db.Model(&useradmin).Where("user_id = ?", userId).Update("password", newPwd)
		if err != nil {
			codes = code.ERROR
		}
		//修改成功
		codes = code.SUCCESS
	} else {
		codes = code.PASSWORD_NOT_EQUALS
	}

	return codes
}