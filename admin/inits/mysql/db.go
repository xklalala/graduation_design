package mysql

import (
	"byxt/admin/pkg/mlog"
	s "byxt/admin/pkg/setting"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var Db *gorm.DB

func init() {
	var err error
	Db, err = gorm.Open(s.DB_TYPE, fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True",
		s.DB_USER,
		s.DB_PASSWORD,
		s.DB_HOST,
		s.DB_NAME,
		))
	if err != nil {
		fmt.Println("数据库连接错误", err.Error())
		mlog.Fatal("数据库连接错误：", err.Error())
		return
	}
	gorm.DefaultTableNameHandler = func(db *gorm.DB, defaultTableName string) string {
		return s.DB_TABLE_PREFIX + defaultTableName
	}
	fmt.Println("mysql连接成功")
	Db.SingularTable(true)
	Db.LogMode(true)
	Db.DB().SetMaxIdleConns(10)
	Db.DB().SetMaxOpenConns(100)
}

