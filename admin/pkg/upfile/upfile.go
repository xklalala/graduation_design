package upfile

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func UpLoadFile(c *gin.Context) {
	file, err := c.FormFile("filename")
	if err != nil {
		c.String(http.StatusBadRequest, fmt.Sprintf("get form err: %s", err.Error()))
		return
	}
	file.Filename = "./upload/temp/copy_" + file.Filename
	if err := c.SaveUploadedFile(file, file.Filename); err != nil {
		c.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
		return
	}
	c.String(http.StatusOK, fmt.Sprintf("File %s uploaded success", file.Filename ))
}
