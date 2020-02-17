package main

import (
	_ "byxt/admin/inits/mysql"
	"byxt/admin/inits/redis"
	"byxt/admin/inits/sys_args"
	"byxt/admin/pem"
	"byxt/admin/pkg/setting"
	"byxt/admin/router"
	"fmt"
	"net/http"
)

func main() {

	return
	err := redis.Setup()
	if err != nil {
		fmt.Println(err, err.Error())
	}
	sys_args.InitArgs()
	routes := router.InitRouter()
	s := &http.Server{
		Addr:           fmt.Sprintf(":%d", setting.HTTP_PORT),
		Handler:        routes,
		ReadTimeout:    setting.READ_TIMEOUT,
		WriteTimeout:   setting.WRITE_TIMEOUT,
		MaxHeaderBytes: 1 << 20,
	}

	//系统启动，生成秘钥
	pem.GenRsaKey(1024)


	err = s.ListenAndServe()

	if err != nil {
		fmt.Println("err", err.Error())
	}
}
