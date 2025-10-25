import { useEffect, useRef } from "react";

type RaysOrigin = "top-center" | "top-left" | "top-right" | "right" | "left" | "bottom-center" | "bottom-right" | "bottom-left";

interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const LightRays = ({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 0.5,
  rayLength = 1.0,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = false,
  mouseInfluence = 0.5,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = "",
}: LightRaysProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadOGL = async () => {
      const OGL = await import("ogl");
      const { Renderer, Camera, Transform, Geometry, Program, Mesh, Vec2, Vec3 } = OGL;

      const renderer = new Renderer({ dpr: 2, alpha: true });
      const gl = renderer.gl;
      containerRef.current?.appendChild(gl.canvas);
      rendererRef.current = renderer;

      gl.clearColor(0, 0, 0, 0);

      const camera = new Camera(gl, { fov: 35 });
      camera.position.set(0, 0, 5);

      const scene = new Transform();

      // Convert hex color to RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255
        } : { r: 1, g: 1, b: 1 };
      };

      const color = hexToRgb(raysColor);

      // Vertex shader
      const vertex = /* glsl */ `
        attribute vec3 position;
        attribute vec2 uv;
        
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      // Fragment shader with light rays effect
      const fragment = /* glsl */ `
        precision highp float;
        
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform vec3 uColor;
        uniform float uSpeed;
        uniform float uSpread;
        uniform float uLength;
        uniform float uFade;
        uniform float uSaturation;
        uniform float uMouseInfluence;
        uniform float uNoise;
        uniform float uDistortion;
        uniform float uPulsating;
        uniform vec2 uOrigin;
        
        varying vec2 vUv;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void main() {
          vec2 uv = vUv;
          vec2 center = uOrigin;
          
          if (uMouseInfluence > 0.0) {
            center += (uMouse - 0.5) * uMouseInfluence;
          }
          
          vec2 dir = uv - center;
          float dist = length(dir);
          float angle = atan(dir.y, dir.x);
          
          // Create rays
          float rays = sin(angle * 50.0 * uSpread + uTime * uSpeed);
          
          // Add distortion
          if (uDistortion > 0.0) {
            rays += sin(angle * 30.0 + uTime * uSpeed * 0.5) * uDistortion;
          }
          
          // Add noise
          if (uNoise > 0.0) {
            rays += (random(uv + uTime * 0.1) - 0.5) * uNoise;
          }
          
          rays = smoothstep(0.0, 1.0, rays);
          
          // Apply length
          float lengthMask = smoothstep(uLength, 0.0, dist);
          
          // Apply fade
          float fadeMask = smoothstep(uFade, 0.0, dist);
          
          // Pulsating effect
          float pulse = 1.0;
          if (uPulsating > 0.0) {
            pulse = 0.8 + sin(uTime * 2.0) * 0.2;
          }
          
          // Combine effects
          float alpha = rays * lengthMask * fadeMask * pulse * 0.3;
          
          // Apply saturation
          vec3 finalColor = mix(vec3(0.5), uColor, uSaturation);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `;

      const getOriginCoords = (): [number, number] => {
        const origins: Record<RaysOrigin, [number, number]> = {
          "top-center": [0.5, 1.0],
          "top-left": [0.0, 1.0],
          "top-right": [1.0, 1.0],
          "right": [1.0, 0.5],
          "left": [0.0, 0.5],
          "bottom-center": [0.5, 0.0],
          "bottom-right": [1.0, 0.0],
          "bottom-left": [0.0, 0.0],
        };
        return origins[raysOrigin] || [0.5, 1.0];
      };

      const originCoords = getOriginCoords();

      const geometry = new Geometry(gl, {
        position: { size: 3, data: new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]) },
        uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
      });

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new Vec2(gl.canvas.width, gl.canvas.height) },
          uMouse: { value: new Vec2(0.5, 0.5) },
          uColor: { value: new Vec3(color.r, color.g, color.b) },
          uSpeed: { value: raysSpeed },
          uSpread: { value: lightSpread },
          uLength: { value: rayLength },
          uFade: { value: fadeDistance },
          uSaturation: { value: saturation },
          uMouseInfluence: { value: followMouse ? mouseInfluence : 0.0 },
          uNoise: { value: noiseAmount },
          uDistortion: { value: distortion },
          uPulsating: { value: pulsating ? 1.0 : 0.0 },
          uOrigin: { value: new Vec2(originCoords[0], originCoords[1]) },
        },
        transparent: true,
      });

      const mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(scene);

      const mouse = new Vec2(0.5, 0.5);

      const handleMouseMove = (e: MouseEvent) => {
        if (followMouse) {
          mouse.x = e.clientX / window.innerWidth;
          mouse.y = 1.0 - e.clientY / window.innerHeight;
        }
      };

      if (followMouse) {
        window.addEventListener("mousemove", handleMouseMove);
      }

      const resize = () => {
        renderer.setSize(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
      };

      window.addEventListener("resize", resize);
      resize();

      let animationId: number;
      const animate = (t: number) => {
        animationId = requestAnimationFrame(animate);
        
        program.uniforms.uTime.value = t * 0.001;
        program.uniforms.uMouse.value.copy(mouse);
        
        renderer.render({ scene, camera });
      };

      animate(0);

      return () => {
        window.removeEventListener("resize", resize);
        if (followMouse) {
          window.removeEventListener("mousemove", handleMouseMove);
        }
        cancelAnimationFrame(animationId);
        if (gl.canvas.parentNode) {
          gl.canvas.parentNode.removeChild(gl.canvas);
        }
      };
    };

    let cleanup: (() => void) | undefined;
    loadOGL().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  return (
    <div
      ref={containerRef}
      className={`light-rays-container ${className}`}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default LightRays;
