---
slug: expo-airbnb-clone
title: Expo 开发 Airbnb Clone 全栈应用
tags:
  - expo
  - airbnb-clone
  - mongodb
  - react-query
keywords:
  - expo
  - airbnb-clone
  - mongodb
  - react query
  - prisma
authors: Alan
description: >-
  使用 Expo 开发 Airbnb Clone 全栈应用，使用 MongoDB 作为数据库，使用 React Query 作为数据管理工具，使用
  Prisma 作为 ORM。
wip: true
summary: >-
  Expo 是一个开发移动端应用的框架，它可以帮助 Web 开发人员快速构建出跨平台的应用。Expo 的特性包括：对 Web
  开发人员友好、一套代码，多端运行、基于文件路径自动生成路由、良好的开发体验及工作流、官方提供了非常多的 SDK、可以创建 API
  服务、社区活跃更新频繁。Expo 与 React Native 的区别在于，Expo 提供了一些原生组件，这些组件在不同的平台会编译成对应的原生组件。在
  Expo 中，默认使用 Flex 布局，flexDirection 默认为 column。Expo 中引入了和 Next.js
  类似的路由方案，它是基于文件目录自动生成路由的。
---

最近对移动端应用的开发很感兴趣，工作 3 年半了，技术栈一直局限在 Web 端，加上公司也没有开发移动端的需求，还记得在上家公司开发过 2 个月的 React Native 项目，记得当时光是环境的搭建就耗费了我很多的时间。在开发这个 Airbnb 项目之前也调研过一些技术，发现 Expo 真的是一个非常不错的框架，作为一名 Web 开发人员在 Expo 的帮助下可以以很低的学习成本开发出一个移动端应用。

可以把 Expo 类比成 React Native 中的 Next.js

<!-- truncate -->

这篇文章主要记录我开发 Airbnb Clone 这个项目的过程中遇到的一些问题和解决方案。

## 项目简介

[项目地址](https://github.com/3Alan/airbnb-clone)

### 技术栈

- Expo
- React Query
- Prisma
- MongoDB

## Expo 的特性

- 对 Web 开发人员友好
- 一套代码，多端运行（Web、IOS、Android）
- 基于文件路径自动生成路由
- 良好的开发体验及工作流
- 官方提供了非常多的 SDK
- 可以创建 API 服务（最新版本 Beta）
- 社区活跃更新频繁

## RN 生态

### 组件库

- [NativeBase](https://nativebase.io/) (官方不再维护，使用人数多，社区反映性能差)
- [gluestack-ui](https://gluestack.io/) (NativeBase 团队开发，unstyled)
- [React Native Paper](https://reactnativepaper.com/) (Material 风格)
- [tamagui](https://tamagui.dev/) (unstyled)

### 动画

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Lottie](https://github.com/lottie-react-native/lottie-react-native)

## RN 开发和 Web 开发的区别

RN 提供了一些原生组件，这些组件在不同的平台会编译成对应的原生组件。
一些常用的组件

- View
- Text
- Image
- ScrollView
- FlatList
- TextInput
- TouchableOpacity

### 文本节点必须包裹在 Text 组件中

<Tabs>
<TabItem value="RN" label="RN">

```jsx
<Text>hello world</Text>
```

</TabItem>
<TabItem value="Web" label="Web">

```jsx
<div>hello world</div>
```

</TabItem>
</Tabs>

### 样式

在 RN 中没有 class 的概念，样式是通过 style 属性传递给组件的。

通过 StyleSheet.create 创建样式对象，然后通过 style 属性传递给组件。

```tsx
import React from 'react';
import { StyleSheet } from 'react-native';

const Avatar = () => {
  return <View style={styles.avatar}></View>;
};

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: '#fff',
    backgroundColor: '#eee'
  }
});
```

在 RN 中，默认使用 Flex 布局，flexDirection 默认为 column。

### 路由

Expo 中引入了和 Next.js 类似的路由方案，它是基于文件目录自动生成路由的。
对于 Expo 的路由，我觉得还有很多地方可以学习 Next.js，比如对于 app 目录下面的所有文件，Expo 都会将其编译成一个页面，而 Next.js 只会将目录下的 page.jsx 文件编译成路由。 这样就导致我无法将相同模块的页面的组件和一些公共方法聚合在一块，社区已经有人提出这个[建议](https://github.com/expo/router/discussions/309#discussioncomment-5563148)了，希望后面 Expo 团队会采纳吧

### 手机状态栏高度的处理

通过 react-native-safe-area-context 处理，防止内容覆盖手机状态栏

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 该hook可以获取安全区域的边距
const { bottom, top, left, right } = useSafeAreaInsets();
```

```tsx
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        <Text>My App</Text>
      </View>
    </SafeAreaProvider>
  );
}
```

### RN 中不支持的一些 Web 特性

- svg (可以通过 react-native-svg 解决)
- 渐变 (可以通过 expo-linear-gradient 解决)

### Prisma

### React Query

### 一些错误

#### Cannot find native module 'ExpoImage'

#### TurboModuleRegistry.getEnforcing(...): 'RNCWebView' could not be found

当安装了某些依赖于原生代码的库时，出现了类似某个模块没有找到的问题，如果使用的是 Expo 的 [development build](https://docs.expo.dev/develop/development-builds/create-a-build/)，只需要重新 build 一次就能解决了。

> https://docs.expo.dev/workflow/overview/#the-core-development-loop
