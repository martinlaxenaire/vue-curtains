export const params = {
  alpha: {
    type: Boolean,
    default: true,
  },
  antialias: {
    type: Boolean,
    default: true,
  },
  permultipliedAlpha: {
    type: Boolean,
    default: false,
  },
  depth: {
    type: Boolean,
    default: true,
  },
  preserveDrawingBuffer: {
    type: Boolean,
    default: false,
  },
  failIfMajorPerformanceCaveat: {
    type: Boolean,
    default: true,
  },
  stencil: {
    type: Boolean,
    default: false,
  },
  autoRender: {
    type: Boolean,
    default: true,
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  pixelRatio: {
    type: Number,
    default: 1,
  },
  renderingScale: {
    type: Number,
    default: 1,
  },
  watchScroll: {
    type: Boolean,
    default: true,
  },
  production: {
    type: Boolean,
    default: process.env.NODE_ENV === "production",
  },
};
