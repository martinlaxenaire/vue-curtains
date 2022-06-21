export const params = {
  renderOrder: {
    type: Number,
    default: 0,
  },
  depthTest: {
    type: Boolean,
    default: true,
  },
  clear: {
    type: Boolean,
    default: true,
  },
  texturesOptions: {
    type: Object,
    default: {},
  },

  // render target
  renderTarget: null,
};
