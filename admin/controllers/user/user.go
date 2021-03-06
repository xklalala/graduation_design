package user

import (
	"byxt/admin/inits/redis"
	"byxt/admin/inits/sys_args"
	"byxt/admin/models/user"
	"byxt/admin/pem"
	"byxt/admin/pkg/code"
	"byxt/admin/pkg/setting"
	"byxt/admin/router/request_struct"
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

//用户登录
func Login(c *gin.Context) {
	var login request_struct.Login
	//如果用户验证成功
	if err := c.ShouldBind(&login); err != nil {
		code.R(http.StatusOK, code.USER_PARAMS_NOT_NULL, "", c)
	} else {
		var user_real_name string
		var codes int
		var token string
		var by_year int
		var id int
		//用户名密码
		username, _ := pem.RsaDecrypt(login.Username)
		password, _ := pem.RsaDecrypt(login.Password)

		//MD5加密
		h := md5.New()
		h.Write([]byte(password + setting.MD5SECRET))
		password = hex.EncodeToString(h.Sum(nil))

		switch login.Type {
		//教师登录
		case "tea":
			//判断教师系统是否开放
			if sys_args.GetTeaEntry() == "\"false\"" {
				codes = code.SYSTEM_CLOSE
			} else {
				//系统开放
				codes, user_real_name, id = user.TeacherLogin(username, password)
			}
		// 管理员登录
		case "adm":
			codes, id = user.Login(username, password)
			user_real_name = username
		//学生登录
		case "stu":
			fmt.Printf(sys_args.GetStuEntry())
			//判断学生系统是否开放
			if sys_args.GetStuEntry() == "\"false\"" {
				codes = code.SYSTEM_CLOSE
			} else {
				//系统开放
				codes, user_real_name, by_year, id = user.StuLogin(username, password)
			}
		default:
			codes = code.USER_LOGIN_TYPE_ERROR
		}

		//登陆成功，缓存信息
		if codes == code.USER_LOGIN_SUCCESS {

			//生成token
			h.Write([]byte(username + time.Now().Format("2006-01-02 15:04:05")))
			token = hex.EncodeToString(h.Sum(nil))

			//缓存数据    身份|-|登陆ip|-|用户id|-|10位时间戳|-|毕业届（教室管理员默认为0）|-|id
			cacheData := login.Type + "|-|" + c.ClientIP() + "|-|" + username + "|-|" + strconv.FormatInt(time.Now().Unix(), 10) + "|-|" + strconv.FormatInt(int64(by_year), 10) + "|-|" + strconv.Itoa(id)
			fmt.Println(cacheData)
			err := redis.Set(token, cacheData, int(time.Second*30))
			if err != nil {
				fmt.Print(err.Error())
				codes = code.SERVER_ERROR
			}
		}
		fmt.Println(codes)
		res := map[string]interface{}{
			"token":    token,
			"username": user_real_name,
			"by_year": by_year,
		}

		code.R(http.StatusOK, codes, res, c)
	}
}
func Test(c *gin.Context) {
	fmt.Println(c.ClientIP(), c)
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": code.GetMsg(200),
		"data": map[string]interface{}{
			"name": "xk",
			"age":  "12",
		},
	})
}

//忘记密码
func ForgetPassword(c *gin.Context) {
	name := c.PostForm("name")
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": code.GetMsg(200),
		"data": map[string]interface{}{
			"name": name,
		},
	})
}
