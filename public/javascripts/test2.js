/**
 *
 * @type {HTMLElement | null}
 */
//加载模块
define([
    'Cesium/Core/Cartesian3',
    'Cesium/Widgets/Viewer/Viewer',
    'Cesium/Scene/ShadowMode',
    'Cesium/Core/Color',
    'Cesium/Core/Math',
    'Three/three.min'
], function(//模块加载完成后回调函数
    CesiumCartesian3,
    CesiumViewer,
    CesiumShadowMode,
    CesiumColor,
    CesiumMath,
    THREE) {
    'use strict';

    //随便定两个坐标，把创建的模型放到坐标上
    var minWGS84 = [115.23,39.55];
    var maxWGS84 = [116.23,41.55];
    // 获取容器
    var cesiumContainer = document.getElementById("cesiumContainer");
    var ThreeContainer = document.getElementById("threeContainer");

    //装载模型的数组 可装任意模式的Three模型
    var _3Dobjects = [];

    //构建three对象，方便数据操作
    var three = {
        renderer: null,
        camera: null,
        scene: null
    };

    //构造cesium对象
    var cesium = {
        viewer: null
    };

    //构造一个模型函数，方便管理模型
    function _3DObject(){
        //THREEJS 3DObject.mesh
        this.threeMesh = null;
        //location bounding box
        this.minWGS84 = null;
        this.maxWGS84 = null;
    }

    //初始化Cesium
    function initCesium(){
        cesium.viewer = new CesiumViewer(cesiumContainer);

        //划定中心点
        var center = CesiumCartesian3.fromDegrees(
            (minWGS84[0] + maxWGS84[0]) / 2,
            ((minWGS84[1] + maxWGS84[1]) / 2)-1,
            200000
        );
        //让相机对焦到
        cesium.viewer.camera.flyTo({
            destination : center,
            orientation : {
                heading : CesiumMath.toRadians(0),
                pitch : CesiumMath.toRadians(-60),
                roll : CesiumMath.toRadians(0)
            },
            duration: 1
        });
    }

    //初始化three
    function initThree(){
        var fov = 45;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var aspect = width / height;
        var near = 1;
        var far = 10*1000*1000;

        three.scene = new THREE.Scene();
        three.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        three.renderer = new THREE.WebGLRenderer({alpha: true});
        ThreeContainer.appendChild(three.renderer.domElement);
    }

    /**
     * 模型创建
     */
    function init3DObject(){
        //创建模型1
        var doubleSideMaterial = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        });
        var segments = 10;
        var points = [];
        for ( var i = 0; i < segments; i ++ ) {
            points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * segments + 5, ( i - 5 ) * 2 ) );
        }
        var geometry = new THREE.LatheGeometry( points );
        var latheMesh = new THREE.Mesh( geometry, doubleSideMaterial ) ;
        latheMesh.scale.set(1500,1500,1500);
        latheMesh.position.z += 15000.0;
        latheMesh.rotation.x = Math.PI / 2;
        var latheMeshYup = new THREE.Group();
        latheMeshYup.add(latheMesh);
        three.scene.add(latheMeshYup);

        //把模型封装
        var _3DOB = new _3DObject();
        _3DOB.threeMesh = latheMeshYup;
        _3DOB.minWGS84 = minWGS84;
        _3DOB.maxWGS84 = maxWGS84;
        _3Dobjects.push(_3DOB);

        // 模型2
        geometry = new THREE.DodecahedronGeometry();
        var dodecahedronMesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()) ;
        dodecahedronMesh.scale.set(5000,5000,5000);
        dodecahedronMesh.position.z += 15000.0;
        dodecahedronMesh.rotation.x = Math.PI / 2;
        var dodecahedronMeshYup = new THREE.Group();
        dodecahedronMeshYup.add(dodecahedronMesh);
        three.scene.add(dodecahedronMeshYup);

        _3DOB = new _3DObject();
        _3DOB.threeMesh = dodecahedronMeshYup;
        _3DOB.minWGS84 = minWGS84;
        _3DOB.maxWGS84 = maxWGS84;
        _3Dobjects.push(_3DOB);

        //创建一个正方体
        var box = new THREE.BoxGeometry(100, 100, 100);
        var boxmesh = new THREE.MeshLambertMaterial({
            color: 0xfff,
            opacity: 0.7,
            transparent: true
        });
        var mesh = new THREE.Mesh(box, boxmesh);
        mesh.scale.set(500, 500, 500);
        mesh.position.z += 15000;
        mesh.rotation.x = Math.PI / 2;
        var gmesh = new THREE.Group();
        gmesh.add(mesh);
        three.scene.add(gmesh);

        _3DOB = new _3DObject();
        _3DOB.threeMesh = gmesh;
        _3DOB.minWGS84 = minWGS84;
        _3DOB.maxWGS84 = maxWGS84;
        _3Dobjects.push(_3DOB);

    }

    // 循环渲染器renderer
    function renderCesium(){
        cesium.viewer.render();
    }

    function renderThreeObj(){
        // 设置Three的相机月Cesium的相机一致角度
        three.camera.fov = CesiumMath.toDegrees(cesium.viewer.camera.frustum.fovy) // ThreeJS FOV is vertical
        three.camera.updateProjectionMatrix();

        var cartToVec = function(cart){
            return new THREE.Vector3(cart.x, cart.y, cart.z);
        };

        // 遍历所有Three模型，把期坐标转换成wgs84的坐标
        for(var id in _3Dobjects){
            minWGS84 = _3Dobjects[id].minWGS84;
            maxWGS84 = _3Dobjects[id].maxWGS84;


            var center = CesiumCartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2);

            // 获得定向模型的前进方向
            var centerHigh = CesiumCartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2,1);


            var bottomLeft  = cartToVec(CesiumCartesian3.fromDegrees(minWGS84[0], minWGS84[1]));
            var topLeft = cartToVec(CesiumCartesian3.fromDegrees(minWGS84[0], maxWGS84[1]));
            var latDir  = new THREE.Vector3().subVectors(bottomLeft,topLeft ).normalize();


            _3Dobjects[id].threeMesh.position.copy(center);
            _3Dobjects[id].threeMesh.lookAt(centerHigh);
            _3Dobjects[id].threeMesh.up.copy(latDir);
        }

        // 把Three相机克隆Cesium相机
        three.camera.matrixAutoUpdate = false;
        var cvm = cesium.viewer.camera.viewMatrix;
        var civm = cesium.viewer.camera.inverseViewMatrix;

        //相机矩阵变换，把Three的矩阵换乘Cesium的相机矩阵
        three.camera.matrixWorld.set(
            civm[0], civm[4], civm[8 ], civm[12],
            civm[1], civm[5], civm[9 ], civm[13],
            civm[2], civm[6], civm[10], civm[14],
            civm[3], civm[7], civm[11], civm[15]
        );
        three.camera.matrixWorldInverse.set(
            cvm[0], cvm[4], cvm[8 ], cvm[12],
            cvm[1], cvm[5], cvm[9 ], cvm[13],
            cvm[2], cvm[6], cvm[10], cvm[14],
            cvm[3], cvm[7], cvm[11], cvm[15]
        );
        three.camera.lookAt(new THREE.Vector3(0,0,0));

        var width = ThreeContainer.clientWidth;
        var height = ThreeContainer.clientHeight;
        var aspect = width / height;
        three.camera.aspect = aspect;
        three.camera.updateProjectionMatrix();

        three.renderer.setSize(width, height);
        three.renderer.render(three.scene, three.camera);
    }

    function loop(){
        requestAnimationFrame(loop);
        renderCesium();
        renderThreeObj();
    }

    initCesium();
    initThree();
    init3DObject();
    loop();
});


