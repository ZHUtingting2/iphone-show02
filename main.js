import './style.css'
import './main-page.js'

// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';//模型加载器
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';//解压模型
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'//模型自显示贴图，不需要光源
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'//GUI控制
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'//引入FontLoader库，该库能够将对应的字体Json文件加载到项目中使用
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'//TextGeometry文本缓冲几何体库
// import { CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer.js'


// let scene, camare, model, plane, renderer;
// let axesHelper,controls;
// let dirLight, hemiLight;
// let gui;

// init();
// initEnv();
// initLight();
// loadModel();
// enableShaow();
// buildGUI();

// function init() {
//     //1.创建场景及物体
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xa0a0a0);
//     scene.fog = new THREE.Fog(0xa0a0a0, 50, 1200);//模型边缘雾化效果

//     //1.1创建坐标
//     axesHelper = new THREE.AxesHelper(100);
//     scene.add(axesHelper)


//     //2.创建相机
//     camare = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
//     camare.position.set(0, 50, 300);
//     camare.lookAt(0, 0, 0)

//     //3.创建渲染器
//     renderer = new THREE.WebGLRenderer({antialias: true});
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     //renderer.outputEncoding = THREE.sRGBEncoding;
//     document.body.appendChild(renderer.domElement);

//     //4.创建控制器
//     controls = new OrbitControls(camare, renderer.domElement)
//     //controls.addEventListener('change', render) 监听控制器变化，调用render;
//     controls.enableDamping = true;
// }

// function initEnv(){
//   const pmremGenerator =new THREE.PMREMGenerator(renderer);
//   scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.001).texture;
// }

// function initLight(){
//   hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
//   scene.add(hemiLight);

//   dirLight = new THREE.DirectionalLight(0xffffff);
//   dirLight.position.set(10, 5, -10);
//   scene.add(dirLight);

//   const dirLight2 = new THREE.DirectionalLight(0xffffff);
//   dirLight2.position.set(10, 5, 10);
//   scene.add(dirLight2)
// }

// function loadModel(){
//   /* 平面 */
//   const PlaneGeometry = new THREE.PlaneGeometry(10000, 1000);
//   const planeMaterial = new THREE.MeshPhongMaterial({
//     color: 0xffffff, 
//     opacity: 0.9, 
//     transparent: true
//   });
//   plane = new THREE.Mesh(PlaneGeometry, planeMaterial);
//   plane.rotation.x = -Math.PI / 2;
//   plane.position.y = -85;
//   scene.add(plane)

//   /* 模型加载 */
//   const loader = new GLTFLoader();
//   const dracoLoader = new DRACOLoader();
//   dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

//   loader.setDRACOLoader(dracoLoader);
//   loader.load('models/gltf/iPhone13Pro.glb', (gltf) => {
    
//     model = gltf.scene;
//     model.scale.set(10, 10, 10);
//     model.rotation.y = Math.PI;
//     //model.position.x = 3;
//     scene.add(model);
//     //打开模型阴影
//     model.traverse((obj) => {//遍历模型
//       if(obj.isMesh){
//           obj.castShadow = true;
//       }
//   })
//     model.position.x = 32;
//     render();

//     const box = new THREE.Box3().setFromObject( model ) //获取模型几何数据 
//     const X = -(box.max.x - box.min.x) / 2;
//     console.log(box.max.x);
//     console.log(box.min.x);
//     //model.position.x = X 
//     //model.rotateY(X);
//     // let group = new THREE.Object3D();
//     // group.position.set(0, 0, 0); //世界原点坐标
//     // group.add(model);
//     // model.position.set(X, 0, 0);

//   })

//   /* 文字加载 */
//   const materials = [
//     new THREE.MeshPhongMaterial({color: 0x14b2f5, flatShading: true}),
//     new THREE.MeshPhongMaterial({color: 0x14b2f5})
//   ];
//   const loader2 = new FontLoader();
//   loader2.load('fonts/helvetiker_bold.typeface.json', (isFont) => {
//     const geometry = new TextGeometry(
//       'camare',
//             {
//                 font: isFont,
//                 size: 4,
//                 height: 0.1,
//                 curveSegments: 30,
//                 bevelThickness: 0.6,
//                 bevelSize: 0,
//                 bevelEnabled: true
//             }
//     );
//     geometry.computeBoundingBox();
//     const xoffet = geometry.boundingBox.max.x - geometry.boundingBox.min.x;//X轴方向偏移量，整个字符长度
//     const xoffetLen = xoffet / 2;//中心点
//     const textMesh1 = new THREE.Mesh(geometry, materials);
//     textMesh1.position.set(-xoffetLen + 40, 60, -20);
//     textMesh1.rotation.y = Math.PI
//     scene.add(textMesh1);

//     const geometry2 = new TextGeometry(
//       'log',
//             {
//                 font: isFont,
//                 size: 4,
//                 height: 0.1,
//                 curveSegments: 30,
//                 bevelThickness: 0.6,
//                 bevelSize: 0,
//                 bevelEnabled: true
//             }
//     );
//     const textMesh2 = new THREE.Mesh(geometry2, materials);
//     textMesh2.position.set(0, 0, -20);
//     textMesh2.rotation.y = Math.PI
//     scene.add(textMesh2);

//     const geometry3 = new TextGeometry(
//       'botton',
//             {
//                 font: isFont,
//                 size: 4,
//                 height: 0.1,
//                 curveSegments: 30,
//                 bevelThickness: 0.6,
//                 bevelSize: 0,
//                 bevelEnabled: true
//             }
//     );
//     const textMesh3 = new THREE.Mesh(geometry3, materials);
//     textMesh3.position.set(40, 0, 0);
//     textMesh3.rotation.y = Math.PI / 2;
//     scene.add(textMesh3);

//     const geometry4 = new TextGeometry(
//       'screen',
//             {
//                 font: isFont,
//                 size: 4,
//                 height: 0.1,
//                 curveSegments: 30,
//                 bevelThickness: 0.6,
//                 bevelSize: 0,
//                 bevelEnabled: true
//             }
//     );
//     const textMesh4 = new THREE.Mesh(geometry4, materials);
//     textMesh4.position.set(-30, 40, 3);
//     //textMesh4.rotation.y = Math.PI / 2;
//     scene.add(textMesh4);

//   })
    
// }

// function enableShaow(){
//   dirLight.castShadow = true;
//   renderer.shadowMap.enabled = true;//渲染器渲染阴影
//   plane.receiveShadow = true;
// }

// function buildGUI(){
//   gui = new GUI();
//   const camareFolder = gui.addFolder('Camare');
//   camareFolder.add(camare.position, 'z', -50, 100)
//   .step(1)
//   .onChange((val) => {
//     camare.position.z = val;
//   })

//   const hemiLightFolder = gui.addFolder('hemiLight');//添加文件夹，文件名
//   hemiLightFolder.addColor(hemiLight, 'color')//添加spotLight光源对象的color属性
//         .onChange((val) => {
//           hemiLight.color.set(val);//监听点击GUI改变时，将颜色值赋值给光源
//         });

// }

// function render() {
//     renderer.render(scene, camare);
//     requestAnimationFrame(render);
//     //model.rotation.y += 0.01;
// }

// //监听画面尺寸变化，更新渲染画面
// window.addEventListener("resize", () => {
//     camare.aspect = window.innerWidth / window.innerHeight;//更新摄像头
//     camare.updateProjectionMatrix();//更新摄像头的投影矩阵
//     renderer.setSize(window.innerWidth, window.innerHeight);//更新渲染器
//     renderer.setPixelRatio(window.devicePixelRatio);//设置渲染器的像素比
// })
