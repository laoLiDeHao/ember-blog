import { Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, } from "@react-three/fiber";
import {
  // useGLTF,
  SpotLight,
  // useDepthBuffer,
  // CameraControls,
  useTexture,
  OrbitControls,
} from "@react-three/drei";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
// import * as THREE from "three";
export default function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [-2, 2, 6], fov: 50, near: 1, far: 20 }}
    >
      {/* <axesHelper /> */}
      <color attach="background" args={["#202020"]} />
      <fog attach="fog" args={["#202020", 5, 20]} />
      <ambientLight intensity={0.015} />
      <Scene />
      <OrbitControls  />
    </Canvas>
  );
}

function Scene() {
  // This is a super cheap depth buffer that only renders once (frames: 1 is optional!), which works well for static scenes
  // Spots can optionally use that for realism, learn about soft particles here: http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html
  // const depthBuffer = useDepthBuffer({ frames: 1 });

  const [model, SetModel] = useState(null);


  useEffect(() => {
    new PLYLoader().load("models/ply/Lucy100k.ply", function (geometry) {
  

      geometry.scale(0.0012, 0.0012, 0.0012);
      geometry.computeVertexNormals();

      // const material = new THREE.MeshLambertMaterial();

      // const mesh = new THREE.Mesh(geometry, material);
      // mesh.rotation.y = -Math.PI / 2;
      // mesh.position.y = 0;
      // mesh.castShadow = true;
      // mesh.receiveShadow = true;
      // scene.add(mesh);

      SetModel(geometry);
    });
  }, []);
  // const { nodes, materials } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/dragon/model.gltf')
  return (
    <>
      {/* <MovingSpot
        depthBuffer={depthBuffer}
        color="#0c8cbf"
        position={[3, 3, 2]}
      /> */}
      <MovingSpot
        // depthBuffer={depthBuffer}
        // color="#f0f0f0"
        position={[2, 3, 2]}
      />
      {/* <mesh position={[0, -1.03, 0]} castShadow receiveShadow geometry={nodes.dragon.geometry} material={materials['Default OBJ.001']} dispose={null} />*/}
      {model != null && (
        <mesh
          position={[0, -0, 0]}
          castShadow
          receiveShadow
          dispose={null}
          geometry={model}
        >
          <meshLambertMaterial />
        </mesh>
      )}

      <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh>
    </>
  );
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const {position} = props
  const light = useRef();
  // const viewport = useThree((state) => state.viewport);
  const texture = useTexture('/texture/disturb.jpg')
  // useFrame((state) => {
  //   light.current.target.position.lerp(
  //     vec.set(
  //       (state.mouse.x * viewport.width) / 2,
  //       (state.mouse.y * viewport.height) / 2,
  //       0
  //     ),
  //     0.1
  //   );
  //   light.current.target.updateMatrixWorld();
  // });
  useFrame(({clock})=>{
    console.log(position);
    light.current.position.x = Math.cos(clock.getElapsedTime()/2)*position[0]
    light.current.position.z = Math.sin(clock.getElapsedTime()/2)*position[2]
  })
  return (
    <SpotLight
      // castShadow
      ref={light}
      penumbra={1}
      distance={6}
      angle={0.5}
      attenuation={50}
      anglePower={1000}
      intensity={40}
      {...props}
      map={texture}
    />

  );
}
