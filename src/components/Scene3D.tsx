import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Group for mouse parallax
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // 1. Cyber Particles Constellation
    const particleCount = 750
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const color1 = new THREE.Color('#00f0ff') // Neon cyan
    const color2 = new THREE.Color('#8a2be2') // Neon purple
    const color3 = new THREE.Color('#38bdf8') // Sky blue

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 80
      positions[i3 + 1] = (Math.random() - 0.5) * 80
      positions[i3 + 2] = (Math.random() - 0.5) * 60

      const mixedColor = Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color2 : color3
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Create custom particle circle canvas texture
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 16
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
      grad.addColorStop(0, 'rgba(255,255,255,1)')
      grad.addColorStop(0.4, 'rgba(255,255,255,0.8)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 16, 16)
    }
    const particleTexture = new THREE.CanvasTexture(canvas)

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, particleMaterial)
    mainGroup.add(particles)

    // 2. Floating 3D Geometric Polyhedrons (wireframes + subtle glow)
    // Central Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(7, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    const icosahedron = new THREE.Mesh(icoGeo, icoMat)
    icosahedron.position.set(16, 2, -5)
    mainGroup.add(icosahedron)

    // Inner glowing core
    const coreGeo = new THREE.OctahedronGeometry(3.5, 0)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x8a2be2,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreMesh.position.set(16, 2, -5)
    mainGroup.add(coreMesh)

    // Secondary Torus (Floating server ring / halo)
    const torusGeo = new THREE.TorusGeometry(5, 0.4, 16, 60)
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.position.set(-18, -4, -8)
    torus.rotation.x = Math.PI / 3
    mainGroup.add(torus)

    // Third floating shape: Octahedron on top left
    const octGeo = new THREE.OctahedronGeometry(4, 0)
    const octMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const octMesh = new THREE.Mesh(octGeo, octMat)
    octMesh.position.set(-14, 12, -10)
    mainGroup.add(octMesh)

    // Interactive mouse coordinates with smooth damping
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2
      const windowHalfY = window.innerHeight / 2
      mouseX = (event.clientX - windowHalfX) / 100
      mouseY = (event.clientY - windowHalfY) / 100
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Scroll parallax effect
    let scrollY = 0
    const onScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Resize handler
    const onResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Subtle group tilt
      mainGroup.rotation.y = targetX * 0.15 + elapsedTime * 0.03
      mainGroup.rotation.x = -targetY * 0.15

      // Geometries rotation & float
      icosahedron.rotation.x = elapsedTime * 0.2
      icosahedron.rotation.y = elapsedTime * 0.25
      coreMesh.rotation.x = -elapsedTime * 0.3
      coreMesh.rotation.z = elapsedTime * 0.2

      torus.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.2
      torus.rotation.y = elapsedTime * 0.15

      octMesh.rotation.y = elapsedTime * 0.3
      octMesh.rotation.z = elapsedTime * 0.15

      // Parallax with page scroll
      mainGroup.position.y = (scrollY * 0.015)

      // Slow particle drift
      particles.rotation.y = -elapsedTime * 0.02

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      geometry.dispose()
      particleMaterial.dispose()
      particleTexture.dispose()
      icoGeo.dispose()
      icoMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      torusGeo.dispose()
      torusMat.dispose()
      octGeo.dispose()
      octMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  )
}
