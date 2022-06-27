import { inject, onMounted, onBeforeUnmount, watch, toRaw } from "vue";
import { generateUUID } from "./utils";

let curtainsInstance;

export function useCurtains(callback = () => {}) {
  let isMounted = false;
  const curtains = inject("curtains", null);

  const launchCallback = () => {
    if (curtainsInstance && isMounted) {
      callback(curtainsInstance);
    }
  };

  onMounted(() => {
    isMounted = true;
    launchCallback();
  });

  if (curtainsInstance) {
    launchCallback();
  } else {
    watch(
      () => curtains.container,
      async (container) => {
        if (container) {
          curtainsInstance = toRaw(curtains);
          launchCallback();
        }
      },
      { immediate: true }
    );
  }
}

export function useCurtainsEvent(event, callback = () => {}) {
  const curtainsEvents = inject("curtainsEvents");

  const subscription = {
    event,
    callback,
    id: generateUUID(),
  };

  onMounted(() => {
    curtainsEvents.addSubscription(subscription);
  });

  onBeforeUnmount(() => {
    curtainsEvents.removeSubscription(subscription);
  });

  return subscription;
}
