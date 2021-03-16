import config from "./conf/config";
import { VueAppNavigation, getIndexByKey } from "./components/VueAppNavigation";
import mixin from "./mixin";
import history from "./history";
function hasKey(query, keyName) {
  return !!query[keyName];
}

function getKey(src) {
  return src.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0;
    let v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const VueAppNavigationPlugin = {};
VueAppNavigationPlugin.install = (
  Vue,
  { router, name = config.componentName, keyName = config.keyName }
) => {
  if (!router) {
    throw "Vue router是必不可少的";
  }
  // 注册组件
  Vue.component(name, VueAppNavigation(keyName));
  // 重写路由跳转方法
  mixin(router);

  function beforeEach(to, from, next) {
    if (to?.meta?.tabBar) {
      history.action = config.tabBarName;
    }
    if (!hasKey(to.query, keyName)) {
      history.lastKey = "";
      to.query[keyName] = getKey("xxxxxxxx");

      let replace =
        history.action === config.replaceName ||
        !hasKey(from.query, keyName) ||
        history.action === config.tabBarName;

      next({
        hash: to.hash,
        path: to.path,
        name: to.name,
        params: to.params,
        query: to.query,
        meta: to.meta,
        replace: replace
      });
    } else {
      let index = getIndexByKey(to.query[keyName]);
      if (index === -1) {
        to.params[keyName + "-dir"] = config.forwardName;
        history.lastKey = from.query[keyName];
      } else {
        to.params[keyName + "-dir"] = config.backName;
        history.lastKey = "";
      }
      next(true);
    }
  }

  // ensure it's the first beforeEach hook
  router.beforeHooks.unshift(beforeEach);
};
export default VueAppNavigationPlugin;
