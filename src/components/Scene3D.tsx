import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

// Helper: draw the 3D Developer Terminal window
function createTerminalCanvas(isDark: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 320
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // Terminal background with subtle cyber glass fill
  ctx.fillStyle = isDark ? 'rgba(9, 14, 26, 0.94)' : 'rgba(255, 255, 255, 0.96)'
  ctx.beginPath()
  ctx.roundRect(0, 0, 512, 320, 16)
  ctx.fill()

  // Terminal outer border glow
  ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.55)' : 'rgba(2, 132, 199, 0.45)'
  ctx.lineWidth = 3
  ctx.stroke()

  // Header Bar
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'
  ctx.beginPath()
  ctx.roundRect(0, 0, 512, 46, [16, 16, 0, 0])
  ctx.fill()

  // Window Dots (Mac/Linux terminal traffic lights)
  const dots = ['#ff5f56', '#ffbd2e', '#27c93f']
  dots.forEach((color, i) => {
    ctx.beginPath()
    ctx.arc(26 + i * 20, 23, 6, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  })

  // Title bar text
  ctx.font = '600 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  ctx.fillStyle = isDark ? '#94a3b8' : '#64748b'
  ctx.fillText('bash — abdullah@developer-core: ~', 105, 28)

  // Monospace Terminal Output Lines
  ctx.font = '500 13.5px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  const startY = 82
  const lineHeight = 34

  const lines = [
    { text: '$ init --engineer="Md. Abdullah"', color: isDark ? '#38bdf8' : '#0284c7' },
    { text: '✔ stack: [Spring Boot, React, Python, AI]', color: isDark ? '#4ade80' : '#16a34a' },
    { text: '✔ ums_core: active on SEU cluster', color: isDark ? '#c084fc' : '#7c3aed' },
    { text: '✔ cv_vision: YOLO / ANPR pipeline loaded', color: isDark ? '#00f0ff' : '#0891b2' },
    { text: '✔ microservices: 5/5 healthy (12ms)', color: isDark ? '#94a3b8' : '#64748b' },
    { text: '$ abdullah.deploy({ ready: true })_', color: isDark ? '#facc15' : '#ca8a04' },
  ]

  lines.forEach((line, index) => {
    ctx.fillStyle = line.color
    ctx.fillText(line.text, 24, startY + index * lineHeight)
  })

  return canvas
}

// Helper: draw floating Software Engineer Tech Badges
function createBadgeCanvas(title: string, sub: string, isDark: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 110
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // Rounded glass card
  ctx.fillStyle = isDark ? 'rgba(11, 19, 38, 0.90)' : 'rgba(255, 255, 255, 0.94)'
  ctx.beginPath()
  ctx.roundRect(4, 4, 248, 102, 16)
  ctx.fill()

  // Border glow
  ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.5)' : 'rgba(2, 132, 199, 0.4)'
  ctx.lineWidth = 2.5
  ctx.stroke()

  // Primary Code Glyph / Keyword
  ctx.font = 'bold 22px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  ctx.fillStyle = isDark ? '#00f0ff' : '#0284c7'
  ctx.fillText(title, 20, 48)

  // Subtitle / Architecture Note
  ctx.font = '500 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  ctx.fillStyle = isDark ? '#94a3b8' : '#64748b'
  ctx.fillText(sub, 20, 80)

  return canvas
}

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // Ref to hold textures and materials for instant theme updates
  const sceneElementsRef = useRef<{
    terminalTexture: THREE.CanvasTexture
    badgeTextures: { texture: THREE.CanvasTexture; title: string; sub: string }[]
    particleMaterial: THREE.PointsMaterial
    cpuMat: THREE.MeshBasicMaterial
    cpuCoreMat: THREE.MeshBasicMaterial
    ringMat: THREE.MeshBasicMaterial
    nodeMats: THREE.MeshBasicMaterial[]
    lineMat: THREE.LineBasicMaterial
    packetMats: THREE.MeshBasicMaterial[]
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    const isDark = document.documentElement.classList.contains('dark')

    // Responsive detection
    const isMobile = width < 768 || window.matchMedia('(pointer: coarse)').matches
    const particleCount = isMobile ? 260 : 650
    const maxPixelRatio = isMobile ? 1.5 : 2.0

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = isMobile ? 36 : 30

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio))
    container.appendChild(renderer.domElement)

    // Master container group for mouse parallax
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // ==========================================
    // 1. FLOATING 3D DEVELOPER TERMINAL CONSOLE
    // ==========================================
    const terminalCanvas = createTerminalCanvas(isDark)
    const terminalTexture = new THREE.CanvasTexture(terminalCanvas)
    terminalTexture.colorSpace = THREE.SRGBColorSpace

    const terminalGeo = new THREE.PlaneGeometry(14.5, 9.2)
    const terminalMat = new THREE.MeshBasicMaterial({
      map: terminalTexture,
      transparent: true,
      opacity: isDark ? 0.95 : 0.92,
      side: THREE.DoubleSide,
    })
    const terminalMesh = new THREE.Mesh(terminalGeo, terminalMat)

    // Position terminal on the right side
    if (isMobile) {
      terminalMesh.position.set(0, -5, -16)
      terminalMesh.scale.set(0.68, 0.68, 0.68)
      terminalMesh.rotation.set(0.08, 0, 0)
    } else {
      terminalMesh.position.set(16.5, 1.8, -5)
      terminalMesh.rotation.set(0.08, -0.32, 0.02)
    }
    mainGroup.add(terminalMesh)

    // Outer wireframe bounding frame for terminal
    const terminalEdgesGeo = new THREE.EdgesGeometry(terminalGeo)
    const terminalEdgesMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    })
    const terminalWireframe = new THREE.LineSegments(terminalEdgesGeo, terminalEdgesMat)
    terminalMesh.add(terminalWireframe)

    // ========================================================
    // 2. MICROSERVICE / NEURAL NETWORK TOPOLOGY (LEFT SIDE)
    // ========================================================
    const networkGroup = new THREE.Group()
    if (isMobile) {
      networkGroup.position.set(0, 10, -22)
      networkGroup.scale.set(0.75, 0.75, 0.75)
    } else {
      networkGroup.position.set(-17.5, -2, -7)
    }
    mainGroup.add(networkGroup)

    // Define 6 nodes in 3D network space
    const nodeCoords: THREE.Vector3[] = [
      new THREE.Vector3(0, 0, 0),        // 0: API Gateway
      new THREE.Vector3(-3.8, 2.8, 1.5),  // 1: Auth Microservice
      new THREE.Vector3(3.6, 2.2, -1.2),  // 2: UMS Core Engine
      new THREE.Vector3(-2.8, -3.2, -1.8),// 3: AI / CV Inference
      new THREE.Vector3(3.4, -2.8, 1.6),  // 4: PostgreSQL DB Cluster
      new THREE.Vector3(0, 4.2, -2.2),    // 5: Redis Cache / Queue
    ]

    const nodeMeshes: THREE.Mesh[] = []
    const nodeMats: THREE.MeshBasicMaterial[] = []
    const nodeGeo = new THREE.OctahedronGeometry(0.9, 0)

    nodeCoords.forEach((coord, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: i === 0 ? (isDark ? 0x00f0ff : 0x0284c7) : isDark ? 0xa855f7 : 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.7 : 0.5,
      })
      nodeMats.push(mat)
      const mesh = new THREE.Mesh(nodeGeo, mat)
      mesh.position.copy(coord)
      networkGroup.add(mesh)
      nodeMeshes.push(mesh)

      // Inner glowing core
      const innerGeo = new THREE.SphereGeometry(0.35, 12, 12)
      const innerMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0x00f0ff : 0x0ea5e9,
        transparent: true,
        opacity: isDark ? 0.8 : 0.6,
      })
      const innerMesh = new THREE.Mesh(innerGeo, innerMat)
      mesh.add(innerMesh)
    })

    // Network connection links (Edges)
    const edges = [
      [0, 1], // Gateway -> Auth
      [0, 2], // Gateway -> UMS Core
      [0, 3], // Gateway -> AI
      [2, 4], // UMS Core -> DB
      [3, 4], // AI -> DB
      [2, 5], // UMS Core -> Cache
      [1, 5], // Auth -> Cache
    ]

    const linePoints: THREE.Vector3[] = []
    edges.forEach(([from, to]) => {
      linePoints.push(nodeCoords[from], nodeCoords[to])
    })

    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints)
    const lineMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.3 : 0.2,
    })
    const networkLines = new THREE.LineSegments(lineGeo, lineMat)
    networkGroup.add(networkLines)

    // Animated Live Data Packets traveling between nodes
    const packetGeo = new THREE.SphereGeometry(0.24, 8, 8)
    const packetMats: THREE.MeshBasicMaterial[] = []
    const packets = edges.map(([fromIdx, toIdx], i) => {
      const pMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? (isDark ? 0x00f0ff : 0x0284c7) : isDark ? 0x38bdf8 : 0x10b981,
        transparent: true,
        opacity: isDark ? 0.9 : 0.8,
      })
      packetMats.push(pMat)
      const pMesh = new THREE.Mesh(packetGeo, pMat)
      networkGroup.add(pMesh)
      return {
        mesh: pMesh,
        from: nodeCoords[fromIdx],
        to: nodeCoords[toIdx],
        speed: 0.4 + (i % 3) * 0.2,
        offset: i * 0.35,
      }
    })

    // ==========================================
    // 3. FLOATING 3D CODE & TECH BADGES
    // ==========================================
    const badgesData = [
      { title: '{ JSON }', sub: 'REST & gRPC APIs', pos: new THREE.Vector3(-14, 11, -10), rot: 0.12 },
      { title: '</React>', sub: 'Modern Web & UI', pos: new THREE.Vector3(14, 12, -11), rot: -0.15 },
      { title: 'async =>', sub: 'Event Loop & Node', pos: new THREE.Vector3(-18, -10, -8), rot: 0.2 },
      { title: 'git:push', sub: 'CI/CD & DevOps', pos: new THREE.Vector3(17, -9, -9), rot: -0.18 },
      { title: 'AI:YOLO', sub: 'Computer Vision', pos: new THREE.Vector3(0, 14, -14), rot: 0.05 },
    ]

    const badgeTexturesList: { texture: THREE.CanvasTexture; title: string; sub: string }[] = []
    const badgeMeshes: THREE.Mesh[] = []
    const badgeGeo = new THREE.PlaneGeometry(5.2, 2.3)

    badgesData.forEach((b) => {
      const canvas = createBadgeCanvas(b.title, b.sub, isDark)
      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      badgeTexturesList.push({ texture, title: b.title, sub: b.sub })

      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: isDark ? 0.85 : 0.8,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(badgeGeo, mat)
      mesh.position.copy(b.pos)
      mesh.rotation.y = b.rot

      if (isMobile) {
        mesh.scale.set(0.65, 0.65, 0.65)
        mesh.position.z -= 6
      }

      mainGroup.add(mesh)
      badgeMeshes.push(mesh)
    })

    // ========================================================
    // 4. FLOATING CPU / MICROPROCESSOR CHIP & ORBITAL BUS RINGS
    // ========================================================
    const cpuGroup = new THREE.Group()
    if (isMobile) {
      cpuGroup.position.set(-10, -14, -20)
      cpuGroup.scale.set(0.6, 0.6, 0.6)
    } else {
      cpuGroup.position.set(-15, 6, -12)
    }
    mainGroup.add(cpuGroup)

    // CPU Silicon Core
    const cpuGeo = new THREE.BoxGeometry(3.6, 3.6, 0.8)
    const cpuMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.22,
    })
    const cpuMesh = new THREE.Mesh(cpuGeo, cpuMat)
    cpuGroup.add(cpuMesh)

    // Inner Silicon Wafer
    const cpuCoreGeo = new THREE.BoxGeometry(2.2, 2.2, 0.6)
    const cpuCoreMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xa855f7 : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.5 : 0.3,
    })
    const cpuCore = new THREE.Mesh(cpuCoreGeo, cpuCoreMat)
    cpuGroup.add(cpuCore)

    // Orbital Ring 1
    const ring1Geo = new THREE.TorusGeometry(3.4, 0.12, 16, 50)
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.4 : 0.25,
    })
    const ring1 = new THREE.Mesh(ring1Geo, ringMat)
    ring1.rotation.x = Math.PI / 4
    cpuGroup.add(ring1)

    // Orbital Ring 2
    const ring2Geo = new THREE.TorusGeometry(4.2, 0.1, 16, 50)
    const ring2 = new THREE.Mesh(ring2Geo, ringMat)
    ring2.rotation.y = Math.PI / 3
    cpuGroup.add(ring2)

    // ==========================================
    // 5. CYBER PARTICLES & BINARY TECH DUST
    // ==========================================
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const colorCyan = new THREE.Color(isDark ? '#00f0ff' : '#0284c7')
    const colorPurple = new THREE.Color(isDark ? '#a855f7' : '#6366f1')
    const colorEmerald = new THREE.Color(isDark ? '#34d399' : '#059669')

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 85
      positions[i3 + 1] = (Math.random() - 0.5) * 85
      positions[i3 + 2] = (Math.random() - 0.5) * 65

      const rnd = Math.random()
      const c = rnd > 0.6 ? colorCyan : rnd > 0.25 ? colorPurple : colorEmerald
      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Crisp soft particle texture
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 16
    pCanvas.height = 16
    const pCtx = pCanvas.getContext('2d')
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8)
      grad.addColorStop(0, 'rgba(255,255,255,1)')
      grad.addColorStop(0.4, 'rgba(255,255,255,0.7)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      pCtx.fillStyle = grad
      pCtx.fillRect(0, 0, 16, 16)
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas)

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.75,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.45,
      map: particleTexture,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    mainGroup.add(particles)

    // Store references for dynamic theme updates
    sceneElementsRef.current = {
      terminalTexture,
      badgeTextures: badgeTexturesList,
      particleMaterial,
      cpuMat,
      cpuCoreMat,
      ringMat,
      nodeMats,
      lineMat,
      packetMats,
    }

    // ==========================================
    // 6. INTERACTIVE MOUSE PARALLAX & ANIMATION
    // ==========================================
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

    let scrollY = 0
    const onScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

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
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Smooth mouse damping
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Parallax rotation of main group
      mainGroup.rotation.y = targetX * 0.12 + Math.sin(elapsed * 0.25) * 0.02
      mainGroup.rotation.x = -targetY * 0.12
      mainGroup.position.y = scrollY * 0.015

      // 1. Terminal hover & subtle breathe
      terminalMesh.position.y = (isMobile ? -5 : 1.8) + Math.sin(elapsed * 1.2) * 0.4
      terminalMesh.rotation.y = (isMobile ? 0 : -0.32) + Math.sin(elapsed * 0.8) * 0.04

      // 2. Network nodes rotation & pulse
      nodeMeshes.forEach((mesh, idx) => {
        mesh.rotation.x = elapsed * (0.3 + idx * 0.05)
        mesh.rotation.y = elapsed * (0.4 + idx * 0.04)
      })

      // Network data packets movement along edges
      packets.forEach((p) => {
        const t = ((elapsed * p.speed + p.offset) % 1)
        p.mesh.position.lerpVectors(p.from, p.to, t)
      })

      // 3. Floating Badges sin-wave floating
      badgeMeshes.forEach((mesh, idx) => {
        mesh.position.y = badgesData[idx].pos.y + Math.sin(elapsed * 1.5 + idx * 1.2) * 0.35
        mesh.rotation.z = Math.sin(elapsed * 0.8 + idx) * 0.03
      })

      // 4. CPU Chip core rotation
      cpuMesh.rotation.y = elapsed * 0.2
      cpuMesh.rotation.x = elapsed * 0.15
      cpuCore.rotation.y = -elapsed * 0.35
      ring1.rotation.z = elapsed * 0.4
      ring2.rotation.x = -elapsed * 0.3

      // 5. Particles slow drift
      particles.rotation.y = -elapsed * 0.018

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      // Dispose geometries, materials, textures
      terminalGeo.dispose()
      terminalMat.dispose()
      terminalTexture.dispose()
      terminalEdgesGeo.dispose()
      terminalEdgesMat.dispose()

      nodeGeo.dispose()
      nodeMats.forEach((m) => m.dispose())
      lineGeo.dispose()
      lineMat.dispose()
      packetGeo.dispose()
      packetMats.forEach((m) => m.dispose())

      badgeGeo.dispose()
      badgeTexturesList.forEach((b) => b.texture.dispose())

      cpuGeo.dispose()
      cpuMat.dispose()
      cpuCoreGeo.dispose()
      cpuCoreMat.dispose()
      ring1Geo.dispose()
      ring2Geo.dispose()
      ringMat.dispose()

      particleGeometry.dispose()
      particleMaterial.dispose()
      particleTexture.dispose()

      renderer.dispose()
      sceneElementsRef.current = null
    }
  }, [])

  // React to theme changes smoothly without re-initializing WebGL context
  useEffect(() => {
    if (!sceneElementsRef.current) return
    const isDark = theme === 'dark'
    const {
      terminalTexture,
      badgeTextures,
      particleMaterial,
      cpuMat,
      cpuCoreMat,
      ringMat,
      nodeMats,
      lineMat,
      packetMats,
    } = sceneElementsRef.current

    // Update Terminal canvas texture
    const newTermCanvas = createTerminalCanvas(isDark)
    terminalTexture.image = newTermCanvas
    terminalTexture.needsUpdate = true

    // Update Badges canvas textures
    badgeTextures.forEach((b) => {
      b.texture.image = createBadgeCanvas(b.title, b.sub, isDark)
      b.texture.needsUpdate = true
    })

    // Update Particles
    particleMaterial.opacity = isDark ? 0.75 : 0.45
    particleMaterial.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending
    particleMaterial.needsUpdate = true

    // Update CPU Chip materials
    cpuMat.color.setHex(isDark ? 0x00f0ff : 0x0284c7)
    cpuMat.opacity = isDark ? 0.35 : 0.22
    cpuCoreMat.color.setHex(isDark ? 0xa855f7 : 0x7c3aed)
    cpuCoreMat.opacity = isDark ? 0.5 : 0.3
    ringMat.color.setHex(isDark ? 0x00f0ff : 0x0ea5e9)
    ringMat.opacity = isDark ? 0.4 : 0.25

    // Update Network Nodes & Lines
    nodeMats.forEach((m, idx) => {
      m.color.setHex(idx === 0 ? (isDark ? 0x00f0ff : 0x0284c7) : isDark ? 0xa855f7 : 0x6366f1)
      m.opacity = isDark ? 0.7 : 0.5
    })
    lineMat.color.setHex(isDark ? 0x00f0ff : 0x0284c7)
    lineMat.opacity = isDark ? 0.3 : 0.2

    packetMats.forEach((m, i) => {
      m.color.setHex(i % 2 === 0 ? (isDark ? 0x00f0ff : 0x0284c7) : isDark ? 0x38bdf8 : 0x10b981)
      m.opacity = isDark ? 0.9 : 0.8
    })
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  )
}
