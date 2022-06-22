<h1>Curtains</h1>

[Back to readme](README.md)

The `<Curtains></Curtains>` component is responsible for the creation of the WebGL context. It will act as a wrapper for the curtains.js <a href="https://www.curtainsjs.com/curtains-class.html">Curtains class</a>.

For all those reasons, you should always wrap your application, including routing inside the `<Curtains></Curtains>` component.

#### Usage

```javascript
import { createApp } from "vue";
import { Curtains } from "vue-curtains";

createApp({
  components: {
    Curtains
  },
  template: `
    <Curtains>
      <!-- example with vue-router -->
      <RouterView />
    </Curtains>`
}).mount('#app');
```

#### Properties

Except for the container, which will be set internally, you can pass the <a href="https://www.curtainsjs.com/curtains-class.html#curtains-init-params">Curtains class parameters</a> as a `:params` prop to your component.
Also note that the `production` property is set to `false` on development and `true` on production environments by default.

You can also use Vue `attrs` and events like `id` or `@click`. They can be used to style your canvas container and listen to events:

```javascript
import { Curtains } from "vue-curtains";

export default {
  name: "App",
  components: {
    Curtains
  },
  setup() {
    const curtainsParams = {
      pixelRatio: Math.min(1.5, window.devicePixelRatio),
      antialias: false
    };

    return {
      curtainsParams
    };
  };
</script>

<template>
  <Curtains id="CurtainsCanvas" :params="curtainsParams">
    <!-- example with vue-router -->
    <RouterView />
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
</style>
```

#### Events

You can also pass as events a function to execute for each corresponding <a href="https://www.curtainsjs.com/curtains-class.html#events">Curtains class events</a>. You'll have access to your `curtains` instance inside all of them.

> :warning: The components events respect Vue kebab case standard. For example, use `@context-lost` instead of `@onContextLost`

```javascript
import { Curtains } from "vue-curtains";

export default {
  name: "App",
  components: {
    Curtains
  },
  setup() {
    const curtainsParams = {
      pixelRatio: Math.min(1.5, window.devicePixelRatio),
      antialias: false
    };

    const onError = (curtains) => {
      console.log("on error!", curtains);
    };

    const onRender = (curtains) => {
      console.log("on render!", curtains);
    };

    return {
      curtainsParams,
      onError,
      onRender
    };
  };
</script>

<template>
  <Curtains
    id="CurtainsCanvas"
    :params="curtainsParams"
    @error="onError"
    @render="onRender"
  >
    <!-- example with vue-router -->
    <RouterView />
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
</style>
```

#### Unmounting

Even tho this should not happen in most use case, the WebGL context will be disposed each time this component will unmount.