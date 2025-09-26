export const KUN_GALGAME_TAG_TYPE = ['content', 'technical', 'sexual'] as const

export type KunGalgameTagCategory = (typeof KUN_GALGAME_TAG_TYPE)[number]

export const KUN_GALGAME_TAG_CATEGORY_MAP: Record<
  KunGalgameTagCategory,
  string
> = {
  content: '游戏内容',
  sexual: '成人内容',
  technical: '技术细节'
}

export const KUN_GALGAME_TAG_SPOILER_TYPE = [0, 1, 2] as const

export type KunGalgameTagSpoiler = (typeof KUN_GALGAME_TAG_SPOILER_TYPE)[number]

export const KUN_GALGAME_TAG_SPOILER_MAP: Record<KunGalgameTagSpoiler, string> =
  {
    0: '无剧透',
    1: '轻微剧透',
    2: '严重剧透'
  }
