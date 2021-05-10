<template>
  <div class="content">
    <div class="tool">
      <a-radio-group @change="handleChange">
        <a-radio-button value="draw"> 绘制 </a-radio-button>
        <a-radio-button value="czml"> CZML方式绘制 </a-radio-button>
        <a-radio-button value="fill"> 填充和边框 </a-radio-button>
        <a-radio-button value="img"> 贴图 </a-radio-button>
        <a-radio-button value="pull"> 拉伸 </a-radio-button>
        <a-radio-button value="del"> 删除 </a-radio-button>
        <a-radio-button value="pick"> 选中 </a-radio-button>
      </a-radio-group>
    </div>
    <div id="cesiumView"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from 'vue';
  import { Radio } from 'ant-design-vue';

  export default defineComponent({
    name: 'EntityDraw',
    components: {
      [Radio.Group.name]: Radio.Group,
      [Radio.Button.name]: Radio.Button,
    },
    setup() {
      let viewer: any = {};
      let handler: any = '';
      //初始化viewer
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
      //entity绘制
      const entityDraw = () => {
        //先移除
        viewer.entities.removeAll();
        //创建椭圆
        const rainEntity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(113.2, 22.4),
          id: 'ellipse1',
          name: '一个椭圆',
          ellipse: {
            semiMinorAxis: 250000.0,
            semiMajorAxis: 400000.0,
            material: Cesium.Color.RED.withAlpha(0.5),
          },
        });
        //相机飞到
        // viewer.zoomTo(rainEntity);
        viewer.flyTo(rainEntity, {
          duration: 2.0,
        });
      };
      //填充和边框
      const fillAndLine = () => {
        viewer.entities.removeAll();
        const rainEntity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(113.2, 22.4),
          id: 'ellipse1',
          name: '一个椭圆',
          ellipse: {
            semiMinorAxis: 300000.0,
            semiMajorAxis: 300000.0,
            height: 200000.0, //必须设置height，否则ouline无法显示
            fill: true, //填充
            material: Cesium.Color.fromCssColorString('#67ADDF'),
            outline: true,
            outlineColor: Cesium.Color.BLUE.withAlpha(0.9),
            outlineWidth: 100.0, //不能设置，固定为1
          },
        });
        viewer.flyTo(rainEntity, {
          duration: 2.0,
        });
      };
      //贴图
      const imgMaterial = () => {
        viewer.entities.removeAll();
        const rainEntity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(113.2, 22.4),
          id: 'ellipse1',
          name: '一个椭圆',
          ellipse: {
            semiMinorAxis: 300000.0,
            semiMajorAxis: 300000.0,
            height: 200000.0, //必须设置height，否则ouline无法显示
            fill: true, //填充
            material: '/resource/img/LOGO.jpg',
            outline: true,
            outlineColor: Cesium.Color.BLUE.withAlpha(0.9),
            outlineWidth: 1000.0, //windows不能设置，固定为1
          },
        });
        viewer.flyTo(rainEntity, {
          duration: 2.0,
        });
      };
      //height拉伸
      const extrudedHeight = () => {
        viewer.entities.removeAll();
        const rainEntity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(113.2, 22.4),
          id: 'ellipse1',
          name: '一个椭圆',
          ellipse: {
            semiMinorAxis: 300000.0,
            semiMajorAxis: 300000.0,
            height: 200000.0, //必须设置height，否则ouline无法显示
            extrudedHeight: 10000.0, //拉伸值
            fill: true, //填充
            material: '/resource/img/LOGO.jpg',
            outline: true,
            outlineColor: Cesium.Color.BLUE.withAlpha(0.9),
            outlineWidth: 1000.0, //windows不能设置，固定为1
          },
        });
        viewer.flyTo(rainEntity, {
          duration: 2.0,
        });
      };
      //删除指定id的entity
      const deleteEntity = () => {
        //删除方法有：remove(entity),removeAll(),removeById()
        // 这里通过id删除
        const a = viewer.entities.removeById('ellipse1');
        console.log(a);
        //移除全部dataSources
        viewer.dataSources.removeAll();
      };
      //选中
      const pickEntity = () => {
        viewer.entities.removeAll();
        const rainEntity = viewer.entities.add({
          id: 'ellipse1',
          position: Cesium.Cartesian3.fromDegrees(113.2, 22.4),
          name: '椭圆entity选中',
          ellipse: {
            semiMinorAxis: 250000.0,
            semiMajorAxis: 400000.0,
            height: 200000.0,
            extrudedHeight: 400000.0,
            fill: true,
            material: '/resource/img/LOGO.jpg',
            outline: true, //必须设置height，否则ouline无法显示
            outlineColor: Cesium.Color.BLUE.withAlpha(0.5),
            outlineWidth: 10.0, //windows系统下不能设置固定为1
          },
        });
        viewer.flyTo(rainEntity, {
          duration: 2.0,
        });

        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (movement) {
          const pick = viewer.scene.pick(movement.position);
          if (Cesium.defined(pick) && pick.id.id === 'ellipse1') {
            // alert('picked!');
            pick.id.ellipse.material = Cesium.Color.fromRandom(); //随机颜色
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      };
      const czmlDraw = () => {
        //先移除再添加
        viewer.dataSources.removeAll();
        viewer.entities.removeAll();
        const czml = [
          {
            id: 'document', //第一个必须为document
            name: 'box',
            version: '1.0',
          },
          {
            id: 'shape1',
            name: '随便起个名字',
            position: {
              cartographicDegrees: [113.2, 22.4, 5000.0],
            },
            box: {
              dimensions: {
                cartesian: [4000.0, 3000.0, 500.0],
              },
              material: {
                solidColor: {
                  color: {
                    rgba: [255, 0, 0, 128],
                  },
                },
              },
              outline: true,
              outlineColor: {
                rgba: [0, 0, 0, 255],
              },
            },
          },
        ];

        const dataSourcePromise = Cesium.CzmlDataSource.load(czml);
        viewer.dataSources.add(dataSourcePromise);
        viewer.flyTo(dataSourcePromise, {
          duration: 2.0,
        });
      };
      //按钮点击方法
      const handleChange = (e) => {
        const value = e.target.value;
        //移除鼠标点击选中事件，避免内存消耗
        if (handler) {
          handler.destroy();
          handler = '';
        }
        switch (value) {
          case 'draw':
            entityDraw();
            break;
          case 'czml':
            czmlDraw();
            break;
          case 'fill':
            fillAndLine();
            break;
          case 'img':
            imgMaterial();
            break;
          case 'pull':
            extrudedHeight();
            break;
          case 'del':
            deleteEntity();
            break;
          case 'pick':
            pickEntity();
            break;

          default:
            break;
        }
      };
      onMounted(() => {
        initViewer();
      });
      //销毁
      onUnmounted(() => {
        viewer.destroy();
        viewer = {};
      });
      return {
        handleChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  .content,
  #cesiumView {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: none;
  }

  .tool {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
  }
</style>
