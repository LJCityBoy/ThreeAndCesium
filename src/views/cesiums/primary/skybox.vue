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
      };
      const setSkybox = () => {
        viewer.scene.skyBox = new Cesium.SkyBox({
          sources: {
            positiveX: '/resource/img/SkyBox/tycho2t3_80_px.jpg',
            negativeX: '/resource/img/SkyBox/tycho2t3_80_mx.jpg',
            positiveY: '/resource/img/SkyBox/tycho2t3_80_py.jpg',
            negativeY: '/resource/img/SkyBox/tycho2t3_80_my.jpg',
            positiveZ: '/resource/img/SkyBox/tycho2t3_80_pz.jpg',
            negativeZ: '/resource/img/SkyBox/tycho2t3_80_mz.jpg',
          },
        });
        viewer.globe = true;
      };
      const initGroundSkyBox = () => {
        const NearSkyBox = function (option: any) {
          console.log('哈哈哈');
          this.sources.option = option;
          this._sources = undefined;

          this.show = Cesium.defaultValue(option.show, true);
          this._command = new Cesium.DrawCommand({
            modelMatrix: Cesium.Matrix4.clone(Cesium.Matrix4.IDENTITY),
            owner: this,
          });
          this._cubeMap = undefined;
          this._attributeLocations = undefined;
          this._useHdr = undefined;
        };
        const skyboxMatrix3 = new Cesium.Matrix3();
        NearSkyBox.prototype.update = function (frameState, useHdr) {
          const that = this;
          if (!that.show) {
            return undefined;
          }
          if (
            frameState.mode !== Cesium.SceneMode.SCENE3D &&
            frameState.mode !== Cesium.SceneMode.MORPHING
          ) {
            return undefined;
          }
          if (!frameState.passes.render) {
            return undefined;
          }
          const context = frameState.context;
          if (this._sources !== this.sources) {
            this._sources = this.sources;
            const sources = this.sources;

            if (
              !Cesium.defined(sources.positiveX) ||
              !Cesium.defined(sources.negativeX) ||
              !Cesium.defined(sources.positiveY) ||
              !Cesium.defined(sources.negativeY) ||
              !Cesium.defined(sources.positiveZ) ||
              !Cesium.defined(sources.negativeZ)
            ) {
              throw new Cesium.DeveloperError(
                'this.sources is required and must have positiveX, negativeX, positiveY, negativeY, positiveZ, and negativeZ properties.'
              );
            }

            if (
              typeof sources.positiveX !== typeof sources.negativeX ||
              typeof sources.positiveX !== typeof sources.positiveY ||
              typeof sources.positiveX !== typeof sources.negativeY ||
              typeof sources.positiveX !== typeof sources.positiveZ ||
              typeof sources.positiveX !== typeof sources.negativeZ
            ) {
              throw new Cesium.DeveloperError('this.sources properties must all be the same type.');
            }

            if (typeof sources.positiveX === 'string') {
              // Given urls for cube-map images.  Load them.
              Cesium.loadCubeMap(context, this._sources).then(function (cubeMap) {
                that._cubeMap = that._cubeMap && that._cubeMap.destroy();
                that._cubeMap = cubeMap;
              });
            } else {
              this._cubeMap = this._cubeMap && this._cubeMap.destroy();
              this._cubeMap = new Cesium.CubeMap({
                context: context,
                source: sources,
              });
            }
          }
          const command = this._command;

          command.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
            frameState.camera._positionWC
          );
          if (!defined(command.vertexArray)) {
            command.uniformMap = {
              u_cubeMap: function () {
                return that._cubeMap;
              },
              u_rotateMatrix: function () {
                return Cesium.Matrix4.getRotation(command.modelMatrix, skyboxMatrix3);
              },
            };

            const geometry = Cesium.BoxGeometry.createGeometry(
              Cesium.BoxGeometry.fromDimensions({
                dimensions: new Cesium.Cartesian3(2.0, 2.0, 2.0),
                vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
              })
            );
            const attributeLocations = (this._attributeLocations = Cesium.GeometryPipeline.createAttributeLocations(
              geometry
            ));

            command.vertexArray = Cesium.VertexArray.fromGeometry({
              context: context,
              geometry: geometry,
              attributeLocations: attributeLocations,
              bufferUsage: Cesium.BufferUsage._DRAW,
            });

            command.renderState = Cesium.RenderState.fromCache({
              blending: Cesium.BlendingState.ALPHA_BLEND,
            });
          }
          if (!defined(command.shaderProgram) || this._useHdr !== useHdr) {
            const fs = new Cesium.ShaderSource({
              defines: [useHdr ? 'HDR' : ''],
              sources: [
                'uniform samplerCube u_cubeMap;\n\
    varying vec3 v_texCoord;\n\
    void main()\n\
    {\n\
    vec4 color = textureCube(u_cubeMap, normalize(v_texCoord));\n\
    gl_FragColor = vec4(czm_gammaCorrect(color).rgb, czm_morphTime);\n\
    }\n\
    ',
              ],
            });
            command.shaderProgram = Cesium.ShaderProgram.fromCache({
              context: context,
              vertexShaderSource:
                'uniform samplerCube u_cubeMap;\n\
    varying vec3 v_texCoord;\n\
    void main()\n\
    {\n\
    vec4 color = textureCube(u_cubeMap, normalize(v_texCoord));\n\
    gl_FragColor = vec4(czm_gammaCorrect(color).rgb, czm_morphTime);\n\
    }\n\
    ',
              fragmentShaderSource: fs,
              attributeLocations: this._attributeLocations,
            });
            this._useHdr = useHdr;
          }

          if (!defined(this._cubeMap)) {
            return undefined;
          }

          return command;
        };
        NearSkyBox.prototype.isDestroyed = function () {
          return false;
        };
        NearSkyBox.prototype.destroy = function () {
          const command = this._command;
          command.vertexArray = command.vertexArray && command.vertexArray.destroy();
          command.shaderProgram = command.shaderProgram && command.shaderProgram.destroy();
          this._cubeMap = this._cubeMap && this._cubeMap.destroy();
          return Cesium.destroyObject(this);
        };
        Cesium.prototype.NearSkyBox = NearSkyBox;
      };
      const setMoonAndSun = () => {
        viewer.scene.moon.show = false;
        viewer.scene.sun.show = false;
      };
      onMounted(() => {
        initGroundSkyBox();
        initViewer();
        setSkybox();
        setMoonAndSun();
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
