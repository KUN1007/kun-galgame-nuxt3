import type { Uploader } from '@milkdown/plugin-upload'
import type { Node } from '@milkdown/prose/model'

export const uploader: Uploader = async (files, schema) => {
  const images: File[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)
    if (!file) {
      continue
    }

    // You can handle whatever the file type you want, we handle image here.
    if (!file.type.includes('image')) {
      continue
    }

    images.push(file)
  }

  const nodes: Node[] = await Promise.all(
    images.map(async (image) => {
      // const src = await YourUploadAPI(image)
      const src = 'TODO:'
      const alt = image.name
      return schema.nodes.image.createAndFill({
        src,
        alt,
      }) as Node
    })
  )

  return nodes
}
