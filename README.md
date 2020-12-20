<p align="center">
  <a href="https://github.com/shunyue1320/juejin-app" target="_blank">
    <img width="180" src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="logo">
  </a>
</p>

<div align="center">

An Front-end technology sharing and exchange.

[![](https://img.shields.io/badge/Juejin-掘金-007FFF)](https://juejin.im/user/3702810894152983)
[![](https://img.shields.io/badge/CSDN-博客-E33E33)](https://blog.csdn.net/qq_41614928)
[![](https://img.shields.io/badge/Zhihu-知乎-0084FF)](https://www.zhihu.com/people/shun-yue-45)
[![](https://img.shields.io/badge/bilili-哔哩哔哩-FF69b4)](https://space.bilibili.com/475498258)
[![](https://img.shields.io/badge/公众号-爱看编程-7ED957)](#爱看编程)

</div>



# use

## Run the project 

```bash
# 安装依赖
$ yarn install

# 开发环境运行 localhost:3000
$ yarn run dev
```

## build
```bash
# 打包项目
yarn run build

# 运行打包后项目
yarn run start
```

## Pm2: project go online using pm2
```bash
# 打包项目
yarn run build

# 运行打包后项目
pm2 start npm --name "myjuejin" -- run "start"
```

## Docker: project go online using docker
```bash
# 制定docker镜像
docker bulid -t myjuejin .

# docker上线项目
docker run -p 3000:3000 myjuejin
```


# 效果图：
![juejin-app效果图](https://images.gitee.com/uploads/images/2020/0929/222659_0e3c2300_5680075.png)
# 动态效果图：
![juejin-app动态效果图](https://github.com/shunyue1320/juejin-app/blob/master/1.gif)
