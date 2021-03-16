# vue-app-navigation

[![npm version](https://badge.fury.io/js/vue-page-stack.svg)](https://badge.fury.io/js/vue-page-stack)

English | [简体中文](./README.zh-cn.md)

---

A Vue SPA navigation manager,cache the UI in the SPA like a native application, rather than destroy it.

<div align="center">
  <img src="https://i.loli.net/2019/10/31/HKYfJBVWjXdZozm.gif">
</div>

## Example

[preview](https://hezhongfeng.github.io/vue-page-stack-example/)

[demo code](https://github.com/hezhongfeng/vue-page-stack-example)

## Features

- 🐉expanded on vue-router, the original navigation logic remains unchanged
- ⚽When a page is re-rendered as a `push` or `forward`, the newly rendered page will be added to the Stack.
- 🏆When `back` or `go(negative number)`, the previous pages are not re-rendered, but instead are read from the Stack, and these pages retain the previous content state, such as the form content, the position of the scroll bar
- 🏈`back` or `go (negative)` will remove unused pages from the Stack
- 🎓`replace` will update the current page in the stack
- 🎉activated hook function triggers when rolling back to the previous page
- 🚀Browser back and forward events are supporded
- 🍕Responding to changes in routes with Parameters is supporded, such as navigating from `/user/foo` to `/user/bar`, component instances are reused
- 🐰provides routing direction changes, and you can add different animations when forward or backward

## Installation and use

### Installation

```
npm install vue-app-navigation
# OR
yarn add vue-app-navigation
```

### use

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

### install

use `Vue.use` to install `vue-app-navigation`

```
Vue.use(VueAppNavigation, options);
// example
Vue.use(VueAppNavigation, { router });
```

Options description：

| Attribute | Description         | Type   | Accepted Values     | Default        |
| --------- | ------------------- | ------ | ------------------- | -------------- |
| router    | vue-router instance | Object | vue-router instance | -              |
| name      | VueAppNavigation name | String | 'VueAppNavigation'      | 'VueAppNavigation' |
| keyName   | stack-key name      | String | 'stack-key'         | 'stack-key'    |

you can customize VueAppNavigation's name and keyName

```
Vue.use(VueAppNavigation, { router, name: 'VueAppNavigation', keyName: 'stack-key' });
```

### forward or backward

If you want to make some animate entering or leaving, `Vue-app-navigation` offers `stack-key-dir` to judge forward or backward.

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

## Notes

### keyName

Why is the parameter `keyName` added to the route? To support the browser's backward and forward events，this is important in webApp or wechat.

### Changelog

Details changes for each release are documented in the [release notes](https://github.com/lookenghua/vue-app-navigation/releases).

### Principle

Getting the current page instance refers to the `keep-alive` section of `Vue`.

## Thanks

The plug-in draws on  [vue-page-stack](https://github.com/hezhongfeng/vue-page-stack)，Thank you very much for their inspiration.

