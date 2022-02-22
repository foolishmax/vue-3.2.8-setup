import store from "@/store";

export default (el, binding) => {
  const { value } = binding;
  const points = store.getters.userInfo.permission.points;

  if (value instanceof Array) {
    const hasPermission = points.some((point) => value.includes(point));

    if (!hasPermission) {
      el.parentNode?.removeChild(el);
    }
  } else {
    throw new Error('v-permission value is ["admin","editor"]');
  }
};
