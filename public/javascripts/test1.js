
function main() {


    // boundaries in WGS84 around the object
    var minWGS84 = [115.23, 39.55];
    var maxWGS84 = [116.23, 41.55];
    var cesiumContainer = document.getElementById("cesiumContainer");
    var ThreeContainer = document.getElementById("threeContainer");

    var _3Dobjects = []; //Could be any Three.js object mesh
    var three = {
        renderer: null,
        camera: null,
        scene: null
    };

    var cesium = {
        viewer: null
    };

    function _3DObject() {
        //THREEJS 3DObject.mesh
        this.threeMesh = null;
        //location bounding box
        this.minWGS84 = null;
        this.maxWGS84 = null;
    }

    function initCesium() {
        cesium.viewer = new Cesium.Viewer(cesiumContainer, {
            useDefaultRenderLoop: false,
            selectionIndicator: false,
            homeButton: false,
            sceneModePicker: false,
            // navigationHelpButton:false,
            infoBox: false,
            // navigationHelpButton:false,
            navigationInstructionsInitiallyVisible: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            allowTextureFilterAnisotropic: false,
            contextOptions: {
                webgl: {
                    alpha: false,
                    antialias: true,
                    preserveDrawingBuffer: true,
                    failIfMajorPerformanceCaveat: false,
                    depth: true,
                    stencil: false,
                    anialias: false
                },
            },
            targetFrameRate: 60,
            resolutionScale: 0.1,
            orderIndependentTranslucency: true,
            imageryProvider: undefined,
            baseLayerPicker: false,
            geocoder: false,
            automaticallyTrackDataSourceClocks: false,
            dataSources: null,
            clock: null,
            terrainShadows: Cesium.ShadowMode.DISABLED
        });

        var center = Cesium.Cartesian3.fromDegrees(
            (minWGS84[0] + maxWGS84[0]) / 2,
            ((minWGS84[1] + maxWGS84[1]) / 2) - 1,
            200000
        );
        cesium.viewer.camera.flyTo({
            destination: center,
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-60),
                roll: Cesium.Math.toRadians(0)
            },
            duration: 3
        });
    }

    function initThree() {
        var fov = 45;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var aspect = width / height;
        var near = 1;
        var far = 10 * 1000 * 1000;

        three.scene = new THREE.Scene();
        three.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        three.renderer = new THREE.WebGLRenderer({alpha: true});
        ThreeContainer.appendChild(three.renderer.domElement);
    }

    function init3DObject() {
        //Cesium entity
        var entity = {
            name: 'Polygon',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray([
                    minWGS84[0], minWGS84[1],
                    maxWGS84[0], minWGS84[1],
                    maxWGS84[0], maxWGS84[1],
                    minWGS84[0], maxWGS84[1],
                ]),
                material: Cesium.Color.RED.withAlpha(0.2)
            }
        };
        var Polygon = cesium.viewer.entities.add(entity);

        //Three.js Objects
        // Lathe geometry
        var doubleSideMaterial = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        });
        var segments = 10;
        var points = [];
        for (var i = 0; i < segments; i++) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * segments + 5, (i - 5) * 2));
        }
        var geometry = new THREE.LatheGeometry(points);
        var latheMesh = new THREE.Mesh(geometry, doubleSideMaterial);
        latheMesh.scale.set(15, 15, 15); //scale object to be visible at planet scale
        latheMesh.position.z += 15.0; // translate "up" in Three.js space so the "bottom" of the mesh is the handle
        latheMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
        var latheMeshYup = new THREE.Group();
        latheMeshYup.add(latheMesh);
        three.scene.add(latheMeshYup); // don’t forget to add it to the Three.js scene manually

        //Assign Three.js object mesh to our object array
        var _3DOB = new _3DObject();
        _3DOB.threeMesh = latheMeshYup;
        _3DOB.minWGS84 = minWGS84;
        _3DOB.maxWGS84 = maxWGS84;
        _3Dobjects.push(_3DOB);

        // dodecahedron
        geometry = new THREE.DodecahedronGeometry();
        var dodecahedronMesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
        dodecahedronMesh.scale.set(5, 5, 5); //scale object to be visible at planet scale
        dodecahedronMesh.position.z += 15.0; // translate "up" in Three.js space so the "bottom" of the mesh is the handle
        dodecahedronMesh.rotation.x = Math.PI / 2; // rotate mesh for Cesium's Y-up system
        var dodecahedronMeshYup = new THREE.Group();
        dodecahedronMeshYup.add(dodecahedronMesh);
        three.scene.add(dodecahedronMeshYup); // don’t forget to add it to the Three.js scene manually

        //Assign Three.js object mesh to our object array
        _3DOB = new _3DObject();
        _3DOB.threeMesh = dodecahedronMeshYup;
        _3DOB.minWGS84 = minWGS84;
        _3DOB.maxWGS84 = maxWGS84;
        _3Dobjects.push(_3DOB);
    }

    // Looping Renderer
    function renderCesium() {
        cesium.viewer.render();
    }

    function renderThreeObj() {
        // register Three.js scene with Cesium
        // three.camera.fov = Cesium.Math.toDegrees(cesium.viewer.camera.frustum.fovy) // ThreeJS FOV is vertical
        // three.camera.updateProjectionMatrix();

        var cartToVec = function (cart) {
            return new THREE.Vector3(cart.x, cart.y, cart.z);
        };

        // Configure Three.js meshes to stand against globe center position up direction
        for (var id in _3Dobjects) {
            minWGS84 = _3Dobjects[id].minWGS84;
            maxWGS84 = _3Dobjects[id].maxWGS84;
            // convert lat/long center position to Cartesian3
            var center = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2);

            // get forward direction for orienting model
            var centerHigh = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2, 1);

            // use direction from bottom left to top left as up-vector
            var bottomLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], minWGS84[1]));
            var topLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1]));
            var latDir = new THREE.Vector3().subVectors(bottomLeft, topLeft).normalize();

            // configure entity position and orientation
            _3Dobjects[id].threeMesh.position.copy(center);
            _3Dobjects[id].threeMesh.lookAt(centerHigh);
            _3Dobjects[id].threeMesh.up.copy(latDir);
        }


        // 克隆Cesium摄像机的投影位置，这样Three的物体就会出现在与铯球体上相同的位置
        three.camera.matrixAutoUpdate = false;//关闭矩阵自动更新
        var cvm = cesium.viewer.camera.viewMatrix;

        var civm = cesium.viewer.camera.inverseViewMatrix;
        three.camera.matrixWorld.set(
            civm[0], civm[4], civm[8], civm[12],
            civm[1], civm[5], civm[9], civm[13],
            civm[2], civm[6], civm[10], civm[14],
            civm[3], civm[7], civm[11], civm[15]
        );
        three.camera.matrixWorldInverse.set(
            cvm[0], cvm[4], cvm[8], cvm[12],
            cvm[1], cvm[5], cvm[9], cvm[13],
            cvm[2], cvm[6], cvm[10], cvm[14],
            cvm[3], cvm[7], cvm[11], cvm[15]
        );
        three.camera.lookAt(new THREE.Vector3(0, 0, 0));

        var width = ThreeContainer.clientWidth;
        var height = ThreeContainer.clientHeight;
        var aspect = width / height;
        three.camera.aspect = aspect;
        three.camera.updateProjectionMatrix();

        three.renderer.setSize(width, height);
        three.renderer.render(three.scene, three.camera);
    }

    function loop() {
        requestAnimationFrame(loop);
        renderCesium();
        renderThreeObj();
    }

    initCesium(); // Initialize Cesium renderer
    initThree(); // Initialize Three.js renderer
    init3DObject(); // Initialize Three.js object mesh with Cesium Cartesian coordinate system
    loop(); // Looping renderer
};
