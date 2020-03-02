package jwt

import (
	"byxt/admin/inits/redis"
	mcode "byxt/admin/pkg/code"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"
)

func JWT(auth string) gin.HandlerFunc {
	return func(c *gin.Context) {

		var codes int = mcode.SUCCESS
		token := c.Request.Header.Get("token")

		//token不存在
		if token == "" {
			codes = mcode.TOKEN_ERROR
		}

		data, err := redis.GetUserRedisInfo(token)
		//缓存token失效或不存在
		if err != nil {
			codes = mcode.TOKEN_ERROR
		} else {
			//fmt.Println("data[0]: "+data[0], "auth: "+ auth)
			//token身份错误
			if data[0] != auth {
				codes = mcode.TOKEN_PERMISSION_DENY
			}
			//fmt.Println("data[0]: "+data[1], "auth: "+ c.ClientIP())
			//ip错误
			//if data[1] != c.ClientIP() {
			//	codes = mcode.TOKEN_PERMISSION_DENY
			//}
		}

		if codes != mcode.SUCCESS {
			mcode.R(http.StatusOK, codes, "", c)
			c.Abort()
			return
		}

		//最后5分钟有操作，重新缓存token
		times,_ := strconv.ParseInt(data[3], 10, 64)
		if time.Now().Unix() - times > 25*60 {
			//缓存数据    身份|-|登陆ip|-|用户id|-|10位时间戳
			cacheData := data[0] + "|-|" + data[1] + "|-|" + data[2] + "|-|" + strconv.FormatInt(time.Now().Unix(), 10)
			redis.Set(token, cacheData, int(time.Second*30))
		}
		c.Next()
	}
}

