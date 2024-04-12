import GalgameLinkModel from '~/server/models/galgame-link'
import type { GalgameLink } from '~/types/api/galgame-link'

export default defineEventHandler(async (event) => {
  const gid = getRouterParam(event, 'gid')
  if (!gid) {
    return kunError(event, 10507)
  }

  const data = await GalgameLinkModel.find({ gid }).sort({ created: -1 }).lean()

  const links: GalgameLink[] = data.map((link) => ({
    gid: link.gid,
    glid: link.glid,
    uid: link.uid,
    name: link.name,
    link: link.link
  }))

  return links
})
