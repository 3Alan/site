---
slug: Hackintosh-B460M-MORTAR-WIFI-EFI-installation
title: Hackintosh B460M-MORTAR WIFI 黑苹果安装记录
tags:
  - 黑苹果
  - 装机
categories:
  - 黑苹果
date: 2021-06-08T17:38:35.000Z
keywords:
  - Hackintosh EFI
  - 微星B460M-MORTAR-WIFI
  - 黑苹果配置
  - 黑苹果安装教程
  - i5-10400黑苹果
  - Monterey
  - RX6600
authors: Alan
description: Hackintosh B460M-MORTAR WIFI 黑苹果安装教程
out_dated: true
summary: >-
  本文记录了作者使用微星B460M-MORTAR-WIFI主板和i5-10400处理器安装黑苹果的操作过程。作者提供了详细的硬件配置、软件版本信息以及安装步骤。他还分享了EFI仓库地址，以便其他用户参考。在安装过程中，作者遇到了Windows和Mac时间不同步的问题，并提供了解决方法。
---

Hackintosh B460M-MORTAR WIFI + i5-10400 黑苹果安装

<!--truncate-->

这篇文章主要记录我安装黑苹果的过程。
这是我的[EFI 仓库地址](https://github.com/3Alan/Hackintosh-i5-10400-B460M-MORTAR-WIFI)

## 版本信息

- MacOS 11.3.1
- 引导方式 `opencore`

## 硬件配置

| 组件 | 型号                                     |
| ---- | ---------------------------------------- |
| 主板 | 微星 B460M MORTAR Wifi                   |
| CPU  | Intel i5 10400                           |
| 内存 | 金士顿骇客神条 RGB 灯条 8GB \* 2 2666MHz |
| 显卡 | Intel UHD Graphics 630（CPU 自带核显）   |
| SSD  | 铠侠 RC10 512GB \* 2                     |
| 电源 | 振华 LEADEX G 550                        |
| 机箱 | 爱国者 M2 白色                           |
| 散热 | 乔思伯 CR-1000 白色                      |

## 功能测试

- [x] 睡眠/唤醒
- [x] 所有 USB 端口
- [x] 核显硬件加速
- [x] 声卡输出
- [x] 蓝牙
- [x] wifi
- [x] windows 和 mac 时间不同步问题

## 下载镜像并制作镜像 U 盘

1. 黑果小兵的镜像`11.3.1`，下载完成后使用 WinMD5 检查镜像对比 md5 值是否一样，这一步的目的是为了保证下载的镜像完整。
2. 使用`balenaEtcher`制作安装镜像(以管理员身份运行)。
3. 安装完成后使用磁盘管理工具`diskgenius`将适合自己的`EFI`文件替换掉 U 盘的`EFI`文件。

## 设置 BIOS

- 设置 U 盘为第一引导项

## 安装 MacOS

1. 进入 OC 引导页面
2. 选择`Install macOS Big Sur`
3. 等待一系列的安装过程后进入安装界面
4. 选择磁盘工具，左上角`选择显示所有设备`
5. 选择要安装 MacOS 的磁盘，点击抹掉，名称：`随意，能分辨就行`、格式：`APFS`、方案：`GUID分区图`，抹掉完成后返回上一界面点击`安装macOS`。
6. 一系列操作后就安装完了

## 系统设置

先打开终端，输入几行命令：

```
sudo spctl --master-disable    # 启用macOS安装应用允许任何来源
sudo kextcache -i /            # 重建缓存
```

如果出于某些原因，在/System/Library/Extensions/或者/Library/Extensions/修改了某些驱动，请使用以下命令重建缓存：

```
sudo chown -R root:wheel /System/Library/Extensions/
sudo chmod -R 755 /System/Library/Extensions/
sudo kmutil install --update-all
sudo kcditto
```

## 将 EFI 文件移动到磁盘中

这一步是为了让系统能脱离 U 盘进入 Mac 系统。
这一步可以使用 hackintool 来完成，挂载你的磁盘和 U 盘的 EFI 分区，然后将 EFI 复制到磁盘的 EFI 分区就可以。
最后拔掉 U 盘，至此黑苹果安装完成。

> 参考资料
> https://mp.weixin.qq.com/s/UNtxsMIaKISyH6uRNt0LzQ > https://github.com/cheneyxx/Hackintosh-10400-B460M-MORTAR
