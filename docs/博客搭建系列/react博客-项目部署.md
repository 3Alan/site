---
title: react博客-项目部署
tags:
  - 部署
  - 博客
  - React
  - 阿里云
categories:
  - 前端
  - React
abbrlink: d4ddb122
date: 2020-05-13 15:51:16
---

阿里云最近推出了一个“在家实践活动”，**免费**领取半年的服务器，真香。[领取地址](https://developer.aliyun.com/adc/student/)

<!--truncate-->

## 购买阿里云服务器

购买完成后会得到一个`公网ip`

下载软件`putty`来连接我们刚才购买的服务器，只需输入公网ip点击open即可

在命令行中输入用户名`root`和密码得到`Welcome to Alibaba Cloud Elastic Compute Service !`即完成了连接。



## 使用宝塔进行管理

https://www.bt.cn/bbs/thread-19376-1-1.html

连接成功服务器后在命令行输入(**Centos**系统，其他系统查看上面网址)，复制按下鼠标右键完成宝塔的安装

```
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

安装成功后会返回一个端口号为8888的网站以及账号和密码：

![image-20200507135712898](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200507135712898.png)

访问该地址，这个时候网站时不能访问的，因为远程服务器没有开放8888端口。

设置教程：

https://www.bt.cn/bbs/thread-2897-1-1.html

登录成功后安装mysql和nginx（之后几乎所有的操作都在宝塔上进行）



### 需要安装软件

- php环境（用于phpmyadmin）
- phpMyAdmin（用于管理mysql数据库）
- PM2（自带node环境）
- nginx



### 开放80(http)端口访问服务器

在阿里云服务器管理控制台安全组中设置

设置后就可以通过公网ip访问服务器了



## 部署项目

### 切换镜像源

安装nrm（用来管理npm镜像源的工具）`npm install -g nrm`

常用命令

- nrm ls   查看所有源地址
- nrm use taobao  切换为淘宝镜像源
- nrm add [name] [url]  添加源地址



### 通过git克隆代码到服务器

把代码clone到服务器



### 打包项目并且部署

- 部署前台页面（next.js）

`yarn build`

`yarn start`

或者用PM2进行进程守护（待研究）

- 部署后台接口（egg.js）

`npm start`

- 部署后台管理系统

直接`npm build`然后使用nginx进行代理



### 导入mysql数据出错

在导入本地mysql文件时遇到了一些错误，参考文章：

> https://www.jianshu.com/p/788dceb93eff



### Linux查看端口号占用情况以及杀进程命令

- netstart -anp（查看端口占用情况）

- lsof -i:8080（查看8080端口占用情况）
- kill -9 1234（杀PID=1234进程）