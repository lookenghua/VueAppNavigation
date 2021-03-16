# vue-app-navigation

[![npm version](https://badge.fury.io/js/vue-page-stack.svg)](https://badge.fury.io/js/vue-page-stack)

[English](./README.md) | 简体中文

---

Vue 单页应用导航管理器，像原生 app 一样管理页面栈而不是销毁。

<div align="center">
  <img src="https://i.loli.net/2019/10/31/HKYfJBVWjXdZozm.gif">
</div>

## 功能特性

- 🐉 在 vue-router 上扩展，原有导航逻辑不变
- ⚽`push`或者`forward`的时候重新渲染页面，Stack 中会添加新渲染的页面
- 🏆`back`或者`go(负数)`的时候先前的页面不会重新渲染，而是从 Stack 中读取，并且这些页面保留着先前的内容状态，例如表单内容，滚动条滑动的位置等
- 🏈`back`或者`go(负数)`的时候会把不用的页面从 Stack 中移除
- 🎓`replace`会更新 Stack 中当前页面
- 🎉 回退到之前页面的时候有 activated 钩子函数触发
- 🚀 支持浏览器的后退，前进事件
- 🍕 支持响应路由参数的变化，例如从 /user/foo 导航到 /user/bar，组件实例会被复用
- 🐰 提供路由方向的变化，并且可以在前进和后退的时候添加不同的动画

## 安装和用法

### 安装

```
npm install vue-app-navigation
# OR
yarn add vue-app-navigation
```

### 使用

```
import Vue from 'vue'
import VueAppNavigation from 'vue-app-navigation';

// vue-router is necessary
Vue.use(VueAppNavigation, { router });
```

```
// App.vue
<template>
  <div id="app">
    <vue-app-navigation>
      <router-view ></router-view>
    </vue-app-navigationvue-app-navigation>
  </div>
</template>
```

### CDN

```
<script src="https://unpkg.com/vue-page-stack/dist/vue-page-stack.umd.min.js"></script>
```

```
Vue.use(VueAppNavigation, { router });
```

## API

### 注册插件

注册的时候可以指定 VueAppNavigation 的名字和 keyName

use `Vue.use` to install `vue-app-navigation`
使用之前需要注册插件

```
Vue.use(VueAppNavigation, options);
// example
Vue.use(VueAppNavigation, { router });
```

Options 说明：

| Attribute | Description         | Type   | Accepted Values     | Default        |
| --------- | ------------------- | ------ | ------------------- | -------------- |
| router    | vue-router instance | Object | vue-router instance | -              |
| name      | VueAppNavigation name | String | 'VueAppNavigation'      | 'VueAppNavigation' |
| keyName   | stack-key name      | String | 'stack-key'         | 'stack-key'    |

注册的时候可以指定VueAppNavigation 的名字和 keyName

```
Vue.use(VuePageStack, { router, name: 'VuePageStack', keyName: 'stack-key' });
```

### 前进和后退

如果想在页面前进或者后退的时候添加一些动画，可以通过`stack-key-dir`进行判断

```
// App.vue
$route(to, from) {
  if (to.params['stack-key-dir'] === 'forward') {
    this.transitionName = 'forward';
  } else {
    this.transitionName = 'back';
  }
}
```

## 相关说明

### keyName

为什么会给路由添加`keyName`这个参数，是为了支持浏览器的后退，前进事件，这个特性在 webApp,微信公众号和小程序很重要

### 更新日志

主要的更新日志在 [release notes](https://github.com/lookenghua/vue-app-navigation/releases)

### 原理

获取当前页面实例部分参考了`Vue`源码中`keep-alive`的部分

## 感谢

这个插件借鉴了[vue-navigation](https://github.com/zack24q/vue-navigation)，很感谢他们给的灵感。


