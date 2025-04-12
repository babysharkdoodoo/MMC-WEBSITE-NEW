"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface Math3DObjectProps {
  type?: "cube" | "sphere" | "torus" | "tetrahedron" | "octahedron" | "dodecahedron" | "icosahedron"
  color?: string
  wireframe?: boolean
  autoRotate?: boolean
  size?: number
  className?: string
}

export default function Math3DObject({
  type = "cube",
  color = "hsl(var(--violet))",
  wireframe = true,
  autoRotate = true,
  size = 200,
  className = "",
}: Math3DObjectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(size, size)
    containerRef.current.appendChild(renderer.domElement)

    // Create geometry based on type
    let geometry
    switch (type) {
      case "sphere":
        geometry = new THREE.SphereGeometry(2, 32, 32)
        break
      case "torus":
        geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100)
        break
      case "tetrahedron":
        geometry = new THREE.TetrahedronGeometry(2)
        break
      case "octahedron":
        geometry = new THREE.OctahedronGeometry(2)
        break
      case "dodecahedron":
        geometry = new THREE.DodecahedronGeometry(2)
        break
      case "icosahedron":
        geometry = new THREE.IcosahedronGeometry(2)
        break
      case "cube":
      default:
        geometry = new THREE.BoxGeometry(2, 2, 2)
    }

    // Create material
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe,
    })

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (autoRotate) {
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
    }
  }, [type, color, wireframe, autoRotate, size])

  return (
    <div
      ref={containerRef}
      className={`math-3d-object flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
