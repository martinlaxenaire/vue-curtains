import { Curtains } from "curtainsjs";

export default {
  install: (
    app,
    options = {
      alpha: true,
      antialias: true,
      permultipliedAlpha: false,
      depth: true,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: true,
      stencil: false,
      autoRender: true,
      autoResize: true,
      pixelRatio: 1,
      renderingScale: 1,
      watchScroll: true,
      production: process.env.NODE_ENV === "production",
    }
  ) => {
    const $vueCurtains = {
      curtains: new Curtains(options),

      // subscribe to our curtains events
      subscriptions: {
        onAfterResize: [],
        onContextLost: [],
        onContextRestored: [],
        onError: [],
        onSuccess: [],
        onRender: [],
        onScroll: [],
      },

      isValidEvent(event) {
        return !!Object.keys(this.subscriptions).find((e) => event === e);
      },

      addSubscription(subscription) {
        if (!this.isValidEvent(subscription.event)) return;

        // is it already in our subscription event array?
        const existingSubscription = this.subscriptions[
          subscription.event
        ].find((el) => el.id === subscription.id);
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

    // pass our curtains instance to the Vue app as well
    const $curtains = $vueCurtains.curtains;

    //app.config.globalProperties.$vueCurtains = $vueCurtains;
    //app.config.globalProperties.$curtains = $curtains;

    app.provide("curtains", $curtains);
    app.provide("vueCurtains", $vueCurtains);
  },
};
