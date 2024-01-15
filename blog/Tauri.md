---
draft: true
summary: >-
  Tauri 脚手架是一个抽象的 Flask 服务，当关闭时会自动杀死 Flask 进程。FOLDERID_RoamingAppData 和
  FOLDERID_LocalAppData 是 Windows 操作系统中的两个文件夹路径常量，分别用于存储应用程序的用户特定数据和本地数据。Roaming
  文件夹用于存储需要在多个计算机之间同步的用户数据，而 Local 文件夹用于存储本地数据，例如缓存文件和其他临时文件。
---

记录踩坑内容

- 抽象成一个 flask 服务 + tauri 的脚手架
- 关闭时杀掉 flask 进程

## appData 和 appLocalData 的区别

FOLDERID_RoamingAppData(dataDir) 和 FOLDERID_LocalAppData(localDataDir) 是 Windows 操作系统中的两个文件夹路径常量，分别代表当前用户的应用程序数据文件夹（Roaming）和本地应用程序数据文件夹（Local）。

具体区别如下：

Roaming：该文件夹用于存储应用程序的用户特定数据，例如个人设置和自定义选项。这些数据将随着用户的登录而在多个计算机之间同步，因此如果用户在一个计算机上更改了应用程序设置，则这些更改将在其他计算机上的应用程序中自动生效。

Local：该文件夹用于存储应用程序的本地数据，例如缓存文件和其他临时文件。这些数据不会随着用户的登录而在多个计算机之间同步，因此如果用户在一个计算机上更改了应用程序设置，则这些更改不会在其他计算机上的应用程序中自动生效。

总的来说，Roaming 文件夹用于存储需要在多个计算机之间同步的用户数据，而 Local 文件夹用于存储本地数据，例如缓存文件和其他临时文件。
