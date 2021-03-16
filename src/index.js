const VueAppNavigationPlugin = {};
VueAppNavigationPlugin.install = (Vue, { router }) => {
  if (router) {
    throw "Vue router是必不可少的";
  }
};
export default VueAppNavigationPlugin;
