---
title: '鲲 Galgame 论坛 App 安装指南'
banner: '/content/notice/forum-app/banner.avif'
description: '鲲 Galgame 论坛'
publishedTime: 2024-12-4
modifiedTime: 2024-12-4
category: notice
authorUid: 2
authorName: '鲲'
authorAvatar: 'https://image.kungal.com/avatar/user_2/avatar.webp'
authorHomepage: 'https://github.com/KUN1007'
pin: true
---

## 简介

我们的网站总体是 Node.js 的技术栈，可以使用 `Electron` 来实现 APP 的集成

但是这样会在大家的设备中占用 100MB 左右的空间，并且完全没有必要做，所以就没有做

但是，我们的网站很久以前就支持一种叫做 `PWA` 的技术

使用 PWA，在现阶段来说，和使用 APP 没有区别，所以实在想安装的朋友们可以安装一下网站的 PWA

PWA 可以理解为一种应用程序，目前仅会占用大家设备不到 1MB 的存储空间，小小的


## 如何安装 PWA

### 电脑端

对于 PC Web 浏览器端的用户，可以点击浏览器的这里安装

![image.png](https://image.kungal.com/topic/user_2/%E9%B2%B2-1725281133226.webp)

没有这个提示的话，就点击右上角三个点，再点击 `安装应用`

安装只需要两秒，结束后会变成一个快捷方式一样的东东

### 手机端

对于手机端的用户

必须使用 `Chrome`, `Firefox`, `Edge`, `Brave` 等现代浏览器，**Via, X, 手机自带浏览器等无法安装 PWA**

有现代浏览器的朋友们，可以点击右上角 `安装应用` 进行安装，安装过程需要 10s 左右，同样会占用大家不到 1MB 的设备存储空间

![image.png](https://image.kungal.com/topic/user_2/%E9%B2%B2-1725281967801.webp)

安装成功后大概是这样

![image.png](https://image.kungal.com/topic/user_2/%E9%B2%B2-1725281927215.webp)

~~嗯！是的！这就是个快捷方式一样的东东！但是理论上确实会快一点~~

## 常见问题

> 一定要安装软件吗

不不不，完全不用，我们认为网站已经足够了，安装不安装无所谓的，只是有的朋友比较喜欢软件形式

不过未来也许真的有一天会有软件，因为手机端和电脑端的布局兼容比较费劲，如果太闲的话以后会有吧


> Edge 等现代浏览器安装不了

这个也是未知问题，不知道如何修复，安装不上直接用网站就很好的啦


> 安装后会有概率启动后一直卡在logo界面

同样是未知问题！所以不知道怎么修复啦，哎嘿~


根据回复来看：手机端 edge 无法安装的原因找到了，要打开桌面快捷方式的权限喔
