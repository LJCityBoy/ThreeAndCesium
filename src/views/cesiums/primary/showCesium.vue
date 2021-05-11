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
          //官方世界地形
          terrainProvider: Cesium.createWorldTerrain(),
        });
        viewer._cesiumWidget._creditContainer.style.display = 'none';
        //开启地形深度检测
        viewer.scene.globe.depthTestAgainstTerrain = true;
        // //vr地形
        // const vrTheWorldProvider = new Cesium.VRTheWorldTerrainProvider({
        //   url: 'http://www.vr-theworld.com/vr-theworld/tiles1.0.0/73/',
        //   credit: 'Terrain data courtesy VT MÄK',
        // });
        // //切换地形生效：
        // viewer.terrainProvider = vrTheWorldProvider;
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
