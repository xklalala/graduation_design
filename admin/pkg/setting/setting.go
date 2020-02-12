package setting

import (
	"github.com/go-ini/ini"
	"log"
	"time"
)

var (
	Cfg 					*ini.File

	RUN_MODE 				string
	HTTP_PORT 				int
	READ_TIMEOUT 			time.Duration
	WRITE_TIMEOUT 			time.Duration

	JWTSECRET 				string
	MD5SECRET				string

	LOG_SAVE_PATH 			string
	LOG_SAVE_NAME 			string
	LOG_FILE_EXT 			string
	LOG_TIME_FORMAT 		string

	DB_TYPE 				string
	DB_USER 				string
	DB_PASSWORD 			string
	DB_HOST 				string
	DB_NAME 				string
	DB_TABLE_PREFIX 		string

	REDIS_HOST 				string
	REDIS_MAX_ACTIVE		int
	REDIS_READ_TIMEOUT  	time.Duration
	REDIS_WRITE_TIMEOUT 	time.Duration
	REDIS_CONNECT_TIMEOUT 	time.Duration
	REDIS_IDLE_TIMEOUT		time.Duration
	REDIS_MAX_IDLE      	int
	REDIS_PASSWORD			string
)

func init() {
	var err error
	Cfg, err = ini.Load("conf/app.ini")
	if err != nil {
		log.Fatalf("配置文件加载失败: message: %s", err)
	}

	loadBase()
	loadApp()
	loadServer()
	loadDB()
	loadLogs()
	loadRedis()
}

func loadBase() {
	RUN_MODE = Cfg.Section("").Key("RUN_MODE").MustString("debug")
}

func loadApp() {
	sec, err := Cfg.GetSection("app")
	if err != nil {
		log.Fatalf("配置加失败 'app': %v", err)
	}
	JWTSECRET = sec.Key("JWTSECRET").MustString("fa564/*w#$%GAWE$-4s")
	MD5SECRET = sec.Key("md5_secrt").String()
}

func loadServer() {
	sec, err := Cfg.GetSection("server")
	if err != nil {
		log.Fatalf("配置加失败 'server': %v", err)
	}

	HTTP_PORT 		= sec.Key("HTTP_PORT").MustInt(8080)
	READ_TIMEOUT 	= time.Duration(sec.Key("READ_TIMEOUT").MustInt(60)) * time.Second
	WRITE_TIMEOUT 	= time.Duration(sec.Key("WRITE_TIMEOUT").MustInt(60)) * time.Second
}

func loadDB() {
	sec, err := Cfg.GetSection("database")
	if err != nil {
		log.Fatalf("配置加失败 'log': %v", err)
	}

	DB_TYPE 		= sec.Key("TYPE").String()
	DB_USER 			= sec.Key("USER").String()
	DB_PASSWORD 		= sec.Key("PASSWORD").String()
	DB_HOST 			= sec.Key("HOST").String()
	DB_NAME 		= sec.Key("DB_NAME").String()
	DB_TABLE_PREFIX 	= sec.Key("TABLE_PREFIX").String()
}

func loadLogs() {
	sec, err := Cfg.GetSection("log")
	if err != nil {
		log.Fatalf("配置加失败 'log': %v", err)
	}

	LOG_SAVE_PATH 	= sec.Key("LOG_SAVE_PATH").MustString("./runtime/logs/")
	LOG_SAVE_NAME 	= sec.Key("LOG_SAVE_NAME").MustString("log")
	LOG_FILE_EXT 	= sec.Key("LOG_FILE_EXT").MustString("log")
	LOG_TIME_FORMAT = sec.Key("TIME_FORMAT").MustString("20060102")
}
func loadRedis() {
	sec, err := Cfg.GetSection("redis")
	if err != nil {
		log.Fatalf("配置加失败 'redis': %v", err)
	}

	REDIS_HOST 			= sec.Key("REDIS_HOST").String()
	REDIS_MAX_IDLE 		= sec.Key("REDIS_MAX_IDLE").MustInt(100)
	REDIS_READ_TIMEOUT 	= time.Duration(sec.Key("REDIS_READ_TIMEOUT").MustInt(120)) * time.Millisecond
	REDIS_WRITE_TIMEOUT = time.Duration(sec.Key("REDIS_WRITE_TIMEOUT").MustInt(120)) * time.Millisecond
	REDIS_CONNECT_TIMEOUT = time.Duration(sec.Key("REDIS_CONNECT_TIMEOUT").MustInt(120)) * time.Millisecond
	REDIS_IDLE_TIMEOUT 	= time.Duration(sec.Key("REDIS_IDLE_TIMEOUT").MustInt(120)) * time.Millisecond
	REDIS_MAX_ACTIVE 	= sec.Key("REDIS_MAX_ACTIVE").MustInt(200)
	REDIS_PASSWORD 		= sec.Key("REDIS_PASSWORD").String()

}