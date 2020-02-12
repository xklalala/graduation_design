package controllers

import (
	"byxt/admin/pem"
	"byxt/admin/pkg/code"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetPublicPem(c *gin.Context) {
	public, err := pem.GetPublic()
	var codes int
	if err != nil {
		codes = code.SECRET_KEY_GET_ERROR
	} else {
		codes = code.SECRET_KEY_GET_SUCCESS
	}
	code.R(http.StatusOK, codes, public, c)
}