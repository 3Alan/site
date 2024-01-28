---
slug: expo-airbnb-clone
title: Expo Development Airbnb Clone Full Stack Application
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
  Develop Airbnb Clone Full Stack Application using Expo, MongoDB as the
  database, React Query as the data management tool, and Prisma as the ORM.
wip: true
summary: >-
  Recently, I have been interested in mobile application development. I have
  been working in the web development field for three and a half years. Before
  starting the Airbnb project, I researched some technologies and found Expo to
  be a great framework that can help web developers easily develop a mobile
  application with low learning costs.


  Expo's features include being friendly for web developers, being able to run
  on multiple platforms with a single codebase, and automatically generating
  routes based on file paths.


  The difference between RN development and web development is that RN provides
  native components which are compiled into platform-specific native components.

  In RN, there is no concept of classes, and styles are passed to components
  through the style attribute.

  RN does not support some web features such as SVG and gradients, but they can
  be solved with third-party libraries.
ai_translation: true
---

I have recently become interested in mobile application development. I have been working in the web development field for 3 and a half years, and my skills have been limited to the web. Due to the lack of demand from my company, I have not had the opportunity to develop for mobile. I remember spending a lot of time setting up the environment for a React Native project at my previous job. Before starting this Airbnb project, I researched some technologies and found Expo to be a really great framework. It allows web developers to easily develop a mobile application with low learning costs.

You can consider Expo as the Next.js of React Native.

<!-- truncate -->

This article mainly documents the problems and solutions I encountered during the development of the Airbnb Clone project.

## Project Overview

[Project Repository](https://github.com/3Alan/airbnb-clone)

### Technology Stack

- Expo
- React Query
- Prisma
- MongoDB

## Features of Expo

- Friendly for web developers
- Supports multi-platform development (Web, iOS, Android)
- Automatically generates routes based on file paths
- Provides a good development experience and workflow
- Offers a wide range of official SDKs
- Can create API services (latest version in Beta)
- Active community with frequent updates

## React Native Ecosystem

### Component Libraries

- [NativeBase](https://nativebase.io/) (No longer officially maintained, but widely used despite the poor performance reported by the community)
- [gluestack-ui](https://gluestack.io/) (Developed by the NativeBase team, unstyled)
- [React Native Paper](https://reactnativepaper.com/) (Material-style)
- [tamagui](https://tamagui.dev/) (unstyled)

### Animations

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Lottie](https://github.com/lottie-react-native/lottie-react-native)

## Differences between React Native and Web Development

React Native provides some native components which are compiled into platform-specific native components. Some commonly used components include:

- View
- Text
- Image
- ScrollView
- FlatList
- TextInput
- TouchableOpacity

### Text nodes must be wrapped within a Text component

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

### Styles

In React Native, there is no concept of classes, and styles are passed to components through the style attribute.

Styles are created using StyleSheet.create to create a style object, which is then passed to components using the style attribute.

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

By default, React Native uses Flex layout, with flexDirection defaulting to column.

### Routing

Expo introduced a routing solution similar to Next.js, which generates routes based on file directories.

For Expo's routing, I believe there is still much to learn from Next.js. Expo compiles all files under the app directory into one page, while Next.js only compiles the page.jsx file within the directory into a route. This prevents me from aggregating components and common methods for pages with the same module. Some people have already proposed this [suggestion](https://github.com/expo/router/discussions/309#discussioncomment-5563148) in the community, and I hope the Expo team will consider it in the future.

### Handling Mobile Status Bar Height

Handled using react-native-safe-area-context to prevent content from overlapping the mobile status bar.

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// This hook retrieves the insets of the safe area
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

### Web Features Not Supported in React Native

- SVG (Can be solved using react-native-svg)
- Gradients (Can be solved using expo-linear-gradient)

### Prisma

### React Query

### Common Errors

#### Cannot find native module 'ExpoImage'

#### TurboModuleRegistry.getEnforcing(...): 'RNCWebView' could not be found

When installing dependencies that rely on native code, you may encounter errors similar to a module not being found. If you are using Expo's [development build](https://docs.expo.dev/develop/development-builds/create-a-build/), simply rebuilding the project will resolve the issue.

> https://docs.expo.dev/workflow/overview/#the-core-development-loop
