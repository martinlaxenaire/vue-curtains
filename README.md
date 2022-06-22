<h1>vue-curtains</h1>

vue-curtains is an attempt at converting <a href="https://github.com/martinlaxenaire/curtainsjs">curtains.js</a> WebGL classes into reusable Vue components.

[![Version](https://img.shields.io/npm/v/vue-curtains?style=flat&colorA=f5f5f5&colorB=f5f5f5)](https://npmjs.com/package/vue-curtains)
[![Twitter](https://img.shields.io/twitter/follow/webdesign_ml?label=%40webdesign_ml&style=flat&colorA=f5f5f5&colorB=f5f5f5&logo=twitter&logoColor=000000)](https://twitter.com/webdesign_ml)

## Getting started

### Installation

> :warning: vue-curtains requires Vue 3

Of course you'll need to create a Vue app first. Then, just add vue-curtains into your project by installing the npm package:

```bash
npm install vue-curtains
```

### Components

vue-curtains introduces a bunch of components based on curtains.js classes:

- [Curtains](curtains.md)
- [Plane](plane.md)
- [RenderTarget](render-target.md)
- [ShaderPass](shader-pass.md)
- [PingPongPlane](ping-pong-plane.md)
- [FXAAPass](fxaa-pass.md)

### Hooks

The library relies on the Vue 3 Composition API.

Inside your `<Curtains />` component, you'll have access to a couple useful custom hooks:


##### useCurtains

```javascript
const curtains = useCurtains();
```

This hook returns the curtains instance injected by the `<Curtains />` component, or `null` if the instance is undefined (for example if you try to use it outside your `<Curtains />` component).

```javascript
import { useCurtains } from "vue-curtains";

export default {
  name: "MyComponent",

  setup() {
    // now you'll have access to your curtains instance
    const curtains = useCurtains();
  }
}
```

##### useCurtainsEvent

```javascript
useCurtainsEvent(event, callback);
```

This hook lets you subscribe to any of your <a href="https://www.curtainsjs.com/curtains-class.html#events">curtains instance events</a>, so you can use those events from any `<Curtains />` child component in your app.

```javascript
import { useCurtainsEvent } from "vue-curtains";

export default {
  name: "MyComponent",

  setup() {
    useCurtainsEvent("onScroll", (curtains) => {
      // get the scroll values...
      const scrollValues = curtains.getScrollValues();
    });
  }
}
```

### Examples

#### Explore

Here are codesandboxes ports of some of the official documentation examples:

TODO

#### Basic example

This is the port of <a href="https://www.curtainsjs.com/examples/basic-plane/index.html">curtains.js documentation basic example</a>:

##### App.vue

```javascript
import { Curtains, Plane } from "vue-curtains";

const basicVs = `
  precision mediump float;
    
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;
    
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
    
  uniform mat4 uTextureMatrix0;
    
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
    
  void main() {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        
    // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;


const basicFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D uSampler0;

  uniform float uTime;
    
  void main() {
    vec2 textureCoord = vTextureCoord;
    // displace our pixels along the X axis based on our time uniform
    // textures coords are ranging from 0.0 to 1.0 on both axis
    textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;
    
    gl_FragColor = texture2D(uSampler0, textureCoord);
  }
`;

export default {
  name: "App",
  components: {
    Curtains,
    Plane,
  },
  setup() {
    const planeParams = {
      vertexShader: basicVs,
      fragmentShader: basicFs,
      uniforms: {
        time: {
          name: "uTime",
          value: 0,
        },
      },
    };

    const onRender = (plane) => {
      plane.uniforms.time.value++;
    };

    return {
      planeProps,
      onRender
    };
};
</script>

<template>
  <!-- should be put outside the router -->
  <Curtains id="CurtainsCanvas">

    <Plane id="BasicPlane" :params="planeParams" @render="onRender">
      <img src="/path/to/my-image.jpg" alt="" />
    </Plane>
  
  </Curtains>
</template>

<style scoped>
  #CurtainsCanvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }
  
  #BasicPlane {
    width: 80%;
    height: 80vh;
    margin: 10vh auto;
  }

  #BasicPlane img {
    display: none;
  }
</style>
```

##### main.js

```javascript
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```
