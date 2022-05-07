# cloudcourierapp
cloudcourierapp

# 安装依赖
- 运行依赖`yarn install` 
- 打包依赖`npm install -g eas-cli` 
# 如何本地调试
- 手机和电脑需连接同一个网络
## dev-client
- 在真机上下载 `expo go` ，并连上 `usb`  ，开启调试权限
- `eas build --profile development --platform android` 
- 下载并安装第二部打包的 `APK` 
- `expo start --dev-client` 
- 控制台输入 `a` 真机自动打开 `APP` 
- 控制台输入 `j` 浏览器端自动打开调试窗口
## dev
- 在真机上下载`expo go` ，并连上 `usb`  ，开启调试权限
- yarn android 
- 控制台输入 `a` 真机自动打开 `APP` 
# build
打包成APK
`eas build -p android --profile papk` 
打包成AAB
`eas build --platform android`

# 目前正常版本
- `yarn web` and `yarn android` 
# 出现问题版本
- `dev-client` , websocket无法二次握手，可能是java native 端 websocket 实现的问题
- 打包成APK，原因与上相同。
# 真机出现无法连接？
若电脑上安装有虚拟机，可能会出现网卡占用端口，无法识别问题。
可将 `LAN` 切换为 `Local` 
# 访客端
`https://cloud-courier-customer-service-visitor.vercel.app/` 
# other
## 打包时间过长？
打包在 `expo` 服务器上进行，单次打包在 `8min` 左右