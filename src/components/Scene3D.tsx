import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

// Helper: create crisp high-DPI canvas for node billboard labels
function createNodeLabelCanvas(title: string, subtitle: string, tag: string, isDark: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = 384
  canvas.height = 144
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // Card background
  ctx.fillStyle = isDark ? 'rgba(7, 13, 26, 0.92)' : 'rgba(255, 255, 255, 0.96)'
  ctx.beginPath()
  ctx.roundRect(4, 4, 376, 136, 14)
  ctx.fill()

  // Border glow
  ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.55)' : 'rgba(2, 132, 199, 0.50)'
  ctx.lineWidth = 2.5
  ctx.stroke()

  // Status indicator dot
  ctx.beginPath()
  ctx.arc(24, 28, 5, 0, Math.PI * 2)
  ctx.fillStyle = isDark ? '#22c55e' : '#16a34a'
  ctx.fill()

  // Architecture Tier Tag
  ctx.font = 'bold 12px ui-monospace, monospace'
  ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7'
  ctx.fillText(tag.toUpperCase(), 38, 32)

  // Component Name
  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif'
  ctx.fillStyle = isDark ? '#ffffff' : '#0f172a'
  ctx.fillText(title, 20, 72)

  // Tech / Subtitle
  ctx.font = '500 13px ui-monospace, monospace'
  ctx.fillStyle = isDark ? '#94a3b8' : '#475569'
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

  ctx.fillStyle = isDark ? 'rgba(8, 14, 28, 0.94)' : 'rgba(255, 255, 255, 0.97)'
  ctx.beginPath()
  ctx.roundRect(4, 4, 452, 182, 16)
  ctx.fill()

  ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.6)' : 'rgba(2, 132, 199, 0.55)'
  ctx.lineWidth = 2.5
  ctx.stroke()

  // Header band
  ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.1)' : 'rgba(2, 132, 199, 0.08)'
  ctx.beginPath()
  ctx.roundRect(4, 4, 452, 38, [16, 16, 0, 0])
  ctx.fill()

  ctx.font = 'bold 12px ui-monospace, monospace'
  ctx.fillStyle = isDark ? '#00f0ff' : '#0284c7'
  ctx.fillText('⚡ LIVE SYSTEM DESIGN SIMULATION', 18, 26)

  // Metric Rows
  const items = [
    { label: 'System Topology', val: 'Distributed Microservices' },
    { label: 'Throughput', val: '2,840 req/sec • Round-Robin' },
    { label: 'Cache Hit Rate', val: '96.4% (Redis In-Memory)' },
    { label: 'P99 Latency', val: '11ms (Cluster RPC)' },
  ]

  items.forEach((item, idx) => {
    const y = 68 + idx * 28
    ctx.font = '500 12.5px ui-monospace, monospace'
    ctx.fillStyle = isDark ? '#94a3b8' : '#475569'
    ctx.fillText(item.label + ':', 18, y)

    ctx.font = 'bold 12.5px ui-monospace, monospace'
    ctx.fillStyle = isDark ? '#f1f5f9' : '#0f172a'
    ctx.fillText(item.val, 175, y)
  })

  return canvas
}

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDarkInitial = theme === 'dark'

  const themeUpdateRef = useRef<((nowDark: boolean) => void) | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    const isDark = isDarkInitial

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

    // Master container group with floating isometric perspective
    // (Notice: NO GridHelper floor / surface plane)
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

    // ========================================================
    // 2. ARCHITECTURE NODES DEFINITION
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

    // Category Material Registry for Theme Updates
    const themedMats = {
      dbWire: new THREE.MeshBasicMaterial({
        color: isDark ? 0x00f0ff : 0x0284c7,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.65 : 0.55,
      }),
      dbInner: new THREE.MeshBasicMaterial({
        color: isDark ? 0x0284c7 : 0x38bdf8,
        transparent: true,
        opacity: isDark ? 0.35 : 0.28,
      }),
      cacheWire: new THREE.MeshBasicMaterial({
        color: isDark ? 0x10b981 : 0x059669,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.75 : 0.6,
      }),
      cacheCore: new THREE.MeshBasicMaterial({
        color: isDark ? 0x34d399 : 0x10b981,
        transparent: true,
        opacity: isDark ? 0.5 : 0.35,
      }),
      serverRack: new THREE.MeshBasicMaterial({
        color: isDark ? 0x00f0ff : 0x0284c7,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.65 : 0.5,
      }),
      aiRack: new THREE.MeshBasicMaterial({
        color: isDark ? 0xa855f7 : 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.7 : 0.55,
      }),
      queue: new THREE.MeshBasicMaterial({
        color: isDark ? 0xf59e0b : 0xd97706,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.7 : 0.55,
      }),
      lb: new THREE.MeshBasicMaterial({
        color: isDark ? 0x38bdf8 : 0x0284c7,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.7 : 0.55,
      }),
      generalBox: new THREE.MeshBasicMaterial({
        color: isDark ? 0x00f0ff : 0x0284c7,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.6 : 0.45,
      }),
      ring: new THREE.MeshBasicMaterial({
        color: isDark ? 0x00f0ff : 0x0284c7,
        transparent: true,
        opacity: 0.5,
      }),
    }

    // Build 3D objects for nodes
    nodes.forEach((n) => {
      const nodeObj = new THREE.Group()
      nodeObj.position.copy(n.pos)

      if (n.type === 'database') {
        const dbGroup = new THREE.Group()
        for (let tier = 0; tier < 3; tier++) {
          const cylGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.7, 24)
          const cyl = new THREE.Mesh(cylGeo, themedMats.dbWire)
          cyl.position.y = tier * 0.95 - 0.95
          dbGroup.add(cyl)

          const innerGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.65, 20)
          const innerCyl = new THREE.Mesh(innerGeo, themedMats.dbInner)
          innerCyl.position.y = tier * 0.95 - 0.95
          dbGroup.add(innerCyl)
        }
        nodeObj.add(dbGroup)
      } else if (n.type === 'cache') {
        const boxGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4)
        const box = new THREE.Mesh(boxGeo, themedMats.cacheWire)
        nodeObj.add(box)

        const coreGeo = new THREE.OctahedronGeometry(1.1, 0)
        const core = new THREE.Mesh(coreGeo, themedMats.cacheCore)
        nodeObj.add(core)
      } else if (n.type === 'server' || n.type === 'ai') {
        const rackGeo = new THREE.BoxGeometry(2.6, 2.0, 1.6)
        const rack = new THREE.Mesh(rackGeo, n.type === 'ai' ? themedMats.aiRack : themedMats.serverRack)
        nodeObj.add(rack)

        const ringGeo = new THREE.TorusGeometry(1.5, 0.08, 12, 32)
        const ring = new THREE.Mesh(ringGeo, themedMats.ring)
        ring.rotation.x = Math.PI / 2
        nodeObj.add(ring)
      } else if (n.type === 'queue') {
        const qGroup = new THREE.Group()
        for (let i = 0; i < 3; i++) {
          const qGeo = new THREE.BoxGeometry(0.7, 1.5, 1.2)
          const q = new THREE.Mesh(qGeo, themedMats.queue)
          q.position.x = (i - 1) * 0.95
          qGroup.add(q)
        }
        nodeObj.add(qGroup)
      } else if (n.type === 'lb') {
        const lbGeo = new THREE.CylinderGeometry(1.6, 1.6, 1.2, 6)
        const lb = new THREE.Mesh(lbGeo, themedMats.lb)
        nodeObj.add(lb)
      } else {
        const gGeo = new THREE.BoxGeometry(2.2, 1.6, 1.4)
        const g = new THREE.Mesh(gGeo, themedMats.generalBox)
        nodeObj.add(g)
      }

      // Billboard Label Sprite
      const labelCanvas = createNodeLabelCanvas(n.title, n.sub, n.tag, isDark)
      const labelTex = new THREE.CanvasTexture(labelCanvas)
      labelTex.colorSpace = THREE.SRGBColorSpace
      const spriteMat = new THREE.SpriteMaterial({
        map: labelTex,
        transparent: true,
        opacity: isDark ? 0.94 : 0.90,
      })

      const sprite = new THREE.Sprite(spriteMat)
      sprite.position.set(0, 2.3, 0)
      sprite.scale.set(4.8, 1.8, 1)
      nodeObj.add(sprite)

      spriteList.push({ sprite, canvas: labelCanvas, n })

      archGroup.add(nodeObj)
      nodeMeshMap.set(n.id, nodeObj)
    })

    // ========================================================
    // 3. ARCHITECTURE PIPELINES / BUS NETWORK LINES
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
      opacity: isDark ? 0.4 : 0.3,
    })
    const networkLines = new THREE.LineSegments(networkGeo, networkMat)
    pipeLinesGroup.add(networkLines)

    // ========================================================
    // 4. LIVE REQUEST SIMULATION (PACKETS IN TRANSIT)
    // ========================================================
    interface FlowRoute {
      nodes: string[]
      color: number
      speed: number
      offset: number
      returnColor?: number
    }

    const flows: FlowRoute[] = [
      {
        nodes: ['client', 'lb', 'gateway', 'ums', 'redis', 'ums', 'gateway', 'lb', 'client'],
        color: isDark ? 0x00f0ff : 0x0284c7,
        returnColor: isDark ? 0x22c55e : 0x16a34a,
        speed: 0.16,
        offset: 0,
      },
      {
        nodes: ['client', 'lb', 'gateway', 'ums', 'redis', 'ums', 'gateway', 'lb', 'client'],
        color: isDark ? 0x38bdf8 : 0x0284c7,
        returnColor: isDark ? 0x22c55e : 0x16a34a,
        speed: 0.18,
        offset: 0.5,
      },
      {
        nodes: ['client', 'lb', 'gateway', 'ums', 'db', 'ums', 'gateway', 'lb', 'client'],
        color: isDark ? 0x00f0ff : 0x0284c7,
        returnColor: isDark ? 0x38bdf8 : 0x0284c7,
        speed: 0.13,
        offset: 0.25,
      },
      {
        nodes: ['client', 'lb', 'gateway', 'ums', 'db', 'ums', 'gateway', 'lb', 'client'],
        color: isDark ? 0x00f0ff : 0x0284c7,
        returnColor: isDark ? 0x38bdf8 : 0x0284c7,
        speed: 0.14,
        offset: 0.75,
      },
      {
        nodes: ['client', 'lb', 'gateway', 'ai', 'kafka', 'db'],
        color: isDark ? 0xa855f7 : 0x7c3aed,
        speed: 0.15,
        offset: 0.15,
      },
      {
        nodes: ['client', 'lb', 'gateway', 'ai', 'kafka', 'db'],
        color: isDark ? 0xc084fc : 0x9333ea,
        speed: 0.17,
        offset: 0.65,
      },
    ]

    const packetGeo = new THREE.SphereGeometry(0.32, 10, 10)
    const packetObjects: {
      mesh: THREE.Mesh
      mat: THREE.MeshBasicMaterial
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
        const pMesh = new THREE.Mesh(packetGeo, mat)
        archGroup.add(pMesh)

        packetObjects.push({
          mesh: pMesh,
          mat,
          flow,
          coords,
          totalSegments: coords.length - 1,
        })
      }
    })

    // ========================================================
    // 5. FLOATING SYSTEM TELEMETRY HUD CARD
    // ========================================================
    const telemCanvas = createTelemetryCanvas(isDark)
    const telemTex = new THREE.CanvasTexture(telemCanvas)
    telemTex.colorSpace = THREE.SRGBColorSpace
    const telemMat = new THREE.SpriteMaterial({
      map: telemTex,
      transparent: true,
      opacity: isDark ? 0.94 : 0.90,
    })

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
    // 6. BACKGROUND SUBTLE TECH PARTICLES
    // ========================================================
    const pCount = isMobile ? 100 : 250
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
      opacity: isDark ? 0.4 : 0.22,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ========================================================
    // 7. DIRECT THEME UPDATE HANDLER
    // ========================================================
    themeUpdateRef.current = (nowDark: boolean) => {
      // 1. Update Themed Materials
      themedMats.dbWire.color.setHex(nowDark ? 0x00f0ff : 0x0284c7)
      themedMats.dbWire.opacity = nowDark ? 0.65 : 0.55
      themedMats.dbInner.color.setHex(nowDark ? 0x0284c7 : 0x38bdf8)
      themedMats.dbInner.opacity = nowDark ? 0.35 : 0.28

      themedMats.cacheWire.color.setHex(nowDark ? 0x10b981 : 0x059669)
      themedMats.cacheCore.color.setHex(nowDark ? 0x34d399 : 0x10b981)

      themedMats.serverRack.color.setHex(nowDark ? 0x00f0ff : 0x0284c7)
      themedMats.aiRack.color.setHex(nowDark ? 0xa855f7 : 0x7c3aed)
      themedMats.queue.color.setHex(nowDark ? 0xf59e0b : 0xd97706)
      themedMats.lb.color.setHex(nowDark ? 0x38bdf8 : 0x0284c7)
      themedMats.generalBox.color.setHex(nowDark ? 0x00f0ff : 0x0284c7)
      themedMats.ring.color.setHex(nowDark ? 0x00f0ff : 0x0284c7)

      networkMat.color.setHex(nowDark ? 0x00f0ff : 0x0284c7)
      networkMat.opacity = nowDark ? 0.4 : 0.3

      pMat.color.setHex(nowDark ? 0x00f0ff : 0x0284c7)
      pMat.opacity = nowDark ? 0.4 : 0.22
      pMat.blending = nowDark ? THREE.AdditiveBlending : THREE.NormalBlending
      pMat.needsUpdate = true

      // 2. Update Label Sprites Textures
      spriteList.forEach(({ sprite, n }) => {
        const newCanvas = createNodeLabelCanvas(n.title, n.sub, n.tag, nowDark)
        const newTex = new THREE.CanvasTexture(newCanvas)
        newTex.colorSpace = THREE.SRGBColorSpace
        sprite.material.map?.dispose()
        sprite.material.map = newTex
        sprite.material.opacity = nowDark ? 0.94 : 0.90
        sprite.material.needsUpdate = true
      })

      // 3. Update HUD Telemetry Card Texture
      const newTelemCanvas = createTelemetryCanvas(nowDark)
      const newTelemTex = new THREE.CanvasTexture(newTelemCanvas)
      newTelemTex.colorSpace = THREE.SRGBColorSpace
      telemSprite.material.map?.dispose()
      telemSprite.material.map = newTelemTex
      telemSprite.material.opacity = nowDark ? 0.94 : 0.90
      telemSprite.material.needsUpdate = true

      // 4. Update Packet Colors
      packetObjects.forEach((p, idx) => {
        if (idx === 4 || idx === 5) {
          p.flow.color = nowDark ? 0xa855f7 : 0x7c3aed
        } else {
          p.flow.color = nowDark ? 0x00f0ff : 0x0284c7
          p.flow.returnColor = nowDark ? 0x22c55e : 0x16a34a
        }
      })
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

      // Subtle levitation on nodes
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

          if (p.flow.returnColor && progress > 0.5) {
            p.mat.color.setHex(p.flow.returnColor)
          } else {
            p.mat.color.setHex(p.flow.color)
          }
        }
      })

      // HUD subtle float
      telemSprite.position.y = (isMobile ? 12 : 12.5) + Math.sin(elapsed * 1.2) * 0.25

      // Particle slow drift
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

      networkGeo.dispose()
      networkMat.dispose()
      packetGeo.dispose()
      pGeo.dispose()
      pMat.dispose()

      Object.values(themedMats).forEach((m) => m.dispose())
      packetObjects.forEach((p) => p.mat.dispose())

      spriteList.forEach(({ sprite }) => {
        sprite.material.map?.dispose()
        sprite.material.dispose()
      })
      telemSprite.material.map?.dispose()
      telemSprite.material.dispose()

      renderer.dispose()
      themeUpdateRef.current = null
    }
  }, [isDarkInitial])

  // Synchronously update whenever theme changes in React state
  useEffect(() => {
    themeUpdateRef.current?.(theme === 'dark')
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  )
}
