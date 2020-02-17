package jwt

import (
	"byxt/admin/inits/redis"
	mcode "byxt/admin/pkg/code"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func JWT(auth string) gin.HandlerFunc {
	return func(c *gin.Context) {

		var codes int = mcode.SUCCESS
		token := c.Request.Header.Get("token")

		//token不存在
		if token == "" {
			codes = mcode.TOKEN_ERROR
		}

		data, err := GetUserRedisInfo(token)
		//缓存token失效或不存在
		if err != nil {
			codes = mcode.TOKEN_ERROR
		} else {
			//token身份错误
			if data[0] != auth {
				codes = mcode.TOKEN_PERMISSION_DENY
			}
			//ip错误
			if data[1] != c.ClientIP() {
				codes = mcode.TOKEN_PERMISSION_DENY
			}
		}

		if codes != mcode.SUCCESS {
			mcode.R(http.StatusOK, codes, "", c)
			c.Abort()
			return
		}
		c.Next()
	}
}

//获取用户缓存信息 身份，ip，账号
func GetUserRedisInfo(token string) ([]string, error) {
	info, err := redis.Get(token)
	if err != nil {
		return []string{"", "", ""}, err
	}
	//去掉引号
	info = info[1:len(info)-1]
	return strings.Split(info, "|-|"), nil
}