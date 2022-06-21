export const params = {
  vertexShader: {
    type: String,
    default: null,
  },
  vertexShaderID: {
    type: String,
    default: null,
  },
  fragmentShader: {
    type: String,
    default: null,
  },
  fragmentShaderID: {
    type: String,
    default: null,
  },
  widthSegments: {
    type: Number,
    default: 1,
  },
  heightSegments: {
    type: Number,
    default: 1,
  },
  renderOrder: {
    type: Number,
    default: 0,
  },
  depthTest: {
    type: Boolean,
    default: true,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  cullFace: {
    type: String,
    default: "back",
  },
  alwaysDraw: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  drawCheckMargins: {
    type: Object,
    default: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  watchScroll: {
    type: Boolean,
    default: true,
  },
  autoloadSources: {
    type: Boolean,
    default: true,
  },
  texturesOptions: {
    type: Object,
    default: {},
  },
  crossOrigin: {
    type: String,
    default: "",
  },
  fov: {
    type: Number,
    default: 50,
  },
  uniforms: {
    type: Object,
    default: {},
  },

  // render target
  target: null,

  // plane transformations
  relativeTranslation: null,
  rotation: null,
  scale: null,
  transformOrigin: null,
};
