---
slug: expo-airbnb-clone
title: Build a Fullstack Airbnb Clone App with Expo
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
  Build a fullstack Airbnb Clone app with Expo, using MongoDB as the database,
  React Query as the data management tool, and Prisma as the ORM.
wip: true
summary: >-
  I've been interested in developing mobile apps recently, but I've been working
  for three and a half years, and my tech stack has been limited to the web.
  Before developing the Airbnb project, I researched some technologies and found
  that Expo is a very good framework that can help web developers develop mobile
  apps with a very low learning cost.


  Expo's features include being friendly to web developers, having one codebase
  that runs on multiple platforms, and automatically generating routes based on
  file paths.


  The difference between RN development and web development is that RN provides
  some native components that are compiled into corresponding native components
  on different platforms.


  In RN, there is no concept of class, and styles are passed to components
  through the style attribute.


  Some Web features are not supported in RN, such as svg and gradients, which
  can be solved through third-party libraries.
ai_translation: true
---

I've been interested in developing mobile apps recently, but I've been working for three and a half years, and my tech stack has been limited to the web. Plus, the company didn't have a demand for developing mobile apps. I remember developing a React Native project for two months at my previous company, and I remember that just setting up the environment took me a lot of time. Before developing this Airbnb project, I researched some technologies and found that Expo is a very good framework. As a web developer, with the help of Expo, I can develop a mobile app with a very low learning cost.

Expo can be likened to Next.js in React Native

<!-- truncate -->

This article mainly records some of the problems and solutions I encountered during the development of the Airbnb Clone project.

## Project Introduction

[Project Address](https://github.com/3Alan/airbnb-clone)

### Tech Stack

- Expo
- React Query
- Prisma
- MongoDB

## Expo Features

- Friendly to web developers
- One codebase, multiple platforms (Web, IOS, Android)
- Automatically generate routes based on file paths
- Good development experience and workflow
- The official provides many SDKs
- You can create API services (latest version Beta)
- Active community and frequent updates

## RN Ecosystem

### Component Library

- [NativeBase](https://nativebase.io/) (No longer maintained by the official, many users, community feedback on poor performance)
- [gluestack-ui](https://gluestack.io/) (Developed by the NativeBase team, unstyled)
- [React Native Paper](https://reactnativepaper.com/) (Material style)
- [tamagui](https://tamagui.dev/) (unstyled)

### Animation

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Lottie](https://github.com/lottie-react-native/lottie-react-native)

## Difference Between RN Development and Web Development

RN provides some native components that are compiled into corresponding native components on different platforms.
Some commonly used components

- View
- Text
- Image
- ScrollView
- FlatList
- TextInput
- TouchableOpacity

### Text Nodes Must Be Wrapped in Text Components

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

### Style

In RN, there is no concept of class, and styles are passed to components through the style attribute.

Create a style object through StyleSheet.create, and then pass it to the component through the style attribute.

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

In RN, Flex layout is used by default, and flexDirection is column by default.

### Routing

Expo introduces a routing scheme similar to Next.js, which automatically generates routes based on the file directory.
For Expo routing, I think there are still many places to learn from Next.js. For example, for all the files under the app directory, Expo will compile them into a page, while Next.js will only compile the page.jsx files under the directory into routes. This makes it impossible for me to aggregate the components and some common methods of the pages of the same module together. The community has already made this [suggestion](https://github.com/expo/router/discussions/309#discussioncomment-5563148). I hope the Expo team will adopt it later.

### Handling the Height of the Phone Status Bar

Use react-native-safe-area-context to handle it, to prevent the content from covering the phone status bar

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// This hook can get the margins of the safe area
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

### Some Web Features Not Supported in RN

- svg (can be solved through react-native-svg)
- Gradient (can be solved through expo-linear-gradient)

### Prisma

### React Query

### Some Errors

#### Cannot find native module 'ExpoImage'

#### TurboModuleRegistry.getEnforcing(...): 'RNCWebView' could not be found

When some libraries that depend on native code are installed, problems such as a certain module not being found appear. If you are using Expo's [development build](https://docs.expo.dev/develop/development-builds/create-a-build/), you only need to rebuild it once to solve it.

> https://docs.expo.dev/workflow/overview/#the-core-development-loop
