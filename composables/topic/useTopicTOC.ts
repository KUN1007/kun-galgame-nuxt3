import { ref } from 'vue'

interface TOCItem {
  id: string
  text: string
  level: number
  type: 'heading' | 'reply'
}

export const useTopicTOC = () => {
  const headings = ref<TOCItem[]>([])
  const activeId = ref('')
  let observer: IntersectionObserver | null = null

  const refreshTOC = () => {
    if (observer) {
      observer.disconnect()
    }

    const elements = Array.from(
      document.querySelectorAll(
        '.kun-master h1, .kun-master h2, .kun-master h3, .kun-reply'
      )
    )

    headings.value = elements.map((element) => {
      if (element.matches('.kun-master h1, .kun-master h2, .kun-master h3')) {
        return {
          id: element.id,
          text: element.textContent || '',
          level: Number(element.tagName.charAt(1)),
          type: 'heading' as const
        }
      } else {
        const [floor, content] = element.id.split('.', 2)
        return {
          id: element.id,
          text: content ? `${floor}. ${content}` : floor,
          level: 2,
          type: 'reply' as const
        }
      }
    })

    observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (visibleEntry) activeId.value = visibleEntry.target.id
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    elements.forEach((element) => observer?.observe(element))
  }

  onMounted(() => {
    refreshTOC()
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    headings,
    activeId,
    refreshTOC
  }
}
