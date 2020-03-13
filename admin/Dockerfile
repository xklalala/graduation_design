FROM golang as build

ADD . /usr/local/go/src/xtxt

WORKDIR /usr/local/go/src/xtxt
RUN go env -w GOPROXY=https://goproxy.cn,direct
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o api_server

FROM alpine:3.9

RUN echo "http://mirrors.aliyun.com/alpine/v3.9/main/" > /etc/apk/repositories && \
	apk update && \
	echo "hosts: files dns" > /etc/nsswitch.conf && \
	mkdir -p /www/pem && \
	mkdir -p /www/static && \
	mkdir -p /www/runtime && \
	mkdir -p /www/conf

WORKDIR /www

COPY --from=build /usr/local/go/src/xtxt/api_server /usr/bin/api_server
ADD ./static /www/static
ADD ./conf /www/conf
RUN chmod +x /usr/bin/api_server
ENTRYPOINT ["api_server"]
