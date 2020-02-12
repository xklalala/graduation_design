package ini
//
//import (
//	"byxt/admin/pkg/mlog"
//	"byxt/admin/pkg/setting"
//	"fmt"
//	"github.com/gomodule/redigo/redis"
//)
//
//type BRedis struct {
//	pool *redis.Pool
//}
//
//var bredis *BRedis
//
//func init() {
//	bredis = new(BRedis)
//	bredis.pool = &redis.Pool{
//		MaxIdle:     setting.REDIS_MAX_IDLE,
//		MaxActive:   setting.REDIS_MAX_ACTIVE,
//		IdleTimeout: setting.REDIS_IDLE_TIMEOUT,
//		Dial: func() (redis.Conn, error) {
//			return redis.Dial(
//				"tcp",
//				setting.REDIS_HOST,
//				redis.DialReadTimeout(setting.REDIS_READ_TIMEOUT),
//				redis.DialWriteTimeout(setting.REDIS_WRITE_TIMEOUT),
//				redis.DialConnectTimeout(setting.REDIS_CONNECT_TIMEOUT),
//				redis.DialDatabase(0),
//			)
//		},
//	}
//}
//
//func RedisExec(cmd string, key interface{}, args ...interface{})(interface{}, error)  {
//	conn := bredis.pool.Get()
//	if err := conn.Err(); err != nil {
//		fmt.Println("redis连接失败")
//		mlog.Info("redis连接失败", err)
//		return nil, err
//	}
//	fmt.Println("redis连接成功")
//	defer conn.Close()
//	parmas := make([]interface{}, 0)
//	parmas = append(parmas, key)
//
//	if len(args) > 0 {
//		for _, v := range  args {
//			parmas = append(parmas, v)
//		}
//	}
//	return conn.Do(cmd, parmas...)
//
//}