package sys_args
import (
	"byxt/admin/inits/mysql"
	"byxt/admin/inits/redis"
	"time"
)

type sysParams struct {
	ParamName string
	ParamValue string
}
//初始化并缓存系统参数（数据库读取）
func InitArgs() {
	isset := redis.Exists("STUDENT_ENTRY")
	//如果redis不存在缓存
	if !isset {
		var args []sysParams
		mysql.Db.Select("*").Where("id > 0").Find(&args)
		for _, v := range args {
			if v.ParamName == "STUDENT_ENTRY" {
				redis.Set("STUDENT_ENTRY", v.ParamValue, int(time.Second * 30))
			}
			if v.ParamName == "TEACHER_ENTRY" {
				redis.Set("TEACHER_ENTRY", v.ParamValue, int(time.Second * 30))
			}
		}
	}
}

func GetStuEntry() string {
	data, _ := redis.Get("STUDENT_ENTRY")
	return data
}

func GetTeaEntry() string {
	data, _ := redis.Get("TEACHER_ENTRY")
	return data
}
