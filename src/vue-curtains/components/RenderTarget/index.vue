<script>
import { provide, readonly, ref, onBeforeUnmount } from "vue";
import { params } from "./params";
import { useCurtains } from "../../hooks";
import { flattenDefaultParams } from "../../utils";
import { RenderTarget } from "curtainsjs";

export default {
  name: "RenderTarget",
  props: {
    autoDetectChildren: {
      type: Boolean,
      default: true,
    },
    uniqueKey: null,
    params: {
      type: Object,
      default: params,
    },
  },
  emits: ["ready"],
  setup(props, { emit, slots }) {
    const renderTarget = ref({});

    const params = flattenDefaultParams(props.params);

    if (props.autoDetectChildren) {
      // tell all children they have a render target
      // it will be set asynchronously
      provide("renderTarget", readonly(renderTarget));
      provide("uniqueKey", props.uniqueKey);
    }

    useCurtains((curtains) => {
      let existingRenderTarget = [];
      if (props.uniqueKey) {
        existingRenderTarget = curtains.renderTargets.filter(
          (target) => target._uniqueKey === props.uniqueKey
        );
      }

      if (!existingRenderTarget.length) {
        renderTarget.value = new RenderTarget(curtains, params);

        if (props.uniqueKey) {
          renderTarget.value._uniqueKey = props.uniqueKey;
        }

        emit("ready", renderTarget.value);
      } else {
        renderTarget.value = existingRenderTarget[0];
      }
    });

    onBeforeUnmount(() => {
      if (
        renderTarget.value &&
        !renderTarget.value._shaderPass &&
        renderTarget.value.textures.length
      ) {
        renderTarget.value.remove();
      }
    });

    return () => slots.default();
  },
};
</script>
