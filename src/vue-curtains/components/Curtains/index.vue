<template>
  <div ref="container" v-bind="$attrs"></div>
  <slot />
</template>

<script>
import { Curtains } from "curtainsjs";
import { curtainsEvents, flattenDefaultParams } from "../../utils";
import { params } from "./params.js";
import {
  ref,
  provide,
  shallowReactive,
  readonly,
  onMounted,
  onBeforeUnmount,
  toRaw,
} from "vue";

export default {
  name: "Curtains",
  props: {
    params: {
      type: Object,
      default: params,
    },
  },
  emits: [
    "error",
    "success",
    "context-lost",
    "context-restored",
    "after-resize",
    "render",
    "scroll",
  ],
  setup(props, { emit }) {
    const container = ref(null);
    provide("curtainsEvents", curtainsEvents);

    const params = flattenDefaultParams(props.params);
    // instanciate curtains right away
    const curtains = shallowReactive(new Curtains(params));
    provide("curtains", readonly(curtains));

    onMounted(() => {
      // set its container
      curtains.setContainer(container.value);

      // loop through our subscriptions and bind them to curtains events
      Object.keys(curtainsEvents.subscriptions).forEach((subscription) => {
        curtains[subscription](() => {
          emit(curtainsEvents.kebabCase[subscription], toRaw(curtains));
          curtainsEvents.subscriptions[subscription].forEach((element) => {
            element.callback && element.callback(toRaw(curtains));
          });
        });
      });
    });

    onBeforeUnmount(() => {
      curtains.dispose();
    });

    return {
      container,
    };
  },
};
</script>
