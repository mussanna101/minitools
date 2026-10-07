import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Dark radial gradient mask: grid is strongest near the center of the screen
// and fades to solid dark at the edges, so it never competes with the text
// or category cards living near the margins.
const DARK_MASK =
  'radial-gradient(circle at 50% 35%, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.55) 45%, rgba(2, 6, 23, 0.92) 85%, rgba(0, 0, 0, 1) 100%)';

// Light-mode equivalent: same fade shape, but dissolving into the page's
// gray-50 background so the grid stays a whisper behind light content.
const LIGHT_MASK =
  'radial-gradient(circle at 50% 35%, rgba(249, 250, 251, 0.3) 0%, rgba(249, 250, 251, 0.6) 45%, rgba(249, 250, 251, 0.92) 85%, rgba(249, 250, 251, 1) 100%)';

/**
 * Background3D
 *
 * Renders a subtle, low-opacity 3D wireframe grid behind the page content.
 * Opacity stays inside 0.15-0.25 and the radial gradient mask fades the grid
 * out toward the screen edges, so it never overwhelms the text or cards.
 */
export default function Background3D() {
  const mountRef = useRef(null);
  const rafRef = useRef(null);
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );

  // Track theme toggles (the toggle button only flips the .dark class)
  useEffect(() => {
    const sync = () =>
      setDark(document.documentElement.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 320;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      // No WebGL available (headless browser, disabled GPU) — skip the
      // background entirely instead of crashing the React tree.
      console.warn('Background3D: WebGL unavailable, skipping background', e);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const GRID_SIZE = 1400;
    const GRID_SEGMENTS = 70;

    // Primary floor grid — opacity kept at 0.2 (spec: 0.15-0.25)
    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.PlaneGeometry(GRID_SIZE, GRID_SEGMENTS)),
      new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
      }),
    );
    grid.rotation.x = -Math.PI / 2.2;
    grid.position.y = -40;
    scene.add(grid);

    // Second, fainter grid for depth
    const grid2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.PlaneGeometry(GRID_SIZE, GRID_SEGMENTS)),
      new THREE.LineBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      }),
    );
    grid2.rotation.x = -Math.PI / 2.2;
    grid2.position.y = -120;
    scene.add(grid2);

    // Sparse floating particles for a little life
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * GRID_SIZE;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * GRID_SIZE;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 1.4,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      }),
    );
    scene.add(particles);

    const clock = new THREE.Clock();
    const speed = 0.04;
    const animate = () => {
      const delta = clock.getDelta();
      grid.rotation.z += speed * delta;
      grid2.rotation.z -= speed * delta * 0.6;
      particles.rotation.y += speed * delta * 0.15;
      camera.position.y = Math.sin(clock.elapsedTime * 0.05) * 15;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      scene.traverse((obj) => {
        obj.geometry?.dispose?.();
        obj.material?.dispose?.();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{ background: dark ? DARK_MASK : LIGHT_MASK }}
    />
  );
}