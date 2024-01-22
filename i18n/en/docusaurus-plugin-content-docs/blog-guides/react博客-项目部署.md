---
slug: deploy
title: react-blog - Project Deployment
tags:
  - Deploy
  - Blog
  - React
  - Alibaba Cloud
categories:
  - Front-end
  - React
date: 2020-05-13T15:51:16.000Z
out_dated: true
summary: >-
  Alibaba Cloud recently launched an event where you can get a free server for
  half a year. After purchasing the server, you can use Putty to connect to the
  server and manage it using Pagoda. After Pagoda is installed successfully, you
  need to set the port number to 8888 to access the server. After that, you can
  clone the project code to the server and deploy it. If you encounter an error
  when importing MySQL data, you can refer to the related article for a
  solution.
ai_translation: true
---

Alibaba Cloud recently launched a "Home Practice Activity" where you can get a free server for half a year. What a bargain! [Redemption Address](https://developer.aliyun.com/adc/student/)

<!--truncate-->

## Purchase Alibaba Cloud Server

After the purchase, you will get a `public network ip`.

Download the software `putty` to connect to the server we just purchased. Simply enter the public network ip and click open.

Enter the username `root` and password in the command line to get `Welcome to Alibaba Cloud Elastic Compute Service!` and the connection is complete.

## Use Pagoda for Management

https://www.bt.cn/bbs/thread-19376-1-1.html

After successfully connecting to the server, enter the following in the command line (**Centos** system, check the above URL for other systems), copy and right-click to complete the installation of Pagoda.

```
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

After the installation is successful, a website with port number 8888 and an account and password will be returned:

![image-20200507135712898](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200507135712898.png)

When you visit this address, the website is not accessible because the remote server does not open port 8888.

Tutorial:

https://www.bt.cn/bbs/thread-2897-1-1.html

After logging in successfully, install mysql and nginx (almost all operations will be performed on Pagoda afterwards).

### Software to be Installed

- PHP environment (for phpmyadmin)
- phpMyAdmin (for managing MySQL databases)
- PM2 (with built-in node environment)
- nginx

### Open Port 80 (http) to Access Server

Set up in the Alibaba Cloud Server Management Console Security Group.

After the setup, you can access the server through the public network ip.

## Deploy Project

### Switch Mirror Source

Install nrm (a tool for managing npm mirror sources) `npm install -g nrm`

Common commands

- nrm ls View all source addresses
- nrm use taobao Switch to Taobao mirror source
- nrm add [name] [url] Add source address

### Clone Code to Server via git

Clone the code to the server

### Package and Deploy Project

- Deploy Front-end Page (next.js)

`yarn build`

`yarn start`

Or use PM2 for process monitoring (to be studied)

- Deploy Back-end Interface (egg.js)

`npm start`

- Deploy Back-end Management System

Directly `npm build` and then use nginx for proxying.

### Error Importing MySQL Data

I encountered some errors when importing local MySQL files. Refer to the article:

> https://www.jianshu.com/p/788dceb93eff

### Linux Commands to View Port Number Usage and Kill Processes

- netstart -anp (View port usage)

- lsof -i:8080 (View port 8080 usage)
- kill -9 1234 (Kill process PID=1234)
