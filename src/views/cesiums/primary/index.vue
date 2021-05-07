<template>
  <div class="content">
    <div id="cesiumView"></div>
  </div>
</template>

<script>
  import { defineComponent, onMounted } from 'vue';
  import { Viewer } from 'cesium';
  // import * as Cesium from '/@/Build/Cesium/Cesium.js';

  export default defineComponent({
    setup() {
      // const cesiumView = ref();
      const initViewer = () => {
        const viewer = new Viewer('cesiumView', {
          geocoder: false,
          homeButton: false,
          sceneModePicker: false,
          baseLayerPicker: false,
          navigationHelpButton: false,
          animation: false,
          timeline: false,
          fullscreenButton: false,
          vrButton: false,
          infoBox: false,
          shouldAnimate: true,
          selectionIndicator: false,
          clampToGround: true,
          baseLayerPicker: false,
          requestWaterMask: true,
          requestVertexNormals: true,
        });
        viewer._cesiumWidget._creditContainer.style.display = 'none';
      };
      onMounted(() => {
        initViewer();
      });
    },
  });
</script>
<style lang="less" scoped>
  .content,
  #cesiumView {
    width: 100%;
    height: 100%;
  }
</style>
