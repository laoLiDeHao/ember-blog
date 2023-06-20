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
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
export class TEngine {
  dom;
  renderer;
  scene;
  camera;


  group;
  particlesData = [];
  positions;
  colors;
  particles;
  pointCloud;
  particlePositions;
  linesMesh;



  constructor(dom) {
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

    // dom.resize = () => {
    //   this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
    // }
    // 环境光
    const ambientLight = new AmbientLight('#fff', 1)
    // 参考坐标轴
    const axesHelper = new AxesHelper(500)
    axesHelper.position.y += 0.5
    // 矩阵线
    const gridHelper = new GridHelper(1000, 100, '#fff', '#999')
    // 性能监视
    const stats = Stats()
    // 控制器
    const controls = new OrbitControls(this.camera, dom);

    const statsDom = stats.domElement
    statsDom.style.position = 'fixed'
    statsDom.style.top = '0px'
    statsDom.style.right = '0px'
    statsDom.style.left = 'unset'



    this.scene.add(ambientLight)
    this.scene.add(axesHelper)
    this.scene.add(gridHelper)
    this.scene.add(this.camera)

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



    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    })

    this.stats = stats
    this.controls = controls
    this.dom = dom
  }

  initScene() {
    let {
      scene
    } = this


  }



  animate() {



  }


}