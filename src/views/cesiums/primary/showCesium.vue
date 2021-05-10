<template>
  <div class="content">
    <div id="cesiumView"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from 'vue';

  export default defineComponent({
    setup() {
      // const cesiumView = ref();
      let viewer: any = {};
      const initViewer = () => {
        viewer = new Cesium.Viewer('cesiumView', {
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
          requestWaterMask: true,
          requestVertexNormals: true,
        });
        viewer._cesiumWidget._creditContainer.style.display = 'none';
      };
      onMounted(() => {
        initViewer();
      });
      //销毁
      onUnmounted(() => {
        viewer.destroy();
        viewer = {};
      });
      return {};
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
