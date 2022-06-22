<h1>ShaderPass</h1>

[Back to readme](README.md)

The `<ShaderPass />` component will create a WebGL ShaderPass (using a RenderTarget object), acting as a wrapper for the curtains.js <a href="https://www.curtainsjs.com/shader-pass-class.html">ShaderPass class</a>.

#### Usage

```javascript
import { ShaderPass } from "vue-curtains";

export default {
  name: "BasicShaderPass",
  components: {
    ShaderPass
  }
}
</script>

<template>
  <ShaderPass />
</template>
```

#### Properties

##### Regular parameters & properties

You can pass the <a href="https://www.curtainsjs.com/shader-pass-class.html#shader-pass-parameters">ShaderPass class parameters</a> as a `:params` prop to your component.

```javascript
import { ShaderPass } from "vue-curtains";
import { fragmentShader } from "./shader-pass"; // shader pass shader

export default {
  name: "BasicShaderPass",
  components: {
    ShaderPass
  },
  setup() {
    const params = {
      fragmentShader,
      uniforms: {
        time: {
          name: "uTime",
          value: 0,
          type: "1f"
        }
      }
    }

    return {
      params
    }
  }
}
</script>

<template>
  <ShaderPass :params="params" />
</template>
```

##### uniqueKey property

When dealing with selective passes (ie: apply a shader pass to a bunch of planes, not all of them), it may be easier to add your render target and shader pass inside a loop. Just like with the `<RenderTarget />` you can pass an additional `uniqueKey` prop to your `<ShaderPass />` component and it will be created just once.

```javascript
import { RenderTarget, ShaderPass } from "vue-curtains";
import BasicPlane from './components/BasicPlane.vue'; // a basic plane component
import { fragmentShader } from "./shader-pass"; // shader pass shader

export default {
  name: "SelectivePlanesPass",
  components: {
    RenderTarget,
    ShaderPass,
    BasicPlane
  },
  setup() {    
    const passParams = {
      fragmentShader,
      uniforms: {
        time: {
          name: "uTime",
          value: 0,
          type: "1f"
        }
      }
    }
    
    return {
      passParams
    }
  }
}
</script>

<template>
  <div v-for="index in 5">
    <RenderTarget uniqueKey="planesRenderTarget">
      <ShaderPass
        :params="passParams"
        uniqueKey="planesPass" <!-- optional, will be set to "planesRenderTarget" if not specified -->
      >
        <BasicPlane />
      </ShaderPass>
    </RenderTarget>
  </div>
</template>
```

Note that this prop is optional: if the parent `<RenderTarget />` component has its `autoDetectChildren` prop set to true (which is by default), it can inherit from its `uniqueKey` prop as well.

#### Events

You can also pass as an event a function to execute for each corresponding <a href="https://www.curtainsjs.com/shader-pass-class.html#events">ShaderPass class events</a>. You'll have access to the corresponding `shaderPass` instance inside all of them.

> :warning: The components events respect Vue kebab case standard. For example, use `@after-resize` instead of `@onAfterResize`

```javascript
import { ShaderPass } from "vue-curtains";

export default {
  name: "BasicShaderPass",
  components: {
    ShaderPass
  },
  setup() {
    const onPassReady = (shaderPass) => {
      console.log("shader pass is ready", shaderPass);
    };

    const onPassRender = (shaderPass) => {
      console.log("on shader pass render!", shaderPass);
    };
    
    return {
      onPassReady,
      onPassRender
    }
  }
}
</script>

<template>
  <ShaderPass @ready="onPassReady" @render="onPassRender" />
</template>
```

#### Unmounting

Each time the `<ShaderPass />` component will unmount, the corresponding WebGL shaderpass and its associated render target element will be automatically disposed.