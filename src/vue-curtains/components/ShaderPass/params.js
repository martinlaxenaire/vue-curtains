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
  renderOrder: {
    type: Number,
    default: 0,
  },
  depthTest: {
    type: Boolean,
    default: true,
  },
  depth: {
    type: Boolean,
    default: false,
  },
  clear: {
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
  uniforms: {
    type: Object,
    default: {},
  },

  // render target
  renderTarget: null,
};

/*export const params = {
  vertexShader: null,
  vertexShaderID: null,
  fragmentShader: null,
  fragmentShaderID: null,
  renderOrder: 0,
  depthTest: true,
  clear: true,
  texturesOptions: {},
  crossOrigin: "",
  uniforms: {},

  // render target
  renderTarget: null,
};*/
