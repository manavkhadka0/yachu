"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { Analyser } from "../utils/analyser";
import {
  backdropFragmentShader,
  backdropVertexShader,
  sphereVertexShader,
} from "../utils/shaders";

interface Visual3DProps {
  inputNode: GainNode | null;
  outputNode: GainNode | null;
}

export default function Visual3D({ inputNode, outputNode }: Visual3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const backdropRef = useRef<THREE.Mesh | null>(null);
  const inputAnalyserRef = useRef<Analyser | null>(null);
  const outputAnalyserRef = useRef<Analyser | null>(null);
  const rotationRef = useRef(new THREE.Vector3(0, 0, 0));
  const prevTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x100c14);
    sceneRef.current = scene;

    // Backdrop
    const backdrop = new THREE.Mesh(
      new THREE.IcosahedronGeometry(10, 5),
      new THREE.RawShaderMaterial({
        uniforms: {
          resolution: { value: new THREE.Vector2(1, 1) },
          rand: { value: 0 },
        },
        vertexShader: backdropVertexShader,
        fragmentShader: backdropFragmentShader,
        glslVersion: THREE.GLSL3,
      })
    );
    backdrop.material.side = THREE.BackSide;
    scene.add(backdrop);
    backdropRef.current = backdrop;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(2, -2, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio / 1);
    rendererRef.current = renderer;

    // Sphere
    const geometry = new THREE.IcosahedronGeometry(1, 10);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x000010,
      metalness: 0.5,
      roughness: 0.1,
      emissive: 0x000010,
      emissiveIntensity: 1.5,
    });

    sphereMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 };
      shader.uniforms.inputData = { value: new THREE.Vector4() };
      shader.uniforms.outputData = { value: new THREE.Vector4() };

      sphereMaterial.userData.shader = shader;

      shader.vertexShader = sphereVertexShader;
    };

    const sphere = new THREE.Mesh(geometry, sphereMaterial);
    scene.add(sphere);
    sphere.visible = false;
    sphereRef.current = sphere;

    // Post-processing
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      5,
      0.5,
      0
    );
    const fxaaPass = new ShaderPass(FXAAShader);

    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Load EXR texture
    new EXRLoader().load("piz_compressed.exr", (texture: THREE.Texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      const exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
      sphereMaterial.envMap = exrCubeRenderTarget.texture;
      sphere.visible = true;
    });

    // Resize handler
    const onWindowResize = () => {
      if (!cameraRef.current || !rendererRef.current || !backdropRef.current)
        return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      const dPR = renderer.getPixelRatio();
      const w = window.innerWidth;
      const h = window.innerHeight;
      (
        backdrop.material as THREE.RawShaderMaterial
      ).uniforms.resolution.value.set(w * dPR, h * dPR);
      renderer.setSize(w, h);
      composer.setSize(w, h);
      fxaaPass.material.uniforms["resolution"].value.set(
        1 / (w * dPR),
        1 / (h * dPR)
      );
    };

    window.addEventListener("resize", onWindowResize);
    onWindowResize();

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (
        inputAnalyserRef.current &&
        outputAnalyserRef.current &&
        sphereRef.current &&
        backdropRef.current &&
        cameraRef.current &&
        composerRef.current
      ) {
        inputAnalyserRef.current.update();
        outputAnalyserRef.current.update();

        const t = performance.now();
        const dt = (t - prevTimeRef.current) / (1000 / 60);
        prevTimeRef.current = t;

        const backdropMaterial = backdrop.material as THREE.RawShaderMaterial;
        const sphereMaterial = sphere.material as THREE.MeshStandardMaterial;

        backdropMaterial.uniforms.rand.value = Math.random() * 10000;

        if (sphereMaterial.userData.shader) {
          const inputData = inputAnalyserRef.current.data;
          const outputData = outputAnalyserRef.current.data;

          sphere.scale.setScalar(1 + (0.2 * outputData[1]) / 255);

          const f = 0.001;
          rotationRef.current.x += (dt * f * 0.5 * outputData[1]) / 255;
          rotationRef.current.z += (dt * f * 0.5 * inputData[1]) / 255;
          rotationRef.current.y += (dt * f * 0.25 * inputData[2]) / 255;
          rotationRef.current.y += (dt * f * 0.25 * outputData[2]) / 255;

          const euler = new THREE.Euler(
            rotationRef.current.x,
            rotationRef.current.y,
            rotationRef.current.z
          );
          const quaternion = new THREE.Quaternion().setFromEuler(euler);
          const vector = new THREE.Vector3(0, 0, 5);
          vector.applyQuaternion(quaternion);
          camera.position.copy(vector);
          camera.lookAt(sphere.position);

          sphereMaterial.userData.shader.uniforms.time.value +=
            (dt * 0.1 * outputData[0]) / 255;
          sphereMaterial.userData.shader.uniforms.inputData.value.set(
            (1 * inputData[0]) / 255,
            (0.1 * inputData[1]) / 255,
            (10 * inputData[2]) / 255,
            0
          );
          sphereMaterial.userData.shader.uniforms.outputData.value.set(
            (2 * outputData[0]) / 255,
            (0.1 * outputData[1]) / 255,
            (10 * outputData[2]) / 255,
            0
          );
        }

        composer.render();
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (inputNode) {
      inputAnalyserRef.current = new Analyser(inputNode);
    }
  }, [inputNode]);

  useEffect(() => {
    if (outputNode) {
      outputAnalyserRef.current = new Analyser(outputNode);
    }
  }, [outputNode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
