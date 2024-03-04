import { Decoration } from '@milkdown/prose/view'
import type { Uploader } from '@milkdown/plugin-upload'
import type { Node } from '@milkdown/prose/model'

export const kunUploader: Uploader = async (files, schema) => {
  const images: File[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)
    if (!file) {
      continue
    }

    if (!file.type.startsWith('image/')) {
      continue
    }

    images.push(file)
  }

  const nodes: Node[] = await Promise.all(
    images.map(async (image) => {
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await useFetch('/api/image/topic', {
        method: 'POST',
        body: formData,
        watch: false,
        ...kungalgameResponseHandler
      })

      const alt = image.name
      return schema.nodes.image.createAndFill({
        src: data.value,
        alt
      }) as Node
    })
  )

  return nodes
}

export const kunUploadWidgetFactory = (
  pos: number,
  spec: Parameters<typeof Decoration.widget>[2]
) => {
  const { $i18n } = useNuxtApp()

  const widgetDOM = document.createElement('span')
  widgetDOM.textContent = $i18n.t('edit.uploading')
  widgetDOM.style.color = 'var(--kungalgame-blue-5)'
  return Decoration.widget(pos, widgetDOM, spec)
}
