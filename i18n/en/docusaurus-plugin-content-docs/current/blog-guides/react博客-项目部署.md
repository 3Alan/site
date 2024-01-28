---
slug: deploy
title: React Blog - Project Deployment
tags:
  - Deployment
  - Blog
  - React
  - Alibaba Cloud
categories:
  - Front-end
  - React
date: 2020-05-13T15:51:16.000Z
out_dated: true
summary: >-
  Alibaba Cloud recently launched an event where you can receive a free server
  for six months. After purchasing the server, you can connect to it using putty
  and manage it using the Baota control panel. After successful installation of
  Baota, you need to set up a website with port number 8888 to access the
  server. After that, you can clone the project code to the server and deploy
  it. If you encounter any errors while importing the MySQL data, you can refer
  to the relevant article for a solution.
ai_translation: true
---

Alibaba Cloud recently launched a "practice at home" activity, where you can receive a free server for **free** for six months, which is great! [Click here](https://developer.aliyun.com/adc/student/) to claim it.

<!--truncate-->

## Purchase Alibaba Cloud Server

After purchase, you will receive a `public IP`.

Download the software `putty` to connect to the server you just bought. Simply input the public IP and click open.

In the command line, input the username `root` and password to get `Welcome to Alibaba Cloud Elastic Compute Service!`, indicating successful connection.

## Manage with Baota Control Panel

https://www.bt.cn/bbs/thread-19376-1-1.html

After successfully connecting to the server, input the following command in the command line (**for Centos operating system, for other systems refer to the link above**) to install Baota by copying and right-clicking:

```
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

After successful installation, you will receive a website with a port number of 8888, along with an account and password:

![image-20200507135712898](https://raw.githubusercontent.com/3Alan/images/master/img/image-20200507135712898.png)

Visit the address, but you will not be able to access the website at this time because the remote server has not opened port 8888.

Setup guide:

https://www.bt.cn/bbs/thread-2897-1-1.html

After successful login, install MySQL and nginx (almost all operations will be performed on Baota).

### Software Installation Required

- PHP environment (for phpMyAdmin)
- phpMyAdmin (for managing MySQL database)
- PM2 (comes with Node environment)
- nginx

### Open port 80 (http) to access the server

Set this in the security group in the Alibaba Cloud Server Management Console.

After setting this, you can access the server using the public IP.

## Project Deployment

### Switching Mirrors

Install nrm (a tool for managing npm mirror sources) `npm install -g nrm`

Common commands:

- nrm ls: View all source addresses
- nrm use taobao: Switch to Taobao mirror source
- nrm add [name] [url]: Add source address

### Clone code to server using git

Clone the code to the server.

### Package and deploy the project

- Deploy the front-end (next.js) page

`yarn build`

`yarn start`

or use PM2 for process monitoring (requires further research)

- Deploy the back-end API (egg.js)

`npm start`

- Deploy the back-end management system

Build using `npm build` and then use nginx for proxying.

### Error in importing MySQL data

Encountered some errors while importing local MySQL files. Refer to this article for a solution:

> https://www.jianshu.com/p/788dceb93eff

### Linux command to view port usage and kill processes

- netstart -anp (view port usage)

- lsof -i:8080 (view port usage for port 8080)
- kill -9 1234 (kill process with PID=1234)
