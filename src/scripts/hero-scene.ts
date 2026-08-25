/**
 * Escena 3D del hero — Quality Consulting Group
 *
 * Concepto: una red de nodos conectados (los procesos de una organización)
 * envuelta por los anillos que retoman la "Q" del logotipo.
 *
 * Reglas de peso que respeta este módulo:
 *  · Cero assets externos. Toda la geometría se genera por código.
 *  · Se importa de forma diferida; nunca bloquea el primer render.
 *  · Se detiene solo cuando la pestaña se oculta o el hero sale del viewport.
 */

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  TorusGeometry,
  WebGLRenderer,
} from 'three';

const NODOS = 620;
const RADIO = 3.0;
const DIST_ENLACE = 0.92;
const MAX_ENLACES = 900;

const AZUL_CLARO = new Color('#6f9fe0');
const AZUL_PALIDO = new Color('#a9c6ee');
const DORADO = new Color('#fdbe01');
const BLANCO = new Color('#ffffff');

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aFase;
  uniform float uTime;
  uniform float uEscala;
  varying vec3 vColor;
  varying float vBrillo;

  void main() {
    vColor = aColor;
    // Latido leve y desfasado por nodo, para que la red se sienta viva
    vBrillo = 0.72 + 0.28 * sin(uTime * 1.1 + aFase);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // aSize está en píxeles a distancia de referencia; uEscala da la perspectiva.
    gl_PointSize = aSize * vBrillo * (uEscala / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vBrillo;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    // Núcleo nítido con halo corto: evita que el aditivo se acumule en una mancha
    float alpha = smoothstep(0.5, 0.12, d);
    gl_FragColor = vec4(vColor * vBrillo, alpha * alpha);
  }
`;

export interface EscenaHero {
  destruir(): void;
}

export function crearEscenaHero(canvas: HTMLCanvasElement): EscenaHero {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false, // el suavizado lo da el shader de los puntos; ahorra GPU
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const mundo = new Group();
  scene.add(mundo);

  // ---------------------------------------------------------------
  // 1. Nodos distribuidos sobre una esfera (espiral de Fibonacci)
  // ---------------------------------------------------------------
  const posiciones = new Float32Array(NODOS * 3);
  const colores = new Float32Array(NODOS * 3);
  const tamanos = new Float32Array(NODOS);
  const fases = new Float32Array(NODOS);

  const phi = Math.PI * (3 - Math.sqrt(5));
  const c = new Color();

  for (let i = 0; i < NODOS; i++) {
    const y = 1 - (i / (NODOS - 1)) * 2;
    const radioAnillo = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;

    // Irregularidad leve para que no se vea como una malla perfecta
    const r = RADIO * (0.86 + Math.random() * 0.18);
    posiciones[i * 3] = Math.cos(theta) * radioAnillo * r;
    posiciones[i * 3 + 1] = y * r;
    posiciones[i * 3 + 2] = Math.sin(theta) * radioAnillo * r;

    // Reparto de color: mayoría azul, unos pocos nodos dorados que destacan.
    // Los tamaños están en píxeles a la distancia de referencia de la cámara.
    const dado = Math.random();
    if (dado > 0.94) {
      c.copy(DORADO);
      tamanos[i] = 4.6 + Math.random() * 2.2;
    } else if (dado > 0.82) {
      c.copy(BLANCO);
      tamanos[i] = 3.3 + Math.random() * 1.5;
    } else if (dado > 0.5) {
      c.copy(AZUL_PALIDO);
      tamanos[i] = 2.4 + Math.random() * 1.2;
    } else {
      c.copy(AZUL_CLARO);
      tamanos[i] = 2.0 + Math.random() * 1.0;
    }
    colores[i * 3] = c.r;
    colores[i * 3 + 1] = c.g;
    colores[i * 3 + 2] = c.b;
    fases[i] = Math.random() * Math.PI * 2;
  }

  const geoNodos = new BufferGeometry();
  geoNodos.setAttribute('position', new BufferAttribute(posiciones, 3));
  geoNodos.setAttribute('aColor', new BufferAttribute(colores, 3));
  geoNodos.setAttribute('aSize', new BufferAttribute(tamanos, 1));
  geoNodos.setAttribute('aFase', new BufferAttribute(fases, 1));

  const matNodos = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uEscala: { value: 7.2 } },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  mundo.add(new Points(geoNodos, matNodos));

  // ---------------------------------------------------------------
  // 2. Enlaces entre nodos cercanos — la "red de procesos"
  //    Se calcula una sola vez al iniciar, no en cada cuadro.
  // ---------------------------------------------------------------
  const segmentos: number[] = [];
  const umbral = DIST_ENLACE * DIST_ENLACE;

  for (let i = 0; i < NODOS && segmentos.length < MAX_ENLACES * 6; i++) {
    const ax = posiciones[i * 3];
    const ay = posiciones[i * 3 + 1];
    const az = posiciones[i * 3 + 2];

    for (let j = i + 1; j < NODOS; j++) {
      const dx = ax - posiciones[j * 3];
      const dy = ay - posiciones[j * 3 + 1];
      const dz = az - posiciones[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz > umbral) continue;

      segmentos.push(ax, ay, az, posiciones[j * 3], posiciones[j * 3 + 1], posiciones[j * 3 + 2]);
      if (segmentos.length >= MAX_ENLACES * 6) break;
    }
  }

  const geoEnlaces = new BufferGeometry();
  geoEnlaces.setAttribute('position', new BufferAttribute(new Float32Array(segmentos), 3));
  mundo.add(
    new LineSegments(
      geoEnlaces,
      new LineBasicMaterial({
        color: 0x3a72c4,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending: AdditiveBlending,
      })
    )
  );

  // ---------------------------------------------------------------
  // 3. Anillos: la "Q" del logotipo, en órbita
  // ---------------------------------------------------------------
  const anilloDorado = new Mesh(
    new TorusGeometry(3.9, 0.013, 6, 180),
    new MeshBasicMaterial({ color: 0xfdbe01, transparent: true, opacity: 0.85 })
  );
  anilloDorado.rotation.set(Math.PI / 2.35, 0.32, 0);
  mundo.add(anilloDorado);

  const anilloAzul = new Mesh(
    new TorusGeometry(4.6, 0.008, 6, 180),
    new MeshBasicMaterial({ color: 0x6f9fe0, transparent: true, opacity: 0.42 })
  );
  anilloAzul.rotation.set(Math.PI / 1.75, -0.5, 0.4);
  mundo.add(anilloAzul);

  // ---------------------------------------------------------------
  // 4. Interacción y bucle
  // ---------------------------------------------------------------
  let objetivoX = 0;
  let objetivoY = 0;
  let actualX = 0;
  let actualY = 0;
  let baseX = 0; // desplazamiento horizontal de la composición, lo fija redimensionar()

  const alMover = (e: PointerEvent) => {
    objetivoX = (e.clientX / window.innerWidth - 0.5) * 0.4;
    objetivoY = (e.clientY / window.innerHeight - 0.5) * 0.3;
  };
  window.addEventListener('pointermove', alMover, { passive: true });

  const redimensionar = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;

    // Se limita a 2x: por encima no se percibe diferencia y cuesta el doble de píxeles
    const pr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h, false);

    camera.aspect = w / h;
    // En pantallas angostas se aleja la cámara para que la esfera quepa completa
    camera.position.z = w < 700 ? 9.6 : 7.4;
    camera.updateProjectionMatrix();

    // La red se desplaza a la derecha para no competir con el titular.
    // En móvil se centra y queda como textura de fondo, muy tenue.
    baseX = w >= 1180 ? 2.55 : w >= 820 ? 1.5 : 0;
    mundo.position.x = baseX;

    // aSize se interpreta en píxeles CSS a la distancia de referencia de la cámara
    matNodos.uniforms.uEscala.value = camera.position.z * pr;
  };
  redimensionar();

  const ro = new ResizeObserver(redimensionar);
  ro.observe(canvas);

  let visible = true;
  const io = new IntersectionObserver((e) => {
    visible = e[0].isIntersecting;
    if (visible) bucle();
  });
  io.observe(canvas);

  const alCambiarVisibilidad = () => {
    if (document.hidden) {
      visible = false;
    } else {
      visible = true;
      reloj = performance.now();
      bucle();
    }
  };
  document.addEventListener('visibilitychange', alCambiarVisibilidad);

  let raf = 0;
  let tiempo = 0;
  let reloj = performance.now();

  function bucle() {
    cancelAnimationFrame(raf);
    if (!visible) return;

    raf = requestAnimationFrame(bucle);

    const ahora = performance.now();
    const dt = Math.min((ahora - reloj) / 1000, 0.05);
    reloj = ahora;
    tiempo += dt;

    matNodos.uniforms.uTime.value = tiempo;

    mundo.rotation.y += dt * 0.075;
    anilloDorado.rotation.z += dt * 0.11;
    anilloAzul.rotation.z -= dt * 0.07;

    // Parallax suavizado sobre la composición, no sobre la cámara:
    // así el encuadre no se descuadra al mover el puntero.
    actualX += (objetivoX - actualX) * 0.045;
    actualY += (objetivoY - actualY) * 0.045;
    mundo.rotation.x = actualY * 0.85;
    mundo.position.x = baseX - actualX * 0.6;
    mundo.position.y = -actualY * 0.4;

    renderer.render(scene, camera);
  }

  bucle();
  canvas.classList.add('is-ready');

  return {
    destruir() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', alMover);
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      ro.disconnect();
      io.disconnect();
      geoNodos.dispose();
      geoEnlaces.dispose();
      matNodos.dispose();
      scene.traverse((o) => {
        if (o instanceof Mesh) {
          o.geometry.dispose();
          (o.material as MeshBasicMaterial).dispose();
        }
      });
      renderer.dispose();
    },
  };
}
