import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

// Helper: create high-resolution crisp canvas for node labels (always camera-facing sprites)
function createNodeLabelCanvas(title: string, subtitle: string, tag: string, isDark: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = 384
  canvas.height = 144
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // Soft glass container
  ctx.fillStyle = isDark ? 'rgba(7, 13, 26, 0.90)' : 'rgba(255, 255, 255, 0.93)'
  ctx.beginPath()
  ctx.roundRect(4, 4, 376, 136, 14)
  ctx.fill()

  // Border glow
  ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.55)' : 'rgba(2, 132, 199, 0.45)'
  ctx.lineWidth = 2.5
  ctx.stroke()

  // Live status dot
  ctx.beginPath()
  ctx.arc(24, 28, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#22c55e'
  ctx.fill()

  // Architectural Tier Tag
  ctx.font = 'bold 12px ui-monospace, monospace'
  ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7'
  ctx.fillText(tag.toUpperCase(), 38, 32)

  // Component Name
  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif'
  ctx.fillStyle = isDark ? '#ffffff' : '#0f172a'
  ctx.fillText(title, 20, 72)

  // Tech / Metric Subtitle
  ctx.font = '500 13px ui-monospace, monospace'
  ctx.fillStyle = isDark ? '#94a3b8' : '#64748b'
  ctx.fillText(subtitle, 20, 108)

  return canvas
}

// Helper: create HUD Live Metrics Telemetry card
function createTelemetryCanvas(isDark: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = 460
  canvas.height = 190
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  ctx.fillStyle = isDark ? 'rgba(8, 14, 28, 0.92)' : 'rgba(255, 255, 255, 0.95)'
  ctx.beginPath()
  ctx.roundRect(4, 4, 452, 182, 16)
  ctx.fill()

  ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.6)' : 'rgba(2, 132, 199, 0.5)'
  ctx.lineWidth = 2.5
  ctx.stroke()

  // Header
  ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.1)' : 'rgba(2, 132, 199, 0.08)'
  ctx.beginPath()
  ctx.roundRect(4, 4, 452, 38, [16, 16, 0, 0])
  ctx.fill()

  ctx.font = 'bold 12px ui-monospace, monospace'
  ctx.fillStyle = isDark ? '#00f0ff' : '#0284c7'
  ctx.fillText('⚡ LIVE SYSTEM DESIGN SIMULATION', 18, 26)

  // Metrics
  const items = [
    { label: 'System Topology', val: 'Distributed Microservices' },
    { label: 'Throughput', val: '2,840 req/sec • Round-Robin' },
    { label: 'Cache Hit Rate', val: '96.4% (Redis In-Memory)' },
    { label: 'P99 Latency', val: '11ms (Cluster RPC)' },
  ]

  items.forEach((item, idx) => {
    const y = 68 + idx * 28
    ctx.font = '500 12.5px ui-monospace, monospace'
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b'
    ctx.fillText(item.label + ':', 18, y)

    ctx.font = 'bold 12.5px ui-monospace, monospace'
    ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b'
    ctx.fillText(item.val, 175, y)
  })

  return canvas
}

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const themeUpdateRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    const isDark = document.documentElement.classList.contains('dark')

    const isMobile = width < 768 || window.matchMedia('(pointer: coarse)').matches
    const maxPixelRatio = isMobile ? 1.5 : 2.0

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(54, width / height, 0.1, 1000)
    camera.position.set(0, 5, isMobile ? 42 : 32)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio))
    container.appendChild(renderer.domElement)

    // Master container group with isometric tilt
    const archGroup = new THREE.Group()
    archGroup.rotation.x = isMobile ? 0.15 : 0.22
    archGroup.rotation.y = isMobile ? -0.1 : -0.2
    if (isMobile) {
      archGroup.scale.set(0.68, 0.68, 0.68)
      archGroup.position.set(0, 0, -5)
    } else {
      archGroup.position.set(-1, 0, -2)
    }
    scene.add(archGroup)

    // 2. Isometric Cyber Grid Floor
    const grid = new THREE.GridHelper(70, 35, isDark ? 0x00f0ff : 0x0284c7, isDark ? 0x1e293b : 0xe2e8f0)
    grid.position.y = -8.5
    const gridMat = grid.material as THREE.LineBasicMaterial
    gridMat.transparent = true
    gridMat.opacity = isDark ? 0.22 : 0.18
    archGroup.add(grid)

    // ========================================================
    // 3. ARCHITECTURE NODES DEFINITION
    // ========================================================
    const nodes = [
      {
        id: 'client',
        title: 'Web & Mobile Apps',
        sub: 'HTTPS • REST / gRPC',
        tag: 'Traffic Source',
        pos: new THREE.Vector3(-16.5, 3, 2),
        type: 'client',
      },
      {
        id: 'lb',
        title: 'Load Balancer',
        sub: 'NGINX • SSL Offload',
        tag: 'Traffic Routing',
        pos: new THREE.Vector3(-9.5, 3, 0),
        type: 'lb',
      },
      {
        id: 'gateway',
        title: 'API Gateway',
        sub: 'JWT Auth • Rate Limit',
        tag: 'Security & Auth',
        pos: new THREE.Vector3(-2.5, 3, -1),
        type: 'gateway',
      },
      {
        id: 'ums',
        title: 'UMS Core Service',
        sub: 'Spring Boot • Java 21',
        tag: 'Core Microservice',
        pos: new THREE.Vector3(5.5, 6.8, -3),
        type: 'server',
      },
      {
        id: 'ai',
        title: 'AI / CV Worker',
        sub: 'Python • YOLO • PyTorch',
        tag: 'AI Inference',
        pos: new THREE.Vector3(5.5, -0.8, 2),
        type: 'ai',
      },
      {
        id: 'redis',
        title: 'Redis Cache Cluster',
        sub: 'In-Memory • 0.8ms Read',
        tag: 'Distributed Cache',
        pos: new THREE.Vector3(14, 6.8, -4.5),
        type: 'cache',
      },
      {
        id: 'db',
        title: 'PostgreSQL Primary',
        sub: 'ACID • Read/Write Replica',
        tag: 'Persistence Tier',
        pos: new THREE.Vector3(15.5, -0.8, 1),
        type: 'database',
      },
      {
        id: 'kafka',
        title: 'Kafka Event Broker',
        sub: 'Distributed Event Log',
        tag: 'Message Queue',
        pos: new THREE.Vector3(5.5, -6.8, 0),
        type: 'queue',
      },
    ]

    const nodeMeshMap = new Map<string, THREE.Object3D>()
    const spriteList: { sprite: THREE.Sprite; canvas: HTMLCanvasElement; n: typeof nodes[0] }[] = []
    const nodeMaterials: THREE.Material[] = []

    // Build realistic 3D models for each system design component
    nodes.forEach((n) => {
      const nodeObj = new THREE.Group()
      nodeObj.position.copy(n.pos)

      if (n.type === 'database') {
        // 3D Database Cylinder with disk platter rings & glowing activity bands
        const dbGroup = new THREE.Group()
        for (let tier = 0; tier < 3; tier++) {
          const cylGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.7, 24)
          const cylMat = new THREE.MeshBasicMaterial({
            color: isDark ? 0x00f0ff : 0x0284c7,
            wireframe: true,
            transparent: true,
            opacity: isDark ? 0.65 : 0.45,
          })
          nodeMaterials.push(cylMat)
          const cyl = new THREE.Mesh(cylGeo, cylMat)
          cyl.position.y = tier * 0.95 - 0.95
          dbGroup.add(cyl)

          // Inner solid glow cylinder
          const innerGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.65, 20)
          const innerMat = new THREE.MeshBasicMaterial({
            color: isDark ? 0x0284c7 : 0x38bdf8,
            transparent: true,
            opacity: isDark ? 0.35 : 0.25,
          })
          nodeMaterials.push(innerMat)
          const innerCyl = new THREE.Mesh(innerGeo, innerMat)
          innerCyl.position.y = tier * 0.95 - 0.95
          dbGroup.add(innerCyl)
        }
        nodeObj.add(dbGroup)
      } else if (n.type === 'cache') {
        // Glowing Memory Crystal / Fast RAM Block
        const boxGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4)
        const boxMat = new THREE.MeshBasicMaterial({
          color: isDark ? 0x10b981 : 0x059669,
          wireframe: true,
          transparent: true,
          opacity: isDark ? 0.75 : 0.5,
        })
        nodeMaterials.push(boxMat)
        const box = new THREE.Mesh(boxGeo, boxMat)
        nodeObj.add(box)

        // Inner glowing core
        const coreGeo = new THREE.OctahedronGeometry(1.1, 0)
        const coreMat = new THREE.MeshBasicMaterial({
          color: isDark ? 0x34d399 : 0x10b981,
          transparent: true,
          opacity: isDark ? 0.5 : 0.3,
        })
        nodeMaterials.push(coreMat)
        const core = new THREE.Mesh(coreGeo, coreMat)
        nodeObj.add(core)
      } else if (n.type === 'server' || n.type === 'ai') {
        // Server Rack Blade Unit
        const rackGeo = new THREE.BoxGeometry(2.6, 2.0, 1.6)
        const rackMat = new THREE.MeshBasicMaterial({
          color: n.type === 'ai' ? (isDark ? 0xa855f7 : 0x7c3aed) : isDark ? 0x00f0ff : 0x0284c7,
          wireframe: true,
          transparent: true,
          opacity: isDark ? 0.65 : 0.45,
        })
        nodeMaterials.push(rackMat)
        const rack = new THREE.Mesh(rackGeo, rackMat)
        nodeObj.add(rack)

        // Status LED ring
        const ringGeo = new THREE.TorusGeometry(1.5, 0.08, 12, 32)
        const ringMat = new THREE.MeshBasicMaterial({
          color: n.type === 'ai' ? 0xa855f7 : 0x00f0ff,
          transparent: true,
          opacity: 0.5,
        })
        nodeMaterials.push(ringMat)
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.rotation.x = Math.PI / 2
        nodeObj.add(ring)
      } else if (n.type === 'queue') {
        // Kafka Queue - 3 segmented buffer blocks
        const qGroup = new THREE.Group()
        for (let i = 0; i < 3; i++) {
          const qGeo = new THREE.BoxGeometry(0.7, 1.5, 1.2)
          const qMat = new THREE.MeshBasicMaterial({
            color: isDark ? 0xf59e0b : 0xd97706,
            wireframe: true,
            transparent: true,
            opacity: isDark ? 0.7 : 0.5,
          })
          nodeMaterials.push(qMat)
          const q = new THREE.Mesh(qGeo, qMat)
          q.position.x = (i - 1) * 0.95
          qGroup.add(q)
        }
        nodeObj.add(qGroup)
      } else if (n.type === 'lb') {
        // Load Balancer - Hexagonal Router
        const lbGeo = new THREE.CylinderGeometry(1.6, 1.6, 1.2, 6)
        const lbMat = new THREE.MeshBasicMaterial({
          color: isDark ? 0x38bdf8 : 0x0284c7,
          wireframe: true,
          transparent: true,
          opacity: isDark ? 0.7 : 0.5,
        })
        nodeMaterials.push(lbMat)
        const lb = new THREE.Mesh(lbGeo, lbMat)
        nodeObj.add(lb)
      } else {
        // Client & Gateway - Sleek tech nodes
        const gGeo = new THREE.BoxGeometry(2.2, 1.6, 1.4)
        const gMat = new THREE.MeshBasicMaterial({
          color: isDark ? 0x00f0ff : 0x0284c7,
          wireframe: true,
          transparent: true,
          opacity: isDark ? 0.6 : 0.4,
        })
        nodeMaterials.push(gMat)
        const g = new THREE.Mesh(gGeo, gMat)
        nodeObj.add(g)
      }

      // Add Billboard Label Sprite above each node
      const labelCanvas = createNodeLabelCanvas(n.title, n.sub, n.tag, isDark)
      const labelTex = new THREE.CanvasTexture(labelCanvas)
      labelTex.colorSpace = THREE.SRGBColorSpace
      const spriteMat = new THREE.SpriteMaterial({
        map: labelTex,
        transparent: true,
        opacity: isDark ? 0.92 : 0.88,
      })
      nodeMaterials.push(spriteMat)

      const sprite = new THREE.Sprite(spriteMat)
      sprite.position.set(0, 2.3, 0)
      sprite.scale.set(4.8, 1.8, 1)
      nodeObj.add(sprite)

      spriteList.push({ sprite, canvas: labelCanvas, n })

      archGroup.add(nodeObj)
      nodeMeshMap.set(n.id, nodeObj)
    })

    // ========================================================
    // 4. ARCHITECTURE PIPELINES / BUS NETWORK LINES
    // ========================================================
    const connections: [string, string][] = [
      ['client', 'lb'],
      ['lb', 'gateway'],
      ['gateway', 'ums'],
      ['gateway', 'ai'],
      ['ums', 'redis'],
      ['ums', 'db'],
      ['ai', 'kafka'],
      ['kafka', 'db'],
    ]

    const pipeLinesGroup = new THREE.Group()
    archGroup.add(pipeLinesGroup)

    const linePoints: THREE.Vector3[] = []
    connections.forEach(([fromId, toId]) => {
      const fromPos = nodeMeshMap.get(fromId)?.position
      const toPos = nodeMeshMap.get(toId)?.position
      if (fromPos && toPos) {
        linePoints.push(fromPos, toPos)
      }
    })

    const networkGeo = new THREE.BufferGeometry().setFromPoints(linePoints)
    const networkMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.35 : 0.22,
    })
    const networkLines = new THREE.LineSegments(networkGeo, networkMat)
    pipeLinesGroup.add(networkLines)

    // ========================================================
    // 5. LIVE REQUEST SIMULATION (PACKETS IN TRANSIT)
    // ========================================================
    // Defined request simulation flows
    interface FlowRoute {
      nodes: string[]
      color: number
      speed: number
      offset: number
      returnColor?: number
    }

    const flows: FlowRoute[] = [
      // Flow 1: Web request with Cache HIT (Fast return, turns emerald green)
      {
        nodes: ['client', 'lb', 'gateway', 'ums', 'redis', 'ums', 'gateway', 'lb', 'client'],
        color: 0x00f0ff, // Neon cyan going in
        returnColor: 0x22c55e, // Bright green on cache hit
        speed: 0.16,
        offset: 0,
      },
      // Flow 2: Mobile request with Cache HIT
      {
        nodes: ['client', 'lb', 'gateway', 'ums', 'redis', 'ums', 'gateway', 'lb', 'client'],
        color: 0x38bdf8,
        returnColor: 0x22c55e,
        speed: 0.18,
        offset: 0.5,
      },
      // Flow 3: Complex Read/Write hitting PostgreSQL DB
      {
        nodes: ['client', 'lb', 'gateway', 'ums', 'db', 'ums', 'gateway', 'lb', 'client'],
        color: 0x00f0ff,
        returnColor: 0x38bdf8,
        speed: 0.13,
        offset: 0.25,
      },
      // Flow 4: Second DB Transaction
      {
        nodes: ['client', 'lb', 'gateway', 'ums', 'db', 'ums', 'gateway', 'lb', 'client'],
        color: 0x00f0ff,
        returnColor: 0x38bdf8,
        speed: 0.14,
        offset: 0.75,
      },
      // Flow 5: AI Computer Vision Inference & Kafka Queueing
      {
        nodes: ['client', 'lb', 'gateway', 'ai', 'kafka', 'db'],
        color: 0xa855f7, // Cyber purple
        speed: 0.15,
        offset: 0.15,
      },
      // Flow 6: Second AI Stream
      {
        nodes: ['client', 'lb', 'gateway', 'ai', 'kafka', 'db'],
        color: 0xc084fc,
        speed: 0.17,
        offset: 0.65,
      },
    ]

    // Create moving packet meshes
    const packetGeo = new THREE.SphereGeometry(0.32, 10, 10)
    const packetObjects: {
      mesh: THREE.Mesh
      flow: FlowRoute
      coords: THREE.Vector3[]
      totalSegments: number
    }[] = []

    flows.forEach((flow) => {
      const coords = flow.nodes
        .map((id) => nodeMeshMap.get(id)?.position)
        .filter((pos): pos is THREE.Vector3 => Boolean(pos))

      if (coords.length > 1) {
        const mat = new THREE.MeshBasicMaterial({
          color: flow.color,
          transparent: true,
          opacity: 0.95,
        })
        nodeMaterials.push(mat)
        const pMesh = new THREE.Mesh(packetGeo, mat)
        archGroup.add(pMesh)

        packetObjects.push({
          mesh: pMesh,
          flow,
          coords,
          totalSegments: coords.length - 1,
        })
      }
    })

    // ========================================================
    // 6. FLOATING SYSTEM TELEMETRY HUD CARD
    // ========================================================
    const telemCanvas = createTelemetryCanvas(isDark)
    const telemTex = new THREE.CanvasTexture(telemCanvas)
    telemTex.colorSpace = THREE.SRGBColorSpace
    const telemMat = new THREE.SpriteMaterial({
      map: telemTex,
      transparent: true,
      opacity: isDark ? 0.94 : 0.88,
    })
    nodeMaterials.push(telemMat)

    const telemSprite = new THREE.Sprite(telemMat)
    if (isMobile) {
      telemSprite.position.set(0, 12, -8)
      telemSprite.scale.set(8.5, 3.5, 1)
    } else {
      telemSprite.position.set(13.5, 12.5, -4)
      telemSprite.scale.set(7.5, 3.1, 1)
    }
    archGroup.add(telemSprite)

    // ========================================================
    // 7. BACKGROUND DUST PARTICLES
    // ========================================================
    const pCount = isMobile ? 120 : 320
    const pGeo = new THREE.BufferGeometry()
    const pPositions = new Float32Array(pCount * 3)

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3
      pPositions[i3] = (Math.random() - 0.5) * 80
      pPositions[i3 + 1] = (Math.random() - 0.5) * 60
      pPositions[i3 + 2] = (Math.random() - 0.5) * 50
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))

    const pMat = new THREE.PointsMaterial({
      size: 0.55,
      color: isDark ? 0x00f0ff : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.4 : 0.25,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    })
    nodeMaterials.push(pMat)
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Theme update handler
    themeUpdateRef.current = () => {
      const nowDark = document.documentElement.classList.contains('dark')

      // Update grid
      gridMat.color.setHex(nowDark ? 0x00f0ff : 0x0284c7)
      gridMat.opacity = nowDark ? 0.22 : 0.18

      // Update sprite textures
      spriteList.forEach(({ sprite, n }) => {
        const newC = createNodeLabelCanvas(n.title, n.sub, n.tag, nowDark)
        const tex = new THREE.CanvasTexture(newC)
        tex.colorSpace = THREE.SRGBColorSpace
        sprite.material.map?.dispose()
        sprite.material.map = tex
        sprite.material.needsUpdate = true
      })

      // Update HUD telemetry
      const newTelem = createTelemetryCanvas(nowDark)
      const tTex = new THREE.CanvasTexture(newTelem)
      tTex.colorSpace = THREE.SRGBColorSpace
      telemSprite.material.map?.dispose()
      telemSprite.material.map = tTex
      telemSprite.material.needsUpdate = true

      networkMat.color.setHex(nowDark ? 0x00f0ff : 0x0284c7)
      pMat.color.setHex(nowDark ? 0x00f0ff : 0x0284c7)
    }

    // Mouse movement with smooth damping
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onMouseMove = (e: MouseEvent) => {
      const halfX = window.innerWidth / 2
      const halfY = window.innerHeight / 2
      mouseX = (e.clientX - halfX) / 100
      mouseY = (e.clientY - halfY) / 100
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let scrollY = 0
    const onScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const onResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Smooth mouse parallax
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      archGroup.rotation.y = (isMobile ? -0.1 : -0.2) + targetX * 0.12 + Math.sin(elapsed * 0.3) * 0.015
      archGroup.rotation.x = (isMobile ? 0.15 : 0.22) - targetY * 0.1
      archGroup.position.y = scrollY * 0.012

      // Gentle floating levitation on nodes
      nodes.forEach((n, idx) => {
        const obj = nodeMeshMap.get(n.id)
        if (obj) {
          obj.position.y = n.pos.y + Math.sin(elapsed * 1.5 + idx * 0.8) * 0.2
        }
      })

      // Move packets along routes
      packetObjects.forEach((p) => {
        const progress = (elapsed * p.flow.speed + p.flow.offset) % 1
        const totalSegs = p.totalSegments
        const currentSeg = Math.min(Math.floor(progress * totalSegs), totalSegs - 1)
        const segT = (progress * totalSegs) - currentSeg

        const pFrom = p.coords[currentSeg]
        const pTo = p.coords[currentSeg + 1]

        if (pFrom && pTo) {
          p.mesh.position.lerpVectors(pFrom, pTo, segT)

          // Color change on return / cache hit
          const mat = p.mesh.material as THREE.MeshBasicMaterial
          if (p.flow.returnColor && progress > 0.5) {
            mat.color.setHex(p.flow.returnColor)
          } else {
            mat.color.setHex(p.flow.color)
          }
        }
      })

      // HUD subtle breathing
      telemSprite.position.y = (isMobile ? 12 : 12.5) + Math.sin(elapsed * 1.2) * 0.25

      // Particle slow rotation
      particles.rotation.y = elapsed * 0.015

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      grid.geometry.dispose()
      gridMat.dispose()
      networkGeo.dispose()
      networkMat.dispose()
      packetGeo.dispose()
      pGeo.dispose()
      pMat.dispose()

      nodeMaterials.forEach((m) => m.dispose())
      spriteList.forEach(({ sprite }) => {
        sprite.material.map?.dispose()
        sprite.material.dispose()
      })
      telemSprite.material.map?.dispose()
      telemSprite.material.dispose()

      renderer.dispose()
      themeUpdateRef.current = null
    }
  }, [])

  useEffect(() => {
    themeUpdateRef.current?.()
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  )
}
