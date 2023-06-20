import * as THREE from 'three'
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module'



export default function createView(dom) {
  let group;
  let container, stats;
  const particlesData = [];

  let positions, colors;
  let particles;
  let pointCloud;
  let particlePositions;
  let linesMesh;




  const maxParticleCount = 1000;
  let particleCount = 500;
  const r = 800;
  const rHalf = r / 2;

  const effectController = {
    showDots: true,
    showLines: true,
    minDistance: 150,
    limitConnections: false,
    maxConnections: 20,
    particleCount: 500
  };

  // Debug
  // const gui = new dat.GUI()

  // Canvas
  const canvas = dom

  // Scene
  const scene = new THREE.Scene()

  // // Objects
  // const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

  // // Materials

  // const material = new THREE.PointsMaterial({
  //   size: .005
  // })
  // // material.color = new THREE.Color(0xff0000)

  // // Mesh
  // const sphere = new THREE.Points(geometry, material)
  // scene.add(sphere)


  const grid = new THREE.Points(new THREE.PlaneGeometry(100, 100, 64, 64), new THREE.PointsMaterial({
    color: 0xff0000,
    size: .01
  }));

  grid.rotation.x = -Math.PI / 2;
  scene.add(grid)


  // Lights
  const pointLight = new THREE.PointLight(0xffffff, 0.1)
  pointLight.position.x = 2
  pointLight.position.y = 3
  pointLight.position.z = 4
  scene.add(pointLight)

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000000)
  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 2
  scene.add(camera)

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  /**
   * options
   */

  // console.log(sphere);










  init()


  function initGUI() {

    const gui = new dat.GUI();

    gui.add(effectController, 'showDots').onChange(function (value) {

      pointCloud.visible = value;

    });
    gui.add(effectController, 'showLines').onChange(function (value) {

      linesMesh.visible = value;

    });
    gui.add(effectController, 'minDistance', 10, 300);
    gui.add(effectController, 'limitConnections');
    gui.add(effectController, 'maxConnections', 0, 30, 1);
    gui.add(effectController, 'particleCount', 0, maxParticleCount, 1).onChange(function (value) {

      particleCount = parseInt(value);
      particles.setDrawRange(0, particleCount);

    });

  }




  /**
   * frame
   */
  function init() {

    initGUI();

    // container = document.getElementById('container');

    // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
    // camera.position.z = 1750;

    // const controls = new OrbitControls(camera, container);
    // controls.minDistance = 1000;
    // controls.maxDistance = 3000;

    // scene = new THREE.Scene();


    group = new THREE.Group();
    scene.add(group);

    const helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(r, r, r)));
    helper.material.color.setHex(0x474747);
    helper.material.blending = THREE.AdditiveBlending;
    helper.material.transparent = true;
    group.add(helper);

    const segments = maxParticleCount * maxParticleCount;

    positions = new Float32Array(segments * 3);
    colors = new Float32Array(segments * 3);

    const pMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.00030,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false
    });

    particles = new THREE.BufferGeometry();
    particlePositions = new Float32Array(maxParticleCount * 3);

    for (let i = 0; i < maxParticleCount; i++) {

      const x = Math.random() * r - r / 2;
      const y = Math.random() * r - r / 2;
      const z = Math.random() * r - r / 2;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // add it to the geometry
      particlesData.push({
        velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
        numConnections: 0
      });

    }

    particles.setDrawRange(0, particleCount);
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

    // create the particle system
    pointCloud = new THREE.Points(particles, pMaterial);
    group.add(pointCloud);

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

    geometry.computeBoundingSphere();

    geometry.setDrawRange(0, 0);

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    linesMesh = new THREE.LineSegments(geometry, material);
    group.add(linesMesh);

    //

    stats = new Stats();
    canvas.appendChild(stats.dom);


  }


  /**
   * Animate
   */

  const clock = new THREE.Clock()

  const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)
    animate()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()



  function animate() {

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < particleCount; i++)
      particlesData[i].numConnections = 0;

    for (let i = 0; i < particleCount; i++) {

      // get the particle
      const particleData = particlesData[i];

      particlePositions[i * 3] += particleData.velocity.x;
      particlePositions[i * 3 + 1] += particleData.velocity.y;
      particlePositions[i * 3 + 2] += particleData.velocity.z;

      if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
        particleData.velocity.y = -particleData.velocity.y;

      if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
        particleData.velocity.x = -particleData.velocity.x;

      if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
        particleData.velocity.z = -particleData.velocity.z;

      if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections)
        continue;

      // Check collision
      for (let j = i + 1; j < particleCount; j++) {

        const particleDataB = particlesData[j];
        if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections)
          continue;

        const dx = particlePositions[i * 3] - particlePositions[j * 3];
        const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
        const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < effectController.minDistance) {

          particleData.numConnections++;
          particleDataB.numConnections++;

          const alpha = 1.0 - dist / effectController.minDistance;

          positions[vertexpos++] = particlePositions[i * 3];
          positions[vertexpos++] = particlePositions[i * 3 + 1];
          positions[vertexpos++] = particlePositions[i * 3 + 2];

          positions[vertexpos++] = particlePositions[j * 3];
          positions[vertexpos++] = particlePositions[j * 3 + 1];
          positions[vertexpos++] = particlePositions[j * 3 + 2];

          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;

          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;

          numConnected++;

        }

      }

    }


    linesMesh.geometry.setDrawRange(0, numConnected * 2);
    linesMesh.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.attributes.color.needsUpdate = true;

    pointCloud.geometry.attributes.position.needsUpdate = true;

    stats.update();


  }
}