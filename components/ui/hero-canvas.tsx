"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function RealEstateBuilding() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging.current) {
        const deltaX = e.clientX - previousMouse.current.x;
        const deltaY = e.clientY - previousMouse.current.y;

        dragRotation.current.y += deltaX * 0.0015;
        dragRotation.current.x += deltaY * 0.0015;

        previousMouse.current.x = e.clientX;
        previousMouse.current.y = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isDragging.current = true;
        previousMouse.current.x = e.clientX;
        previousMouse.current.y = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener("mouseup", onMouseUp, false);

    return () => {
      window.removeEventListener("mousemove", onMouseMove, false);
      window.removeEventListener("mousedown", onMouseDown, false);
      window.removeEventListener("mouseup", onMouseUp, false);
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    targetRotation.current.x +=
      (mouse.current.y * 0.1 - targetRotation.current.x) * 0.02;
    targetRotation.current.y +=
      (mouse.current.x * 0.1 - targetRotation.current.y) * 0.02;

    groupRef.current.rotation.y += 0.2 * delta + dragRotation.current.y;
    groupRef.current.rotation.x =
      0.05 + targetRotation.current.x * 0.001 + dragRotation.current.x;

    dragRotation.current.x *= 0.92;
    dragRotation.current.y *= 0.92;
  });

  const building = useMemo(() => {
    const group = new THREE.Group();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.1,
      roughness: 0.9,
    });
    const groundGeo = new THREE.BoxGeometry(120, 1, 120);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -1;
    ground.receiveShadow = true;
    group.add(ground);

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x1c1c1c,
      metalness: 0.15,
      roughness: 0.85,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.7,
      roughness: 0.25,
      emissive: 0xd97706,
      emissiveIntensity: 0.15,
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x0a1628,
      metalness: 0.9,
      roughness: 0.05,
      transparent: true,
      opacity: 0.85,
    });

    const podiumGeo = new THREE.BoxGeometry(70, 8, 55);
    const podium = new THREE.Mesh(podiumGeo, concreteMat);
    podium.position.y = 4;
    podium.castShadow = true;
    podium.receiveShadow = true;
    group.add(podium);

    const podiumTrimGeo = new THREE.BoxGeometry(72, 1, 57);
    const podiumTrim = new THREE.Mesh(podiumTrimGeo, goldMat);
    podiumTrim.position.y = 8.5;
    group.add(podiumTrim);

    const towerAGeo = new THREE.BoxGeometry(30, 110, 28);
    const towerA = new THREE.Mesh(towerAGeo, glassMat);
    towerA.position.set(-16, 63, 0);
    towerA.castShadow = true;
    group.add(towerA);

    const towerBGeo = new THREE.BoxGeometry(24, 85, 22);
    const towerB = new THREE.Mesh(towerBGeo, glassMat);
    towerB.position.set(18, 51, 0);
    towerB.castShadow = true;
    group.add(towerB);

    const gridSize = 4;
    const floorCount = 22;
    for (let floor = 0; floor < floorCount; floor++) {
      for (let col = 0; col < gridSize; col++) {
        const winGeo = new THREE.BoxGeometry(4.5, 2.5, 0.3);
        const winMat = new THREE.MeshStandardMaterial({
          color: Math.random() > 0.3 ? 0xf59e0b : 0x0a2040,
          emissive: Math.random() > 0.3 ? 0xd97706 : 0x001020,
          emissiveIntensity: Math.random() > 0.3 ? 0.6 : 0.1,
          metalness: 0.5,
          roughness: 0.3,
        });
        const win = new THREE.Mesh(winGeo, winMat);
        win.position.set(-16 + (col - 1.5) * 7, 14 + floor * 4.8, 14.2);
        group.add(win);

        const winB = win.clone();
        winB.position.set(18 + (col - 1.5) * 5.5, 14 + floor * 3.8, 11.2);
        if (floor < 18) group.add(winB);
      }
    }

    for (let i = 0; i < 23; i++) {
      const trimGeo = new THREE.BoxGeometry(31, 0.4, 29);
      const trim = new THREE.Mesh(trimGeo, goldMat);
      trim.position.set(-16, 9 + i * 4.8, 0);
      group.add(trim);
    }

    const spireBaseGeo = new THREE.BoxGeometry(6, 2, 6);
    const spireBase = new THREE.Mesh(spireBaseGeo, goldMat);
    spireBase.position.set(-16, 119, 0);
    group.add(spireBase);

    const spireGeo = new THREE.CylinderGeometry(0.4, 2.5, 22, 8);
    const spire = new THREE.Mesh(spireGeo, goldMat);
    spire.position.set(-16, 130, 0);
    group.add(spire);

    const spireTopGeo = new THREE.SphereGeometry(1.2, 8, 8);
    const spireTop = new THREE.Mesh(spireTopGeo, goldMat);
    spireTop.position.set(-16, 141, 0);
    group.add(spireTop);

    const roofBGeo = new THREE.BoxGeometry(10, 1.5, 10);
    const roofB = new THREE.Mesh(roofBGeo, goldMat);
    roofB.position.set(18, 94.5, 0);
    group.add(roofB);

    for (let i = 0; i < 5; i++) {
      const balconyGeo = new THREE.BoxGeometry(32, 0.5, 3);
      const balcony = new THREE.Mesh(balconyGeo, goldMat);
      balcony.position.set(-16, 20 + i * 22, 15.5);
      group.add(balcony);
    }

    const sideWingGeo = new THREE.BoxGeometry(12, 35, 18);
    const sideWing = new THREE.Mesh(sideWingGeo, concreteMat);
    sideWing.position.set(-44, 22, 0);
    sideWing.castShadow = true;
    group.add(sideWing);

    const sideWingR = sideWing.clone();
    sideWingR.position.set(38, 22, 0);
    group.add(sideWingR);

    const entranceGeo = new THREE.BoxGeometry(20, 10, 5);
    const entrance = new THREE.Mesh(entranceGeo, goldMat);
    entrance.position.set(-16, 13, 30);
    group.add(entrance);

    const canopyGeo = new THREE.BoxGeometry(24, 0.8, 8);
    const canopy = new THREE.Mesh(canopyGeo, goldMat);
    canopy.position.set(-16, 18.5, 30.5);
    group.add(canopy);

    return group;
  }, []);

  return (
    <group
      ref={groupRef}
      position={isMobile ? [0, -45, 0] : [55, -47, -27]}
      scale={isMobile ? 0.45 : 0.65}
      rotation={[0, -0.6, 0]}
    >
      <primitive object={building} />
    </group>
  );
}

function Lighting() {
  return (
    <>
      <directionalLight
        position={[100, 120, 80]}
        intensity={2.5}
        color={0xfff5e6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[-80, 60, -60]}
        intensity={0.3}
        color={0xaabbff}
      />
      <pointLight
        position={[30, 80, 60]}
        intensity={1.5}
        color={0xf59e0b}
        distance={400}
      />
      <ambientLight intensity={0.7} color={0xffffff} />
    </>
  );
}

function Scene() {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(0x080808);
    scene.fog = new THREE.FogExp2(0x080808, 0.003);
  }, [scene]);

  return (
    <>
      <Lighting />
      <RealEstateBuilding />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto user-select-none">
      <Canvas
        camera={{
          position: [0, 20, 140],
          fov: 40,
          near: 0.1,
          far: 1000,
        }}
        shadows
        dpr={
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, 2)
            : 1
        }
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
