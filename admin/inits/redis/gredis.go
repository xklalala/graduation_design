package redis

import (
	"byxt/admin/pkg/setting"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/gomodule/redigo/redis"
)

var RedisConn *redis.Pool

func Setup() error {
	RedisConn = &redis.Pool{
		MaxIdle:     setting.REDIS_MAX_IDLE,
		MaxActive:   setting.REDIS_MAX_ACTIVE,
		IdleTimeout: setting.REDIS_IDLE_TIMEOUT,
		Dial: func() (conn redis.Conn, e error) {
			c, err := redis.Dial("tcp", setting.REDIS_HOST)
			if err != nil {
				return nil, err
			}
			if setting.REDIS_PASSWORD != "" {
				if _, err := c.Do("AUTH", setting.REDIS_PASSWORD); err != nil {
					c.Close()
					return nil, err
				}
			}
			return c, err
		},
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do("PING")
			return err
		},
	}
	fmt.Println("redis连接成功")
	return nil
}

func Set(key string, data interface{}, time int) error {
	conn := RedisConn.Get()
	defer conn.Close()

	value, err := json.Marshal(data)
	if err != nil {
		return err
	}

	_, err = conn.Do("SET", key, value)
	if err != nil {
		return err
	}

	_, err = conn.Do("EXPIRE", key, time)
	if err != nil {
		return err
	}

	return nil
}

func Exists(key string) bool {
	conn := RedisConn.Get()
	defer conn.Close()

	exists, err := redis.Bool(conn.Do("EXISTS", key))
	if err != nil {
		return false
	}

	return exists
}

func Get(key string) (string, error) {
	conn := RedisConn.Get()
	defer conn.Close()

	reply, err := redis.Bytes(conn.Do("GET", key))
	if err != nil {
		return "", err
	}

	return string(reply), nil
}

func Delete(key string) (bool, error) {
	conn := RedisConn.Get()
	defer conn.Close()

	return redis.Bool(conn.Do("DEL", key))
}

func LikeDeletes(key string) error {
	conn := RedisConn.Get()
	defer conn.Close()

	keys, err := redis.Strings(conn.Do("KEYS", "*"+key+"*"))
	if err != nil {
		return err
	}

	for _, key := range keys {
		_, err = Delete(key)
		if err != nil {
			return err
		}
	}

	return nil
}

func Hset(key, key2, data string, time int) error {
	conn := RedisConn.Get()
	defer conn.Close()
	_, err := conn.Do("hset", key, key2, data)
	if err != nil {
		return err
	}

	_, err = conn.Do("EXPIRE", key, time)
	if err != nil {
		return err
	}
	return nil
}

func Hget(key, key2 string) (string, error) {
	conn := RedisConn.Get()
	defer conn.Close()

	return redis.String(conn.Do("hget", key, key2))
}

func StuGetEntry(key string) (map[string]bool, error){
	conn := RedisConn.Get()
	defer conn.Close()

	result, err := redis.Values(conn.Do("hgetall", key))
	if err != nil {
		return map[string]bool{}, err
	}
	var res map[string]bool
	res = make(map[string]bool)
	length := len(result)
	for i := 0; i < length - 1; i+= 2 {
		var temp bool = false
		if string(result[i+1].([]byte)) == "1" {
			temp = true
		}
		res [string(result[i].([]byte))] = temp
	}
	return res, nil
}

//获取用户缓存信息 身份，ip，账号, 时间
func GetUserRedisInfo(token string) ([]string, error) {
	info, err := Get(token)
	fmt.Println(info)
	if err != nil {
		fmt.Println(err.Error())
		return []string{"", "", ""}, err
	}
	//去掉引号
	info = info[1:len(info)-1]
	return strings.Split(info, "|-|"), nil
}