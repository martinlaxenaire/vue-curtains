<template>
  <div ref="container"></div>
</template>

<script>
import { ref, inject, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "Curtains",

  setup(props) {
    const container = ref(null);
    const curtains = inject("curtains");
    const vueCurtains = inject("vueCurtains");

    onMounted(() => {
      curtains.setContainer(container.value);

      // loop through our subscriptions and bind them to curtains events
      Object.keys(vueCurtains.subscriptions).forEach((subscription) => {
        curtains[subscription](() => {
          vueCurtains.subscriptions[subscription].forEach((element) => {
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
