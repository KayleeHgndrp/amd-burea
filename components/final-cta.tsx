"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import * as THREE from "three";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Final CTA section — visual + copy bookend with the Hero.
 *
 * Theme tokens this component expects (Tailwind v4 @theme):
 *   --color-brand-900: ~ #0E1B33   deep navy (section base)
 *   --color-warm-50:   ~ #FAF5EE   cream (CTA pill, matches Hero primary)
 *
 * Shader is the same aurora as Hero.tsx (lifted navy base + amber/blue/teal
 * aurora + warm golden halo). Mouse interaction is stripped — this section
 * is "decide and click", not "explore".
 */

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
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

    // Lifted navy base — matches Hero exactly
    vec3 col = vec3(0.045, 0.075, 0.16);

    float beam1 = snoise(vec3(uv.x * 1.4 + t * 0.5, uv.y * 0.8 - t * 0.2, t * 0.3));
    float beam2 = snoise(vec3(uv.x * 1.8 - t * 0.3, uv.y * 0.6 + t * 0.1, t * 0.2 + 10.0));
    float beam3 = snoise(vec3(uv.x * 1.1 + t * 0.2, uv.y * 1.0 - t * 0.15, t * 0.25 + 20.0));

    float verticalFade = pow(1.0 - uv.y, 1.5);
    float verticalFade2 = pow(1.0 - uv.y, 2.5);

    float light1 = smoothstep(0.0, 0.8, beam1 * verticalFade);
    float light2 = smoothstep(0.0, 0.7, beam2 * verticalFade);
    float light3 = smoothstep(0.0, 0.6, beam3 * verticalFade2);

    // Blue-dominant aurora with warm amber wash on the left — matches Hero
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

    // Warm golden halo bottom-center
    float centerGlow = exp(-pow((xPos - 0.5) * 2.2, 2.0)) * verticalFade2;
    col += vec3(0.95, 0.62, 0.28) * centerGlow * 0.32;

    float vignette = 1.0 - pow(length(uv - vec2(0.5 * iResolution.x / iResolution.y, 0.5)) * 0.75, 2.0);
    col *= max(vignette, 0.45);
    col = pow(col, vec3(0.88));

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function FinalCTA(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(width, height) },
    };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const startTime = Date.now();
    function animate() {
      uniforms.iTime.value = (Date.now() - startTime) * 0.001;
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-brand-900 py-24 sm:py-32 lg:py-40">
      {/* Animated aurora — same shader as Hero */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* Paper grain — same as Hero */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay z-0"
      >
        <filter id="cta-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain)" />
      </svg>

      <div className="relative z-10 mx-auto  px-6 sm:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.0] tracking-tight text-white"
        >
          Klaar om je boekhouding 
          <br />
          <em>los te laten?</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-6 text-lg lg:text-xl text-white/75 max-w-md mx-auto leading-relaxed"
        >
          We regelen de overstap, jij merkt er niks van. Plan een gratis kennismaking, dan kijken we wat past.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-10"
        >
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 h-12 px-7 text-sm font-medium bg-background text-foreground rounded-full text-sm font-medium w-fit hover:bg-foreground/90 transition-colors"
          >
            Plan kennismaking
          </a>
        </motion.div>

    
      </div>
    </section>
  );
}