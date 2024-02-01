import type { Uploader } from '@milkdown/plugin-upload'
import type { Node } from '@milkdown/prose/model'

export const uploader: Uploader = async (files, schema) => {
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
        ...kungalgameResponseHandler,
      })

      const alt = image.name
      return schema.nodes.image.createAndFill({
        src: data.value,
        alt,
      }) as Node
    })
  )

  return nodes
}
