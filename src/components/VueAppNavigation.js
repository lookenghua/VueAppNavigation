import history from "../history";
import config from "../conf/config";

function isDef(v) {
  return v !== undefined && v !== null;
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

// eslint-disable-next-line no-unused-vars
function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    try {
      handlers();
    } catch (e) {
      console.log(e);
    }
  }
}
const stack = [];
const tabBarStack = [];

// 获取index
function getIndexByKey(key) {
  for (let index = 0; index < stack.length; index++) {
    if (stack[index].key === key) {
      return index;
    }
  }
  return -1;
}
// 获取tabBar的index
function getTabBarIndexByKey(key) {
  for (let index = 0; index < tabBarStack.length; index++) {
    if (tabBarStack[index].key === key) {
      return index;
    }
  }
  return -1;
}

let VueAppNavigation = keyName => {
  return {
    name: config.componentName,
    abstract: true,
    data() {
      return {};
    },
    props: {
      max: {
        type: [String, Number],
        default() {
          return "";
        }
      }
    },
    render() {
      let key = this.$route.query[keyName];
      const slot = this.$slots.default;
      const vnode = getFirstComponentChild(slot);
      if (!vnode) {
        return vnode;
      }
      if (history.action === config.tabBarName) {
        let index = getTabBarIndexByKey(key);
        if (index === -1) {
          tabBarStack.push({ key, vnode });
          vnode.data.keepAlive = true;
        } else {
          vnode.componentInstance = tabBarStack[index].vnode.componentInstance;
        }
        return vnode;
      } else {
        let index = getIndexByKey(key);
        if (index !== -1) {
          vnode.componentInstance = stack[index].vnode.componentInstance;
          // destroy the instances that will be spliced
          for (let i = index + 1; i < stack.length; i++) {
            stack[i].vnode.componentInstance.$destroy();
            stack[i] = null;
          }
          stack.splice(index + 1);
        } else {
          if (history.action === config.replaceName) {
            // TODO:未处理之前vnode的销毁
            stack[stack.length - 1].vnode = vnode;
            stack[stack.length - 1].key = key;
          } else {
            stack.push({ key, vnode });
          }
        }
        vnode.data.keepAlive = true;
        return vnode;
      }
    }
  };
};

function getStack() {
  return stack;
}

export { VueAppNavigation, getIndexByKey, getStack };
