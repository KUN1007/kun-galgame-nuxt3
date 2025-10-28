interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface SpoilerAnimation {
  canvas: HTMLCanvasElement
  animationFrameId: number | null
  resizeObserver: ResizeObserver
  particleSystem: ReturnType<typeof createParticleEffect>
}

const createParticleEffect = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')!
  let particles: Particle[] = []
  const particleColor = 'rgba(150, 150, 150, 0.5)'

  const createSingleParticle = (): Particle => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: Math.random() * 1.2 + 0.5
  })

  const createParticles = () => {
    particles = []
    const area = canvas.width * canvas.height
    const particleCount = Math.floor(area / 52)

    for (let i = 0; i < particleCount; i++) {
      particles.push(createSingleParticle())
    }
  }

  const update = () => {
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < -p.radius) p.x = canvas.width + p.radius
      if (p.x > canvas.width + p.radius) p.x = -p.radius
      if (p.y < -p.radius) p.y = canvas.height + p.radius
      if (p.y > canvas.height + p.radius) p.y = -p.radius
    }
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = particleColor
    ctx.beginPath()
    for (const p of particles) {
      ctx.moveTo(p.x, p.y)
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    }
    ctx.fill()
  }

  const resizeCanvas = () => {
    const parent = canvas.parentElement
    if (parent) {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      createParticles()
    }
  }

  resizeCanvas()

  return {
    update,
    draw,
    resizeCanvas,
    getParticles: (): Particle[] => particles
  }
}

export const useParticleSpoilerContent = (
  containerRef: Ref<HTMLElement | null>
) => {
  const spoilerAnimations = new Map<HTMLElement, SpoilerAnimation>()

  const setupSpoilerAnimation = (spoilerEl: HTMLElement) => {
    if (spoilerAnimations.has(spoilerEl)) return

    Array.from(spoilerEl.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const span = document.createElement('span')
        span.textContent = node.textContent
        spoilerEl.replaceChild(span, node)
      }
    })

    const canvas = document.createElement('canvas')
    canvas.classList.add('spoiler-canvas')
    spoilerEl.insertBefore(canvas, spoilerEl.firstChild)

    const particleSystem = createParticleEffect(canvas)

    const animate = () => {
      particleSystem.update()
      particleSystem.draw()
      const animationState = spoilerAnimations.get(spoilerEl)
      if (animationState) {
        animationState.animationFrameId = requestAnimationFrame(animate)
      }
    }

    const resizeObserver = new ResizeObserver(particleSystem.resizeCanvas)
    resizeObserver.observe(spoilerEl)

    spoilerAnimations.set(spoilerEl, {
      canvas,
      particleSystem,
      animationFrameId: requestAnimationFrame(animate),
      resizeObserver
    })
  }

  const destroySpoilerAnimation = (spoilerEl: HTMLElement) => {
    const animation = spoilerAnimations.get(spoilerEl)
    if (!animation) return

    if (animation.animationFrameId) {
      cancelAnimationFrame(animation.animationFrameId)
    }
    animation.resizeObserver.disconnect()
    animation.canvas.classList.add('fade-out')

    animation.canvas.addEventListener(
      'transitionend',
      () => {
        animation.canvas.remove()
        spoilerAnimations.delete(spoilerEl)
      },
      { once: true }
    )
  }

  const handleSpoilerClick = (spoilerElement: HTMLElement) => {
    spoilerElement.classList.remove('kun-spoiler-hidden')
    spoilerElement.classList.add('!text-foreground')
    destroySpoilerAnimation(spoilerElement)
  }

  const handleCopyClick = (copyButton: HTMLElement) => {
    const container = copyButton.closest('.kun-code-container')
    const pre = container?.querySelector('pre')
    if (!pre) return

    navigator.clipboard
      .writeText(pre.innerText)
      .then(() => {
        copyButton.classList.add('copied')
        setTimeout(() => copyButton.classList.remove('copied'), 3000)
      })
      .catch((err) => {
        console.error('复制失败:', err)
      })
  }

  const handleContainerClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target) return

    const spoilerElement = target.closest('.kun-spoiler.kun-spoiler-hidden')
    if (spoilerElement) {
      event.preventDefault()
      event.stopPropagation()
      handleSpoilerClick(spoilerElement as HTMLElement)
      return
    }

    const copyButton = target.closest('.copy')
    if (copyButton) {
      event.preventDefault()
      event.stopPropagation()
      handleCopyClick(copyButton as HTMLElement)
    }
  }

  const setup = () => {
    const container = containerRef.value
    if (!container) return

    container
      .querySelectorAll<HTMLElement>('.kun-spoiler.kun-spoiler-hidden')
      .forEach(setupSpoilerAnimation)
    container.addEventListener('click', handleContainerClick)
  }

  const cleanup = () => {
    const container = containerRef.value
    if (!container) return

    spoilerAnimations.forEach((_, spoilerEl) =>
      destroySpoilerAnimation(spoilerEl)
    )
    spoilerAnimations.clear()
    container.removeEventListener('click', handleContainerClick)
  }

  watch(
    containerRef,
    (newEl, oldEl) => {
      if (oldEl) {
        cleanup()
      }
      if (newEl) {
        nextTick(setup)
      }
    },
    { flush: 'post' }
  )
}
