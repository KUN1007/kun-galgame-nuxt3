export const KUN_GALGAME_TAG_TYPE = ['content', 'sexual', 'technical'] as const

export type KunGalgameTagCategory = (typeof KUN_GALGAME_TAG_TYPE)[number]

export const KUN_GALGAME_TAG_CATEGORY_MAP: Record<
  KunGalgameTagCategory,
  string
> = {
  content: '游戏内容',
  sexual: '成人内容',
  technical: '技术细节'
}
