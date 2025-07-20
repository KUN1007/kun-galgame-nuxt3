---
title: 'Markdown 编辑器语法指南'
banner: '/content/other/markdown-grammar/banner.avif'
description: 'Markdown 编辑器语法指南：本指南介绍了鲲 Galgame 论坛使用的 Markdown 编辑器语法（基于 CommonMark + GFM），帮助用户熟练掌握文本格式化技巧。涵盖内容包括标题、空行、代码块、图片、加粗、视频插入等常用功能，并详细说明了论坛特定的语法规则。例如，代码块可通过 ``` + 语言名创建，图片支持本地上传及外链插入，而视频功能需提供视频文件直链。指南还列出了编辑器的一些限制，如有序列表与无序列表相同、行内代码可能存在 bug、每日图片上传上限 50 张等。通过本指南，用户可以更高效地撰写内容并优化论坛阅读体验。'
publishedTime: 2024-05-04
modifiedTime: 2024-05-04
category: other
authorUid: 2
authorName: '鲲'
authorAvatar: 'https://image.kungal.com/avatar/user_2/avatar.webp'
authorHomepage: 'https://github.com/KUN1007'
pin: false
---

## 简介

本论坛使用了 Markdown 编辑器，因此遵循的是 Markdown 语法 (准确来说是 commonmark + gfm)

我们在这里对 Markdown 语法做一下基本介绍

## 标题

使用不同个数的 # 符号 + 一个空格打出标题

```markdown
# 一级标题

## 二级标题

### 三级标题

...
```

## 空行

使用两个空格加一个回车打出空行

注意！直接回车造成的换行，不论多少个换行都会被合并为一个换行

```md
[空格1][空格2]
```

## 代码块

使用 ``` 加上编程语言的名字，回车一下即可创建对应的代码块

````md
```rust

```
````

我们目前支持 c, cpp, csharp, css, go, haskell, python, java, javascript, typescript, jsx, kotlin, r, rust, scala, sql, tsx, markdown 的语法高亮

如果这些语言中没有您想要的语言，请随时与我们联系

## 图片

上传图片可直接点击上传，或者 Ctrl + v 粘贴剪切板上的图片

对于外站的图片，直接复制是可以自动被加载进编辑器的，如果不显示说明外站禁止其他网站引用图片

可以使用下面的方法手动插入图片

```md
![图片描述](图片地址)
```

## 加粗

在你想要加粗的文字前后都添加两个 \* 即可加粗

```md
我不是**萝莉控**！
```

我不是 **萝莉控**

注意，需要在第一对 \*\* 前面添加一个空号，否则不生效

这些常见的，上面的菜单里都有，就不说了

还想知道更多用法可以自己搜索

## 视频

视频功能不稳定, 之后随时可能变更

```md
kv:你的视频链接
```

这样就可以插入视频了, 必须是视频文件的直链才可以插入

## 注意

论坛的有序列表和无序列表是相同的 (懒得改了)

插入链接的时候，如果链接不以 http:// 或 https:// 等等网址的形式开头，那么会被导航到论坛内的地址。例如 kungal.com 就不行，必须要 [https://kungal.com](https://kungal.com/)

<br/>

行内代码是有 BUG 的，建议的操作是先打一个 `，结束的时候再补全，或者使用菜单

如果编辑器没有自动换行，请在上一行手动换行

编辑器会识别富文本内容，粘贴纯文本可以使用 Ctrl + Shift + v

论坛的图片限制是每人每天上限 50 张
