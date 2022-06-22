import { inject, onMounted, onBeforeUnmount } from "vue";
import { generateUUID } from "./utils";

export function useCurtains() {
  const curtains = inject("curtains", null);
  return curtains || null;
}

export function useCurtainsEvent(event, callback = () => {}) {
  //const vueCurtains = inject("vueCurtains");
  const vueCurtains = inject("curtainsEvents");

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
