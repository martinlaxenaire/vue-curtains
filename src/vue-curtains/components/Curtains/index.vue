<template>
  <div ref="container" v-bind="$attrs"></div>
  <slot />
</template>

<script>
import { Curtains } from "curtainsjs";
import { curtainsEvents, flattenDefaultParams } from "../../utils";
import { params } from "./params.js";
import { ref, provide, onMounted, onBeforeUnmount } from "vue";

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
    const curtains = new Curtains(params);
    provide("curtains", curtains);

    onMounted(() => {
      // set its container
      curtains.setContainer(container.value);

      // loop through our subscriptions and bind them to curtains events
      Object.keys(curtainsEvents.subscriptions).forEach((subscription) => {
        curtains[subscription](() => {
          emit(curtainsEvents.kebabCase[subscription], curtains);
          curtainsEvents.subscriptions[subscription].forEach((element) => {
            element.callback && element.callback(curtains);
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
