package upfile

import (
	"byxt/admin/pkg/code"
	"fmt"
	"github.com/gin-gonic/gin"
)

//上传文件，
func Upfile(c *gin.Context) (string, error, int) {
	file, err := c.FormFile("filename")
	if err != nil {
		fmt.Println(1)
		return "", err, code.UPFILE_ERROR
	}
	file.Filename = "./static/upload/temp/copy_" + file.Filename
	if err := c.SaveUploadedFile(file, file.Filename); err != nil {
		fmt.Println(err, err.Error())
		return "", err, code.UPFILE_ERROR
	}
	if file.Size > 1024 * 1024 * 2 {
		fmt.Println(3)
		return "", err, code.UPFILE_FILE_SIZE_BIG
	}
	return file.Filename, nil, code.SUCCESS
}
