## 1、生成签名密钥
参考 https://www.reactnative.cn/docs/signed-apk-android

```shell
keytool -genkeypair \
-v -storetype PKCS12 \
-keystore my-release-key.keystore \
-alias my-key-alias \
-keyalg RSA \
-keysize 2048 \
-validity 10000
```

```text
钥库口令 123456
您的名字与姓氏是什么?
  [Unknown]:  gao
您的组织单位名称是什么?
  [Unknown]:  airtlab
您的组织名称是什么?
  [Unknown]:  airtlab
您所在的城市或区域名称是什么?
  [Unknown]:  guangdong 
您所在的省/市/自治区名称是什么?
  [Unknown]:  shenzhen
该单位的双字母国家/地区代码是什么?
  [Unknown]:  CN
```

## 生成发行 APK 包

```shell
cd android && ./gradlew assembleRelease
```

## 在模拟器上安装发行包
```bash
npx react-native run-android --variant=release
```

## 移动 APK 目录
```shell
mv android/app/build/outputs/apk/release/app-release.apk ./release
```