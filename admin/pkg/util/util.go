package util

import (
	"github.com/360EntSecGroup-Skylar/excelize"
	"os"
)

func ExcelGetSql(colums []string, table, filename string) (string, error) {
	f, err := excelize.OpenFile(filename)
	defer os.Remove(filename)
	if err != nil {
		println(err.Error())
		return "", err
	}
	sql := "INSERT INTO " + table + " ("
	for _, v := range colums {
		sql += v + ", "
	}
	sql = sql[0 : len(sql)-2]
	sql += ") VALUES "

	// 获取 Sheet1 上所有单元格
	rows := f.GetRows("Sheet1")
	length := len(rows)
	for i := 1; i < length; i++ {
		sql += "("
		for _, value := range rows[i] {
			sql += "\"" + value + "\", "
		}
		sql = sql[0 : len(sql)-2]
		sql += "), "
	}
	sql = sql[0 : len(sql)-2]
	return sql, nil
}
