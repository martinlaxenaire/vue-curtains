<template>
  <div ref="planeEl">
    <slot />
  </div>
</template>

<script>
import { ref, inject, onMounted, onBeforeUnmount, watch } from "vue";
import { flattenDefaultParams } from "../../utils";
import { params } from "./params.js";
import { PingPongPlane } from "curtainsjs";

export default {
  name: "PingPongPlane",
  props: {
    params: {
      type: Object,
      default: params,
    },
  },
  emits: [
    "before-create",
    "error",
    "loading",
    "ready",
    "leave-view",
    "re-enter-view",
    "after-resize",
    "render",
    "after-render",
    "before-remove",
  ],
  setup(props, { emit }) {
    const curtains = inject("curtains");
    const planeEl = ref(null);

    let plane;

    const params = flattenDefaultParams(props.params);

    onMounted(() => {
      emit("before-create");

      plane = new PingPongPlane(curtains, planeEl.value, params);

      plane
        .onError(() => emit("error", plane))
        .onLoading((texture) => emit("loading", plane, texture))
        .onReady(() => emit("ready", plane))
        .onAfterResize(() => emit("after-resize", plane))
        .onLeaveView(() => emit("leave-view", plane))
        .onReEnterView(() => emit("re-enter-view", plane))
        .onRender(() => emit("render", plane))
        .onAfterRender(() => emit("after-render", plane));
    });

    onBeforeUnmount(() => {
      if (plane) {
        emit("before-remove", plane);

        plane.remove();
      }
    });

    // watch simple properties
    [
      "alwaysDraw",
      "cullFace",
      "drawCheckMargins",
      "visible",
      "watchScroll",
    ].forEach((prop) => {
      watch(
        () => props.params[prop],
        (newValue) => {
          plane[prop] = newValue;
        }
      );
    });

    // other properties
    watch(
      () => props.params.depthTest,
      (newValue) => {
        plane.enableDepthTest(newValue);
      }
    );

    watch(
      () => props.params.renderOrder,
      (newValue) => {
        plane.setRenderOrder(newValue);
      }
    );

    // render target
    watch(
      () => props.params.target,
      (newValue) => {
        console.log("new RT!!!", newValue);
        plane.setRenderTarget(newValue);
      }
    );

    return {
      planeEl,
    };
  },
};
</script>
