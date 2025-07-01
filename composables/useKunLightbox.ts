interface ImageItem {
  src: string
  alt?: string
}

export const useKunLightbox = () => {
  const images = ref<ImageItem[]>([])
  const isLightboxOpen = ref(false)
  const currentImageIndex = ref(0)

  const initializeLightbox = () => {
    const lazyImages = document.querySelectorAll('img[data-kun-lazy-image]')
    images.value = Array.from(lazyImages).map((img) => ({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || ''
    }))

    lazyImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentImageIndex.value = index
        isLightboxOpen.value = true
      })
    })
  }

  onMounted(() => {
    initializeLightbox()
  })

  return {
    images,
    isLightboxOpen,
    currentImageIndex,
    initializeLightbox
  }
}
