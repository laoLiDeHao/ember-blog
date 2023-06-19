/*
 * @Author: Ember.PL 1084861534@163.com
 * @Date: 2022-12-28 10:21:41
 * @LastEditors: Ember.PL 1084861534@163.com
 * @LastEditTime: 2022-12-28 15:55:17
 * @FilePath: \three-learn\src\assets\TEngine.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Vector3,
  AmbientLight,
  AxesHelper,
  GridHelper

} from "three";
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import {
  PointerLockControls
} from 'three/examples/jsm/controls/PointerLockControls.js';
import {
  onKeydowm,
  onKeyup
} from "./keyboard";
export class TEngine {
  dom
  renderer
  scene
  camera
  isLocked = false
  moveBackward = false
  moveForward = false
  moveLeft = false
  moveRight = false
  canJump = true

  velocity = new THREE.Vector3()
  direction = new THREE.Vector3();
  vertex = new THREE.Vector3();
  color = new THREE.Color();
  prevTime = performance.now();


  objects = []

  raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
  raycasterZ1 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 10);
  raycasterZ2 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 10);


  scoll = 0;
  top = 0;

  handler = {
    score: null,
    top: null
  }

  constructor(dom, handler = {
    score: null,
    top: null
  }) {
    this.dom = dom
    this.renderer = new WebGLRenderer({
      antialias: true //抗锯齿
    })
    this.scene = new Scene()
    this.scene.background = new THREE.Color(0xffffff);
    this.camera = new PerspectiveCamera(95, dom.offsetWidth / dom.offsetHeight, 1, 1000)
    this.camera.position.y = 10;
    this.camera.lookAt(new Vector3(0, 0, 0))
    this.camera.up = new Vector3(0, 1, 0)
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
    // window.addEventListener('resize', () => {
    //   // this.camera.aspect = dom.innerWidth / dom.innerHeight;
    //   // this.camera.updateProjectionMatrix();
    //   this.renderer.setSize(dom.offsetWidth, dom.offsetWidth);
    // })
    // dom.resize = () => {
    //   this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
    // }
    // 环境光
    const ambientLight = new AmbientLight('#fff', 1)
    // 参考坐标轴
    const axesHelper = new AxesHelper(500)
    // 矩阵线
    const gridHelper = new GridHelper(500, 10, '#fff', '#999')
    // 性能监视
    const stats = Stats()
    // 控制器
    const controls = new PointerLockControls(this.camera, dom);

    const statsDom = stats.domElement
    statsDom.style.position = 'fixed'
    statsDom.style.top = '0px'
    statsDom.style.right = '0px'
    statsDom.style.left = 'unset'


    // const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    // light.position.set(0.5, 1, 0.75);
    // this.scene.add(light);




    this.initFloor()
    this.addObjects()
    this.scene.add(ambientLight)
    this.scene.add(axesHelper)
    this.scene.add(gridHelper)
    this.scene.add(controls.getObject())




    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape')
        this.fuseControls()

      onKeydowm(event, this)
    });
    document.addEventListener('keyup', (event) => {
      onKeyup(event, this)
    });

    // this.onkeydowm()


    dom.addEventListener('click', () => {
      this.getControls()
    })


    // 动态渲染 request Animation Frame 让场景动起来
    const tick = () => {
      requestAnimationFrame(tick)
      stats.update() //帧率检测
      this.animate()
      this.renderer.render(this.scene, this.camera)

    }
    tick()


    dom.appendChild(this.renderer.domElement)
    dom.appendChild(statsDom)


    this.controls = controls
    this.dom = dom
    this.handler = handler
  }
  getControls() {
    let {
      controls
    } = this
    controls.lock()
  }
  fuseControls() {
    let {
      controls
    } = this
    controls.unlock()
  }

  initFloor() {
    let {
      color,
      scene,
      vertex
    } = this
    let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    floorGeometry.rotateX(-Math.PI / 2);
    let position = floorGeometry.attributes.position;

    console.log('position', position);
    for (let i = 0, l = position.count; i < l; i++) {

      vertex.fromBufferAttribute(position, i);
      // vertex exchanged unrule      
      vertex.x += Math.random() * 20 - 10;
      vertex.y += Math.random() * 2;
      vertex.z += Math.random() * 20 - 10;


      position.setXYZ(i, vertex.x, vertex.y, vertex.z);

    }

    floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

    position = floorGeometry.attributes.position;
    const colorsFloor = [];

    for (let i = 0, l = position.count; i < l; i++) {

      color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);
      colorsFloor.push(color.r, color.g, color.b);
      // colorsFloor.push(Math.random(), Math.random(), Math.random());


    }

    floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsFloor, 3));



    const floorMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      // wireframe: true
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(floor);
  }

  addObjects() {
    let {
      scene,
      objects,
      color
    } = this
    const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();

    let position = boxGeometry.attributes.position;
    const colorsBox = [];

    for (let i = 0, l = position.count; i < l; i++) {

      color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);
      colorsBox.push(color.r, color.g, color.b);

    }

    boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsBox, 3));

    for (let i = 0; i < 300; i++) {

      const boxMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        flatShading: true,
        vertexColors: true
      });
      boxMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);

      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
      box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
      box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

      scene.add(box);
      objects.push(box);

    }

  }


  scoreCount() {
    let {
      controls
    } = this
    console.log(controls.getObject());
    // let score = controls.getObject().position.y;

    // if (this.top < score) this.top = score;

    // this.score = score


    // if (this.handler.score) this.handler.score(this.score)
    // if (this.handler.top) this.handler.top(this.top)

  }

  animate() {
    let {
      raycaster,
      raycasterZ1,
      controls,
      objects,
      velocity,
      direction,
      moveBackward,
      moveForward,
      moveRight,
      moveLeft,
    } = this
    const time = performance.now();
    let isLocked
    for (let k in controls) {
      if (k === 'isLocked')
        isLocked = controls[k]
    }


    if (isLocked === true) {
      // console.log(true);
      raycaster.ray.origin.copy(controls.getObject().position);
      raycaster.ray.origin.y -= 10;


      const intersections = raycaster.intersectObjects(objects, false);
      const onObject = intersections.length > 0;
      const delta = (time - this.prevTime) / 1000;



      raycasterZ1.ray.origin.copy(controls.getObject().position);
      raycasterZ1.ray.origin.y -= 10;


      // if (onBlockZ1) console.log('blockF');


      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      // console.log(velocity);

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize(); // this ensures consistent movements in all directions





      if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;


      // if (onBlockZ1 && velocity.z < 0) velocity.z = 0
      if (onObject === true) {

        velocity.y = Math.max(0, velocity.y);
        this.canJump = true;

      }

      controls.moveRight(-velocity.x * delta);
      controls.moveForward(-velocity.z * delta);
      // controls.getObject().position.z +=(-velocity.z * delta)
      controls.getObject().position.y += (velocity.y * delta); // new behavior  更新位置

      if (controls.getObject().position.y < 10) {

        velocity.y = 0;
        controls.getObject().position.y = 10;

        this.canJump = true;



      }



      let score = controls.getObject().position.y;

      if (this.top < score) this.top = score;

      this.score = score


      if (this.handler.score) this.handler.score(this.score)
      if (this.handler.top) this.handler.top(this.top)


    }





    this.prevTime = time;

  }


}