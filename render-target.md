<h1>RenderTarget</h1>

[Back to readme](README.md)

The `<RenderTarget />` component will create a WebGL RenderTarget (or Frame Buffer Object), acting as a wrapper for the curtains.js <a href="https://www.curtainsjs.com/render-target-class.html">RenderTarget class</a>.

#### Usage

```javascript
import { RenderTarget } from "vue-curtains";

export default {
  name: "BasicRenderTarget",
  components: {
    RenderTarget
  }
}
</script>

<template>
  <RenderTarget>
    <slot />
  </RenderTarget>
</template>
```

#### Properties

##### Regular parameters & properties

You can pass the <a href="https://www.curtainsjs.com/render-target-class.html#parameters">RenderTarget class parameters</a>  as a `:params` prop to your component.

```javascript
import { RenderTarget } from "vue-curtains";

export default {
  name: "BasicRenderTarget",
  components: {
    RenderTarget
  },
  setup() {
    const params = {
      depth: false,
      clear: false
    };
    
    return {
      params
    }
  }
}
</script>

<template>
  <RenderTarget :params="params">
    <slot />
  </RenderTarget>
</template>
```

##### uniqueKey property

Sometimes you'll want to apply your render target to multiple planes (usually combined with a [ShaderPass](shader-pass.md)), and it may be easier to add your render target inside a loop. You can pass an additional `uniqueKey` prop to your `<RenderTarget />` component and it will be created just once:

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
      <ShaderPass :params="passParams">
        <BasicPlane />
      </ShaderPass>
    </RenderTarget>
  </div>
</template>
```

##### autoDetectChildren property

By default, the `<RenderTarget />` component will loop through all its children and assign itself as the `target` prop of all `<Plane />` and `<ShaderPass />` children it will found.

If you want to prevent this behaviour and handle this by yourself, just set its `autoDetectChildren` prop to false:

```javascript
import { RenderTarget } from "vue-curtains";

export default {
  name: "BasicRenderTarget",
  components: {
    RenderTarget
  },
  setup() {
    const params = {
      autoDetectChildren: false
    };

    return {
      params
    }
  }
}
</script>

<template>
  <RenderTarget :params="params">
    <slot />
  </RenderTarget>
</template>
```

#### Event

The `<RenderTarget />` component provides an additional `@ready` event fired once the render target has been created: 

```javascript
import { RenderTarget } from "vue-curtains";

export default {
  name: "BasicRenderTarget",
  components: {
    RenderTarget
  },
  setup() {
    const onRenderTargetReady = (renderTarget) => {
      console.log("render target is ready!", renderTarget);
      // you have access to the render target method here
      const renderTexture = renderTarget.getTexture();
    };

    return {
      onRenderTargetReady
    }
  }
}
</script>

<template>
  <RenderTarget @ready="onRenderTargetReady">
    <slot />
  </RenderTarget>
</template>
```

#### Unmounting

Each time the `<RenderTarget />` component will unmount, the corresponding WebGL render target element will be automatically disposed.