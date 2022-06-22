export const generateUUID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const flattenDefaultParams = (params) => {
  const flattenedParams = {};

  Object.keys(params).forEach((param) => {
    if (params[param] && params[param].type) {
      flattenedParams[param] = params[param].default;
    } else {
      flattenedParams[param] = params[param];
    }
  });

  return flattenedParams;
};

export const curtainsEvents = {
  subscriptions: {
    onAfterResize: [],
    onContextLost: [],
    onContextRestored: [],
    onError: [],
    onSuccess: [],
    onRender: [],
    onScroll: [],
  },

  kebabCase: {
    onAfterResize: "after-resize",
    onContextLost: "context-lost",
    onContextRestored: "context-restored",
    onError: "error",
    onSuccess: "success",
    onRender: "render",
    onScroll: "scroll",
  },

  isValidEvent(event) {
    return !!Object.keys(this.subscriptions).find((e) => event === e);
  },

  addSubscription(subscription) {
    if (!this.isValidEvent(subscription.event)) return;

    // is it already in our subscription event array?
    const existingSubscription = this.subscriptions[subscription.event].find(
      (el) => el.id === subscription.id
    );
    // if not we'll add it
    if (!existingSubscription) {
      this.subscriptions[subscription.event].push(subscription);
    }
  },

  removeSubscription(subscription) {
    if (!this.isValidEvent(subscription.event)) return;

    // remove from our subscription event array
    this.subscriptions[subscription.event] = this.subscriptions[
      subscription.event
      ].filter((el) => el.id !== subscription.id);
  },
};
