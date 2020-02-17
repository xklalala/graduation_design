package jwt

import (
	"byxt/admin/inits/redis"
	mcode "byxt/admin/pkg/code"
	"github.com/gin-gonic/gin"
	"net/http"
)

func JWT(auth string) gin.HandlerFunc {
	return func(c *gin.Context) {

		var codes int = mcode.SUCCESS
		token := c.Request.Header.Get("token")

		//token不存在
		if token == "" {
			codes = mcode.TOKEN_ERROR
		}
		data, err := redis.Get(token)
		//缓存token失效或不存在
		if err != nil {
			codes = mcode.TOKEN_ERROR
		} else {
			//token身份错误
			if data[1:4] != auth {
				codes = mcode.TOKEN_PERMISSION_DENY
			}
			//ip错误
			if data[4:len(data)-1] != c.ClientIP() {
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