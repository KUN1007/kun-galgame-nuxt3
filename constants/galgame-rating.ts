export const KUN_GALGAME_RATING_RECOMMEND_CONST = [
  'no',
  'neutral',
  'yes'
] as const
export const KUN_GALGAME_RATING_RECOMMEND_MAP: Record<string, string> = {
  no: '不推荐',
  neutral: '中立',
  yes: '推荐'
}

export const KUN_GALGAME_RATING_SPOILER_CONST = [
  'none',
  'portion',
  'serious'
] as const
export const KUN_GALGAME_RATING_SPOILER_MAP: Record<string, string> = {
  none: '无',
  portion: '部分',
  serious: '严重'
}

export const KUN_GALGAME_RATING_PLAY_STATUS_CONST = [
  'not_started',
  'in_progress',
  'finished_one',
  'finished_main',
  'finished_all',
  'dropped'
] as const
export const KUN_GALGAME_RATING_PLAY_STATUS_MAP: Record<string, string> = {
  not_started: '未开始',
  in_progress: '进行中',
  finished_one: '通关一个结局',
  finished_main: '通关主线',
  finished_all: '全通',
  dropped: '弃坑'
}

export const KUN_GALGAME_RATING_GAME_TYPE_CONST = [
  'ba_saku',
  'plot',
  'moe',
  'daily'
] as const
export const KUN_GALGAME_RATING_GAME_TYPE_MAP: Record<string, string> = {
  ba_saku: '拔作',
  plot: '剧情作',
  moe: '萌系',
  daily: '日常系'
}

export const KUN_GALGAME_RATING_SORT_FIELD_CONST = [
  'time',
  'view',
  'overall'
] as const
