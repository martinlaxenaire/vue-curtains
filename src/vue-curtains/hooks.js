import { inject, onMounted, onBeforeUnmount } from "vue";
import { generateUUID } from "./utils";

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
