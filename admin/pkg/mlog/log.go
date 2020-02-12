package mlog

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"runtime"
)

type Level int

var (
	F *os.File

	defaultPrefix = ""
	defaultCallerDepth = 2

	logger *log.Logger
	logPrefix = ""
	levelFlags = []string{"DEBUG", "INFO", "WARN", "ERROR", "FATAL"}
)

const (
	debug Level = iota
	info
	warring
	error
	fatal
)

func init() {
	filePath := getLogFileFullName()
	F = openLogFile(filePath)
	logger = log.New(F, defaultPrefix, log.LstdFlags)
}

func setPrefix(level Level) {
	_, file, line, ok := runtime.Caller(defaultCallerDepth)
	if ok {
		logPrefix = fmt.Sprintf("[%s][%s:%d]", levelFlags[level], filepath.Base(file), line)
	} else {
		logPrefix = fmt.Sprintf("[%s]", levelFlags[level])
	}

	logger.SetPrefix(logPrefix)
}

func Debug(v ...interface{}) {
	setPrefix(debug)
	logger.Println(v)
}

func Info(v ...interface{}) {
	setPrefix(info)
	logger.Println(v)
}

func Warn(v ...interface{}) {
	setPrefix(warring)
	logger.Println(v)
}

func Fatal(v ...interface{}) {
	setPrefix(fatal)
	logger.Fatalln(v)
}