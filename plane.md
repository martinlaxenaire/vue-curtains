<h1>Plane</h1>

[Back to readme](README.md)

The `<Plane />` component will create a WebGL Plane, acting as a wrapper for the curtains.js <a href="https://www.curtainsjs.com/plane-class.html">Plane class</a>.

#### Usage

```javascript
import { Plane } from "vue-curtains";

// will draw a black rectangle
// since it needs at least a custom fragment shader
// to display the texture
export default {
  name: "BasicPlane",
  components: {
    Plane
  }
}
</script>

<template>
  <Plane
    id="plane"
  >
    <img src="/path/to/my-image.jpg" alt="" />
  </Plane>
</template>
```

#### Properties

##### Regular Plane class parameters & properties

You can pass the <a href="https://www.curtainsjs.com/plane-class.html#parameters">Plane class parameters</a> as a `:params` prop to your component.

You can also use Vue `attrs` and events like `id` or `@click`. They can be used to style your div element and listen to events. You can of course pass any DOM children you want to the component.

```javascript
// assuming params is an object containing your parameters, like shaders, etc.

<Plane
    class="plane"
    :params="params"
>
  <h2>This is the plane title!</h2>
  <img src="/path/to/my-image.jpg" data-sampler="uPlaneTexture" alt="" />
</Plane>
```

All the <a href="https://www.curtainsjs.com/plane-class.html#properties">plane properties</a> that are not read-only are therefore reactive and will be updated each time the corresponding prop is updated!

#### Events

##### Regular Plane class events

You can also pass as an event a function to execute for each corresponding <a href="https://www.curtainsjs.com/plane-class.html#events">Plane class events</a>. You'll have access to the corresponding `plane` instance inside all of them.

> :warning: The components events respect Vue kebab case standard. For example, use `@after-resize` instead of `@onAfterResize`

```javascript
import { Plane } from "vue-curtains";
import { vertexShader, fragmentShader } from "./shaders";

export default {
  name: "BasicPlane",
  components: {
    Plane
  },
  setup() {
    const params = {
      vertexShader,
      fragmentShader
    };

    const onPlaneReady = (plane) => {
      console.log("plane is ready", plane);
      // you can use any regular plane methods here
      plane.setRenderOrder(1);
    };

    const onPlaneRender = (plane) => {
      console.log("on plane render!", plane);
    };
    
    return {
      params,
      onPlaneReady,
      onPlaneRender
    }
  }
}
</script>

<template>
  <Plane
    id="plane"
    :params="params"
    @ready="onPlaneReady"
    @render="onPlaneRender"
  >
    <img src="/path/to/my-image.jpg" alt="" />
  </Plane>
</template>
```


##### Additional events

The component introduces 2 new events, `@before-create` and `@before-removes` that will be called just before the plane is created and removed.

#### Complete parameters list

Here's a complete parameters list that you can pass to your `<Plane />` component with the `:params` prop (see also <a href="https://www.curtainsjs.com/plane-class.html">curtains.js Plane class documentation</a>):

| Prop  | Type | Reactive? | Description |
| --- | --- | :---: | --- |
| vertexShader | string | - | Plane vertex shader |
| vertexShaderID | string | - | Plane vertex shader script tag ID |
| fragmentShader | string | - | Plane fragment shader |
| fragmentShaderID | string | - | Plane fragment shader script tag ID |
| widthSegments | int | - | Number of vertices along X axis |
| heightSegments | int | - | Number of vertices along Y axis |
| renderOrder | int | X | Determines in which order the plane is drawn |
| depthTest | bool | X | Whether the Plane should enable or disable the depth test |
| transparent | bool | - | If your Plane should handle transparency |
| cullFace | string | - | Which face of the plane should be culled |
| alwaysDraw | bool | X | If your Plane should always be drawn or use frustum culling |
| visible | bool | X | Whether to draw your Plane |
| drawCheckMargins | object | X | Additional margins to add in the frustum culling calculations, in pixels. |
| watchScroll | bool | X | Whether the plane should auto update its position on scroll |
| autoloadSources | bool | - | If the sources should be load on init automatically |
| texturesOptions | object | - | Default options to apply to the textures of the Plane |
| crossOrigin | string | - | Defines the crossOrigin process to load medias |
| fov | int | X | Defines the perspective field of view |
| uniforms | object | - | The uniforms that will be passed to the shaders |
| target | RenderTarget object | X | The render target used to render the Plane |

#### Complete events list

| Prop           | Type |       args       | Description |
|----------------| --- |:----------------:| --- |
| @after-render  | function |     (plane)      | Called just after your Plane has been drawn |
| @after-resize  | function |     (plane)      | Called just after your plane has been resized |
| @error         | function |     (plane)      | Called if there's an error while instancing your Plane |
| @leave-view    | function |     (plane)      | Called when the Plane gets frustum culled |
| @loading       | function | (plane, texture) | Called when the Plane gets frustum culled |
| @ready         | function |     (plane)      | Called once your Plane is all set up and ready to be drawn |
| @re-enter-view | function |     (plane)      | Called when the Plane's no longer frustum culled |
| @render        | function |     (plane)      | Called at each Plane's draw call |
| @before-create | function |        ()        | Called just before the Plane will be created |
| @before-remove | function |     (plane)      | Called just before the Plane will be removed |

#### Unmounting

Each time the `<Plane />` component will unmount, the corresponding WebGL plane element will be automatically disposed.