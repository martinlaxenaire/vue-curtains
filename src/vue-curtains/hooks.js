import { inject, toRaw, onMounted, onBeforeUnmount } from "vue";
import { generateUUID } from "./utils";

export function useCurtains() {
  const curtains = inject("curtains");
  return curtains ? toRaw(curtains.value) : null;
}

export function useCurtainsEvent(event, callback = () => {}) {
  const vueCurtains = inject("vueCurtains");

  const subscription = {
    event,
    callback,
    id: generateUUID(),
  };

  onMounted(() => {
    vueCurtains.addSubscription(subscription);
  });

  onBeforeUnmount(() => {
    vueCurtains.removeSubscription(subscription);
  });

  return subscription;
}
