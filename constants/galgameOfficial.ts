export const KUN_GALGAME_OFFICIAL_TYPE = [
  'company',
  'individual',
  'amateur'
] as const

export type KunGalgameOfficialCategory =
  (typeof KUN_GALGAME_OFFICIAL_TYPE)[number]

export const KUN_GALGAME_OFFICIAL_CATEGORY_MAP: Record<
  KunGalgameOfficialCategory,
  string
> = {
  company: '公司',
  individual: '个人',
  amateur: '业余'
}

// /migrate/getAllOfficialLanguage.js
export const KUN_GALGAME_OFFICIAL_LANGUAGE_MAP: Record<string, string> = {
  ja: '日语',
  zh: '中文',
  en: '英语',
  id: '印度尼西亚语',
  ko: '韩语',
  ru: '俄语',
  es: '西班牙语'
}
