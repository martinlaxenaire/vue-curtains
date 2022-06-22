<template>
  <div ref="container" v-bind="$attrs"></div>
  <slot />
</template>

<script>
import { Curtains } from "curtainsjs";
import { flattenDefaultParams } from "../../utils";
import { params } from "./params.js";
import { ref, provide, inject, toRaw, onMounted, onBeforeUnmount } from "vue";

const curtainsEvents = {
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

export default {
  name: "Curtains",
  props: {
    params: {
      type: Object,
      default: params,
    },
  },
  setup(props) {
    const container = ref(null);
    provide("curtainsEvents", curtainsEvents);

    const curtains = ref(null);
    provide("curtains", curtains);

    const params = flattenDefaultParams(props.params);

    onMounted(() => {
      params.container = container.value;

      curtains.value = new Curtains(params);

      // loop through our subscriptions and bind them to curtains events
      Object.keys(curtainsEvents.subscriptions).forEach((subscription) => {
        curtains.value[subscription](() => {
          curtainsEvents.subscriptions[subscription].forEach((element) => {
            element.callback && element.callback(toRaw(curtains.value));
          });
        });
      });
    });

    onBeforeUnmount(() => {
      curtains.value.dispose();
    });

    return {
      container,
    };
  },
};
</script>
