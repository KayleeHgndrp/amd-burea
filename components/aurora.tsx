"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import * as THREE from "three";

type AuroraProps = {
  /**
   * Volg de muis met een subtiele warm-glow displacement.
   * Alleen aanzetten op interactieve secties (zoals de Hero).
   */
  interactive?: boolean;
  /** Klassen voor de wrapper (meestal "absolute inset-0"). */
  className?: string;
};

// Vaste "mouse" positie wanneer er geen muisinteractie is — geeft een
// subtiele a-symmetrie in de gloed.
const FIXED_MOUSE: readonly [number, number] = [0.5, 0.4];

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= iResolution.x / iResolution.y;
    float t = iTime * 0.12;

    vec2 mouse = iMouse;
    mouse.x *= iResolution.x / iResolution.y;
    vec2 toMouse = uv - mouse;
    float dist = length(toMouse);
    float influence = exp(-dist * dist * 2.0) * 0.10;
    vec2 displacement = toMouse * influence / (dist + 0.1);
    vec2 displacedUv = uv + displacement;

    vec3 col = vec3(0.045, 0.075, 0.16);

    float beam1 = snoise(vec3(displacedUv.x * 1.4 + t * 0.5, displacedUv.y * 0.8 - t * 0.2, t * 0.3));
    float beam2 = snoise(vec3(displacedUv.x * 1.8 - t * 0.3, displacedUv.y * 0.6 + t * 0.1, t * 0.2 + 10.0));
    float beam3 = snoise(vec3(displacedUv.x * 1.1 + t * 0.2, displacedUv.y * 1.0 - t * 0.15, t * 0.25 + 20.0));

    float verticalFade = pow(1.0 - uv.y, 1.5);
    float verticalFade2 = pow(1.0 - uv.y, 2.5);

    float light1 = smoothstep(0.0, 0.8, beam1 * verticalFade);
    float light2 = smoothstep(0.0, 0.7, beam2 * verticalFade);
    float light3 = smoothstep(0.0, 0.6, beam3 * verticalFade2);

    vec3 amber    = vec3(0.95, 0.65, 0.30);
    vec3 deepBlue = vec3(0.12, 0.30, 0.75);
    vec3 cyan     = vec3(0.20, 0.55, 0.90);
    vec3 sky      = vec3(0.35, 0.50, 0.85);
    vec3 teal     = vec3(0.10, 0.45, 0.55);

    float xPos = uv.x / (iResolution.x / iResolution.y);

    col += amber    * light1 * 0.45 * smoothstep(0.55, 0.0, xPos);
    col += deepBlue * light2 * 0.55 * smoothstep(0.15, 0.45, xPos);
    col += cyan     * light2 * 0.50 * smoothstep(0.35, 0.7, xPos);
    col += sky      * light3 * 0.45 * smoothstep(0.55, 0.9, xPos);
    col += teal     * light3 * 0.30 * smoothstep(0.75, 1.0, xPos);

    float centerGlow = exp(-pow((xPos - 0.5) * 2.2, 2.0)) * verticalFade2;
    col += vec3(0.95, 0.62, 0.28) * centerGlow * 0.32;

    float vignette = 1.0 - pow(length(uv - vec2(0.5 * iResolution.x / iResolution.y, 0.5)) * 0.75, 2.0);
    col *= max(vignette, 0.45);
    col = pow(col, vec3(0.88));
    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * CSS-only fallback die de aurora visueel benadert. Altijd onder de canvas
 * gerenderd: voorkomt een flash bij WebGL-init, én is wat phones / users met
 * prefers-reduced-motion zien (omdat we WebGL daar overslaan).
 */
const FALLBACK_STYLE: CSSProperties = {
  background: [
    "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(242, 158, 71, 0.28) 0%, transparent 60%)",
    "radial-gradient(ellipse 70% 80% at 15% 95%, rgba(242, 158, 71, 0.20) 0%, transparent 55%)",
    "radial-gradient(ellipse 70% 80% at 70% 85%, rgba(51, 140, 230, 0.30) 0%, transparent 60%)",
    "radial-gradient(ellipse 50% 60% at 90% 70%, rgba(89, 128, 217, 0.22) 0%, transparent 55%)",
    "linear-gradient(180deg, #0b1326 0%, #0e1b33 60%, #0c1730 100%)",
  ].join(", "),
};

export function Aurora({
  interactive = false,
  className,
}: AuroraProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip WebGL volledig op phones en bij prefers-reduced-motion.
    // De CSS-fallback hieronder blijft sowieso staan — die zien zij dan.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    if (reduceMotion || isPhone) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // WebGL niet beschikbaar — CSS fallback is al zichtbaar.
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(width, height) },
      iMouse: { value: new THREE.Vector2(FIXED_MOUSE[0], FIXED_MOUSE[1]) },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const targetMouse = { x: FIXED_MOUSE[0], y: FIXED_MOUSE[1] };
    const currentMouse = { x: FIXED_MOUSE[0], y: FIXED_MOUSE[1] };

    function handleMouseMove(event: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      targetMouse.x = (event.clientX - rect.left) / rect.width;
      targetMouse.y = 1 - (event.clientY - rect.top) / rect.height;
    }
    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    // Pauzeer het renderen wanneer de sectie buiten beeld is.
    // Belangrijk voor FinalCTA (zit onder de fold bij page load).
    let visible = true;
    let rafId = 0;
    let accumulated = 0;
    let lastFrame = performance.now();

    function animate() {
      if (!visible) {
        rafId = 0;
        return;
      }

      const now = performance.now();
      accumulated += now - lastFrame;
      lastFrame = now;

      if (interactive) {
        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;
        uniforms.iMouse.value.set(currentMouse.x, currentMouse.y);
      }
      uniforms.iTime.value = accumulated * 0.001;
      renderer.render(scene, camera);

      rafId = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry?.isIntersecting ?? false;
        if (visible && !wasVisible && !rafId) {
          // Reset lastFrame zodat we geen sprong krijgen na lange pauze.
          lastFrame = performance.now();
          animate();
        }
      },
      { threshold: 0 },
    );
    observer.observe(container);

    animate();

    function handleResize() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      observer.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div className={className} aria-hidden="true">
      <div
        className="absolute inset-0 pointer-events-none"
        style={FALLBACK_STYLE}
      />
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}