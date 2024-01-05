import { saveImage, getImage } from './useLocalforage'
import type { Pinia } from '@pinia/nuxt/dist/runtime/composables'

export default {
  asyncData($pinia: Pinia) {
    const { showKUNGalgameBackground, showKUNGalgameCustomBackground } =
      storeToRefs(useKUNGalgameSettingsStore($pinia))

    const fetchGetBackground = async (imageName: string): Promise<Blob> => {
      const baseUrl = import.meta.env.VITE_API_UPLOADS_URL
      const url = `/image/bg/${imageName}.webp`
      const fullUrl = `${baseUrl}${url}`
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useKUNGalgameUserStore().getToken()}`,
        },
      })
      return await response.blob()
    }

    const getBackgroundURL = async (imageName: string) => {
      const backgroundImageBlobData = await getImage(imageName)

      if (backgroundImageBlobData) {
        return URL.createObjectURL(backgroundImageBlobData)
      } else {
        const imageBlob = await fetchGetBackground(`${imageName}`)
        await saveImage(imageBlob, imageName)

        return URL.createObjectURL(imageBlob)
      }
    }

    const getCurrentBackground = async () => {
      if (
        showKUNGalgameBackground.value === 'bg0' ||
        showKUNGalgameBackground.value === 'none'
      ) {
        return 'none'
      }

      if (showKUNGalgameBackground.value === 'bg1007') {
        return `${showKUNGalgameCustomBackground.value}`
      }

      const url = await getBackgroundURL(showKUNGalgameBackground.value)
      return url
    }

    const restoreBackground = () => {
      showKUNGalgameBackground.value = 'bg0'
    }

    return { getBackgroundURL, getCurrentBackground, restoreBackground }
  },
}
