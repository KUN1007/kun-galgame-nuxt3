import { render, h } from 'vue'
import KunClipper from '~/components/kun/Clipper.vue'

export const useKunClip = (imageUrl: string, isShowClipper: boolean) => {
  const messageNode = h(KunClipper, {
    imageUrl,
    isShowClipper,
    onClose: () => {}
  })

  render(messageNode, document.body)
}
