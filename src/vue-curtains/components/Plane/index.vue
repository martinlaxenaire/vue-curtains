<template>
  <div ref="planeEl">
    <slot />
  </div>
</template>

<script>
import { ref, inject, onMounted, onBeforeUnmount, watch, toRaw } from "vue";
import { useCurtains } from "../../hooks";
import { flattenDefaultParams } from "../../utils";
import { params } from "./params.js";
import { Plane } from "curtainsjs";

export default {
  name: "Plane",
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
    const curtains = useCurtains();
    const planeEl = ref(null);

    const renderTarget = inject("renderTarget", null);

    let plane;

    const params = flattenDefaultParams(props.params);

    const setRenderTarget = (target) => {
      if (target.renderer) {
        plane.setRenderTarget(target);
      }
    };

    onMounted(() => {
      emit("before-create");

      plane = new Plane(curtains, planeEl.value, params);

      const rt =
        renderTarget && renderTarget.value
          ? renderTarget && renderTarget.value
          : params.target
          ? params.target
          : null;
      if (rt) {
        setRenderTarget(toRaw(rt));
      }

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
        setRenderTarget(newValue);
      },
      { deep: true }
    );

    watch(
      () => renderTarget,
      (newValue) => {
        if (newValue.value) {
          setRenderTarget(toRaw(newValue.value));
        }
      },
      { deep: true }
    );

    return {
      planeEl,
    };
  },
};
</script>
