"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import * as THREE from "three";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Theme tokens this component expects (Tailwind v4 @theme):
 *   --color-brand-900: ~ #0E1B33   deep navy (section base, cards)
 *   --color-warm-50:   ~ #FAF5EE   cream (testimonial card)
 *   --color-warm-200:  ~ #E6D4B8   champagne (avatar fallback)
 *
 * Portrait photo expected at /public/images/hero-meeting.png
 */

const PHOTO_SRC = "/images/hero-meeting.png";

// ─────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────

function Star({ size = 13, color = "#F59E0B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <polygon points="12 2 15 9 22 9.3 16.5 14 18 21 12 17.3 6 21 7.5 14 2 9.3 9 9 12 2" />
    </svg>
  );
}

function SocialProof(): ReactNode {
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-2">
        {[11, 13, 25, 32].map((id) => (
          <div
            key={id}
            className="w-9 h-9 rounded-full border-2 border-brand-900 bg-warm-200 bg-cover bg-center ring-1 ring-white/5"
            style={{ backgroundImage: `url(https://i.pravatar.cc/72?img=${id})` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={12} color="#FCD34D" />
          ))}
          <span className="ml-1.5 text-sm text-white font-medium">9.4 / 10</span>
        </div>
        <div className="text-xs text-white/60 mt-0.5">2.500+ ZZP'ers gingen je voor</div>
      </div>
    </div>
  );
}

function CTAs(): ReactNode {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="#contact"
        className="h-12 px-7 text-sm font-medium bg-white text-brand-900 rounded-full hover:bg-warm-50 active:scale-[0.97] transition-all duration-150 inline-flex items-center justify-center whitespace-nowrap"
      >
        Plan kennismaking
      </a>
      <a
        href="#pakketten"
        className="h-12 px-7 text-sm font-medium border border-white/25 text-white rounded-full hover:bg-white/10 active:scale-[0.97] transition-all duration-150 inline-flex items-center justify-center whitespace-nowrap"
      >
        Bekijk pakketten
      </a>
    </div>
  );
}

function DeadlineCard({ className = "" }: { className?: string }): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16, y: -8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2, ease }}
      className={`bg-brand-900/95 backdrop-blur-md text-white rounded-2xl px-4 py-3 shadow-xl border border-white/10 ${className}`}
    >
      <div className="text-[10px] uppercase tracking-[0.12em] text-white/55 font-medium">
        Volgende deadline
      </div>
      <div className="font-serif text-lg mt-0.5">BTW Q2 · 31 jul</div>
    </motion.div>
  );
}

function TestimonialCard({ className = "" }: { className?: string }): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay: 1.0, ease }}
      className={`max-w-[280px] bg-white rounded-2xl p-5 shadow-2xl ring-1 ring-black/5 ${className}`}
    >
      <div className="flex items-center gap-0.5 mb-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={13} color="#F59E0B" />
        ))}
      </div>
      <p className="font-serif italic text-brand-900 leading-snug text-[15px]">
        &ldquo;Eindelijk een boekhouder die meedenkt, zonder vakjargon.&rdquo;
      </p>
      <p className="mt-2 text-xs text-brand-900/60">Annita Luijdens — Freelance adviseur</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Shader
// ─────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────

export function Hero(): ReactNode {
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
      iMouse: { value: new THREE.Vector2(0.35, 0.4) },
    };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const targetMouse = { x: 0.35, y: 0.4 };
    const currentMouse = { x: 0.35, y: 0.4 };

    function handleMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    }
    container.addEventListener("mousemove", handleMouseMove);

    const startTime = Date.now();
    function animate() {
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;
      uniforms.iMouse.value.set(currentMouse.x, currentMouse.y);
      uniforms.iTime.value = (Date.now() - startTime) * 0.001;
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      uniforms.iResolution.value.set(newWidth, newHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-brand-900">
      {/* Animated aurora */}
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />

      {/* Paper grain for subtle warm texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay"
      >
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease }}
          className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-16 items-center"
        >
          {/* LEFT — editorial content */}
          <div className="pointer-events-auto">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-white"
            >
              Boekhouding zonder <em>gedoe.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="mt-6 lg:mt-7 text-lg lg:text-xl text-white/75 max-w-md leading-relaxed"
            >
              Voor ZZP'ers die liever ondernemen dan administreren. Vaste prijs, eigen boekhouder, klare taal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease }}
              className="mt-8 lg:mt-9"
            >
              <CTAs />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease }}
              className="mt-9 lg:mt-10"
            >
              <SocialProof />
            </motion.div>
          </div>

          {/* RIGHT — portrait card with floating testimonial + deadline */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[560px] max-lg:max-w-md max-lg:mx-auto pointer-events-auto"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10">
              <img
                src={PHOTO_SRC}
                alt="Persoonlijke boekhouder voor ZZP'ers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/45 via-transparent to-transparent" />
            </div>

            <TestimonialCard className="absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-5 lg:-bottom-7 lg:-left-8" />
            <DeadlineCard className="absolute -top-4 -right-3 sm:-top-5 sm:-right-4 lg:-top-5 lg:-right-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}