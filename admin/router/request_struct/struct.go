package request_struct

type Login struct {
	Username 	string `form:"username" binding:"required"`
	Password 	string `form:"password" binding:"required"`
	Type 		string `form:"type" binding:"required"`
}

type SetEnterStatus struct {
	Status string `form:"status" binding:"required"`
}