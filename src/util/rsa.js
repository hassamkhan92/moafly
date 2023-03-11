/*
 * @Author: zulezhe
 * @Date: 2021-12-18 14:14:13
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2021-12-19 21:38:19
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/* 产引入jsencrypt实现数据RSA加密 */
import JSEncrypt from 'jsencrypt'; // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 产引入encryptlong实现数据RSA加密 */
import Encrypt from 'encryptlong'; // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。
var encryptor = new Encrypt();
// 密钥对生成 http://web.chacuo.net/netrsakeypair

// 公钥key
// const publicKey =
//   '-----BEGIN PUBLIC KEY-----\n' +
//   'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCewqBv/vEIDMXZdENIYPPc36+Y\n' +
//   'a+GuyByZgfAkE6tVHLJ92A1EwzrkimyB8OsS34yepHr40XtJQFYalQZMGmqMqlOj\n' +
//   '7vIM8zqX14j4kZzeSfi4FV9d+NG7pPAgRCDMpZbNxTXSkohxSaPbCLEUlj/VMBtg\n' +
//   'wFll5ZTIvk2GrMByfwIDAQAB\n' +
//   '-----END PUBLIC KEY-----';
const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWwUBGHGM7Rbz4g4AVZ1GPVJhlVyrTneFtEN34il9QqAFXUkKiUizHIVpovN/bLwetXNk5mYrFoYf2db1S4VijrXSMj1aNVxehhQFXni97ZCa7Y/A3VlS8qAaBEFm4C930fR+NE3mLwaP+SCiw0YvPnFgDgD9QOzHfShiym/P+HwIDAQAB';

// 私钥key
const privateKey =
  '-----BEGIN PRIVATE KEY-----\n' +
  'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAJ7CoG/+8QgMxdl0\n' +
  'Q0hg89zfr5hr4a7IHJmB8CQTq1Ucsn3YDUTDOuSKbIHw6xLfjJ6kevjRe0lAVhqV\n' +
  'BkwaaoyqU6Pu8gzzOpfXiPiRnN5J+LgVX1340buk8CBEIMylls3FNdKSiHFJo9sI\n' +
  'sRSWP9UwG2DAWWXllMi+TYaswHJ/AgMBAAECgYEAhAnGuZ7FBDbrTgG9+7J231pC\n' +
  'hngjCORxtNI20SpysqTdZoCL+IaOsojV2fRu7hFyuHZ/t/Uxniid9BnBVQYbWnak\n' +
  'UoScA4QMJ1IAPXHqD6H3zvT0kV9mZO4p0FvvVPxioLDJkwPenngix+Lb/0ra6vBc\n' +
  'Wl0G65+vRjO/WRgDfVECQQDSNrtuURAGDooskppwhvOf9NdJeIcawYwLMbac7Wef\n' +
  'us8gPibAKXsLp2UzINlrY3Y4AeW45+udQ1b/CttLhLplAkEAwVboSprE2OI+FyO4\n' +
  '0CAtK3DduKNRTU07hKu3nrqz/rtFsJ02jAjQF3xjxbUxlQPthK92a3fctrccO895\n' +
  'NlvZEwJBAIbDK7l3IkyfuZkFixikiz56WiHxsLtIZR0wC5/i2lGeEvbaoUED1qwL\n' +
  '7mauonOj2b/iB4FYvMWezADI1vk857kCQQCnE+58AlGYR7N2lbUxjozaXJgO5nvs\n' +
  '/JAxr59nuVqxCK9J2CJ6U2dY1HL4OQRXDWTl5CfG6XdAIu9wNHRAaJEnAkAfJhhk\n' +
  'DPjtCmyEC2vxYEpVbslr3IPRvxiSG0rhsOY2/lS5gkRNLTkNS8DShQ85/AHAz1Yf\n' +
  '3EDt10aHox8KQPpZ\n' +
  '-----END PRIVATE KEY-----';

export default {
  /* JSEncrypt加密 */
  rsaPublicData(data) {
    var jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(publicKey);
    var result = jsencrypt.encrypt(data);
    return result;
  },
  /* JSEncrypt解密 */
  rsaPrivateData(data) {
    var jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(privateKey);
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = jsencrypt.encrypt(data);
    return result;
  },
  /* 长加密 */
  encrypt(data) {
    const PUBLIC_KEY = publicKey;
    encryptor.setPublicKey(PUBLIC_KEY);
    const result = encryptor.encryptLong(data);
    return result;
  },
  /* 长解密 - PRIVATE_KEY - 验证 */
  decrypt(data) {
    const PRIVATE_KEY = privateKey;
    encryptor.setPrivateKey(PRIVATE_KEY);
    var result = encryptor.decryptLong(data);
    return result;
  }
};
