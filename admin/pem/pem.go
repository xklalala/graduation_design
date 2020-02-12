package pem

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"errors"
	"io/ioutil"
	"os"
)

func GenRsaKey(bits int) error {
	// 生成私钥文件
	privateKey, err := rsa.GenerateKey(rand.Reader, bits)
	if err != nil {
		return err
	}
	derStream := x509.MarshalPKCS1PrivateKey(privateKey)
	block := &pem.Block{
		Type: "RSA PRIVATE KEY",
		Bytes: derStream,
	}
	file, err := os.Create("./pem/byxt_private_byxt.pem")
	if err != nil {
		return err
	}
	err = pem.Encode(file, block)
	if err != nil {
		return err
	}
	// 生成公钥文件
	publicKey := &privateKey.PublicKey
	derPkix, err := x509.MarshalPKIXPublicKey(publicKey)

	if err != nil {
		return err
	}
	block = &pem.Block{
		Type: "PUBLIC KEY",
		Bytes: derPkix,
	}
	file, err = os.Create("./pem/public.pem")
	if err != nil {
		return err
	}
	err = pem.Encode(file, block)
	if err != nil {
		return err
	}

	return nil
}

func GetPublic() (string, error) {
	f, err := os.Open("./pem/public.pem")
	defer f.Close()

	if err != nil {
		return "", err
	}
	result, err := ioutil.ReadAll(f)
	if err != nil {
		return "", err
	}
	str := string(result)

	return str, nil
}
func GetPrivateKey() ([]byte , error) {
	f, _ := os.Open("./pem/byxt_private_byxt.pem")
	defer f.Close()

	return ioutil.ReadAll(f)

}

// 解密
func RsaDecrypt(ciphertext string) (string, error) {
	b, _ := base64.StdEncoding.DecodeString(ciphertext)
	privateKey, _ := GetPrivateKey()
	//解密
	block, _ := pem.Decode(privateKey)
	if block == nil {
		return "", errors.New("private key error!")
	}
	//解析PKCS1格式的私钥
	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return "", err
	}
	// 解密
	res, err := rsa.DecryptPKCS1v15(rand.Reader, priv, []byte(b))
	if err != nil {
		return "", err
	}
	return string(res), nil
}
