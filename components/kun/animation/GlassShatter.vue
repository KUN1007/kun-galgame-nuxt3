<!-- <template>
  <div class="relative inline-block" ref="containerRef">
    <div
      class="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden"
      ref="shardsContainerRef"
    ></div>

    <div
      :class="cn('inline-block', isShattered ? 'invisible' : 'visible')"
      ref="slotWrapperRef"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

type Vertex = [number, number]
interface Shard {
  element: HTMLDivElement
  centroid: { x: number; y: number }
}

const containerRef = ref<HTMLDivElement | null>(null)
const slotWrapperRef = ref<HTMLDivElement | null>(null)
const shardsContainerRef = ref<HTMLDivElement | null>(null)

const isShattered = ref(false)
const isInitialized = ref(false)
const isAnimating = ref(false)
const shards = ref<Shard[]>([])
const vertices = ref<Vertex[]>([])
const { triangles: trianglesIndices } = useTriangulate(vertices)

const SHATTER_CONFIG = {
  pointsCount: 5,
  duration: 1.8,
  ease: 'expo.out',
  collapseRotation: 45,
  collapseScale: 0.2
}

const getCentroid = (
  p1: Vertex,
  p2: Vertex,
  p3: Vertex
): { x: number; y: number } => {
  return {
    x: (p1[0] + p2[0] + p3[0]) / 3,
    y: (p1[1] + p2[1] + p3[1]) / 3
  }
}

const shatter = async () => {
  if (isShattered.value || isAnimating.value) return
  isAnimating.value = true

  try {
    if (!isInitialized.value) {
      if (!slotWrapperRef.value || !shardsContainerRef.value) {
        throw new Error('Component refs are not available.')
      }
      const target = slotWrapperRef.value
      const { width, height } = target.getBoundingClientRect()
      if (width === 0 || height === 0) return

      const newVertices: Vertex[] = [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height]
      ]
      for (let i = 0; i < SHATTER_CONFIG.pointsCount; i++) {
        newVertices.push([Math.random() * width, Math.random() * height])
      }
      vertices.value = newVertices

      const fragment = document.createDocumentFragment()
      const newShards: Shard[] = []

      trianglesIndices.value.forEach((indices) => {
        const [p1, p2, p3] = indices.map((i) => vertices.value[i])
        const xMin = Math.min(p1[0], p2[0], p3[0]),
          yMin = Math.min(p1[1], p2[1], p3[1])
        const xMax = Math.max(p1[0], p2[0], p3[0]),
          yMax = Math.max(p1[1], p2[1], p3[1])
        const shardW = xMax - xMin,
          shardH = yMax - yMin

        if (shardW < 1 || shardH < 1) return

        const shardWrapper = document.createElement('div')
        const contentClone = target.cloneNode(true) as HTMLElement

        Object.assign(shardWrapper.style, {
          position: 'absolute',
          left: `${xMin}px`,
          top: `${yMin}px`,
          width: `${shardW}px`,
          height: `${shardH}px`,
          overflow: 'hidden',
          clipPath: `polygon(${p1[0] - xMin}px ${p1[1] - yMin}px, ${p2[0] - xMin}px ${p2[1] - yMin}px, ${p3[0] - xMin}px ${p3[1] - yMin}px)`
        })

        Object.assign(contentClone.style, {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(-${xMin}px, -${yMin}px)`
        })

        shardWrapper.appendChild(contentClone)
        fragment.appendChild(shardWrapper)
        newShards.push({
          element: shardWrapper,
          centroid: getCentroid(p1, p2, p3)
        })
      })

      shardsContainerRef.value.innerHTML = ''
      shardsContainerRef.value.appendChild(fragment)
      shards.value = newShards
      isInitialized.value = true
    }

    isShattered.value = true
    const { width, height } = containerRef.value!.getBoundingClientRect()

    shards.value.forEach((shard) => {
      const { x: cx, y: cy } = shard.centroid
      const targetX = width / 2 + (Math.random() - 0.5) * (width * 0.4)
      const targetY = height * (0.9 + Math.random() * 0.1)
      const dx = targetX - cx,
        dy = targetY - cy
      const distFromCenter = Math.sqrt(
        Math.pow(cx - width / 2, 2) + Math.pow(cy - height / 2, 2)
      )

      gsap.to(shard.element, {
        duration: SHATTER_CONFIG.duration * (0.8 + Math.random() * 0.4),
        x: dx,
        y: dy,
        rotation: (Math.random() - 0.5) * SHATTER_CONFIG.collapseRotation,
        scale: SHATTER_CONFIG.collapseScale + Math.random() * 0.1,
        opacity: 0,
        ease: SHATTER_CONFIG.ease,
        delay: (distFromCenter / width) * 0.2
      })
    })
  } catch (error) {
    console.error('Shatter effect failed:', error)
  } finally {
    gsap.delayedCall(0.1, () => {
      isAnimating.value = false
    })
  }
}

const restore = async () => {
  if (!isShattered.value || isAnimating.value || !isInitialized.value) return
  isAnimating.value = true

  await new Promise<void>((resolve) => {
    gsap.to(
      shards.value.map((s) => s.element),
      {
        duration: SHATTER_CONFIG.duration * 0.7,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        ease: 'elastic.out(1, 0.75)',
        stagger: { each: 0.005, from: 'center' },
        onComplete: () => {
          isShattered.value = false
          resolve()
        }
      }
    )
  })
  isAnimating.value = false
}

defineExpose({ shatter, restore })
</script> -->

<script setup lang="ts"></script>

<template>
  <span />
</template>

<style lang="scss" scoped></style>
