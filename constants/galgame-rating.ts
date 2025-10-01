import type { KunUIColor } from '~/components/kun/ui/type'

export const KUN_GALGAME_RATING_RECOMMEND_CONST = [
  'strong_no',
  'no',
  'neutral',
  'yes',
  'strong_yes'
] as const
export const KUN_GALGAME_RATING_RECOMMEND_MAP: Record<string, string> = {
  strong_no: '强烈不推荐',
  no: '不推荐',
  neutral: '中立',
  yes: '推荐',
  strong_yes: '强烈推荐'
}
export const KUN_GALGAME_RATING_RECOMMEND_COLOR_MAP: Record<
  string,
  KunUIColor
> = {
  strong_no: 'danger',
  no: 'default',
  neutral: 'secondary',
  yes: 'success',
  strong_yes: 'warning'
}

export const KUN_GALGAME_RATING_SPOILER_CONST = [
  'none',
  'portion',
  'serious'
] as const
export const KUN_GALGAME_RATING_SPOILER_MAP: Record<string, string> = {
  none: '本评分无剧透',
  portion: '本评分有部分剧透',
  serious: '本评分有严重剧透'
}
export const KUN_GALGAME_RATING_SPOILER_COLOR_MAP: Record<string, KunUIColor> =
  {
    none: 'success',
    portion: 'warning',
    serious: 'danger'
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
  in_progress: '正在通关',
  finished_one: '单线通关',
  finished_main: '主线通关',
  finished_all: '全线通关',
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
export const KUN_GALGAME_RATING_GAME_TYPE_DESCRIPTION_MAP: Record<
  string,
  string
> = {
  ba_saku: '以色情为主要游戏内容',
  plot: '作品是否是剧情作由你来定义',
  moe: '画风萌萌的 Galgame 即为萌作',
  daily: '作品风格偏日常恋爱系'
}

export const KUN_GALGAME_RATING_SORT_FIELD_CONST = [
  'time',
  'view',
  'overall'
] as const

export const KUN_GALGAME_DIMENSIONS = [
  'art',
  'story',
  'music',
  'character',
  'route',
  'system',
  'voice',
  'replay_value'
] as const
export type KunGalgameDim = (typeof KUN_GALGAME_DIMENSIONS)[number]

export const KUN_GALGAME_DIM_LABELS: Record<KunGalgameDim, string> = {
  art: '画面',
  story: '剧情',
  music: '音乐',
  character: '角色',
  route: '分支',
  system: '系统',
  voice: '配音',
  replay_value: '重玩'
}

export const KUN_GALGAME_DIM_DESCRIPTIONS: Record<KunGalgameDim, string[]> = {
  art: [
    '',
    '无画面, 或者画的简直不是人',
    '作画太简单, 或多处崩坏',
    '画面令人感觉突兀',
    '画面太平凡, 没有一点感觉',
    '画风一般, 中规中矩',
    '部分 CG 还是很不错的',
    '整体画面精美, 细节出色',
    '画面有美学, 部分 CG 堪称经典',
    '顶尖画师, 顶尖作画',
    '最强作画, 这游戏简直就是艺术'
  ],
  story: [
    '',
    '白开水都不如',
    '剧情很迷惑, 不知所以',
    '剧情绝大部分比较无聊',
    '剧情一小半部分比较无聊',
    '剧情一般, 中规中矩',
    '剧情合理, 有一定的情感',
    '小剧情作, 有点沉浸',
    '剧情有大惊喜',
    '剧情非常出色, 百里挑一',
    '简直就是神作, 一辈子都忘不了'
  ],
  music: [
    '',
    '没有音乐, 或者纯噪音',
    'BGM 完全不合适, 听了出戏',
    '音乐存在感极低, 记不住任何旋律',
    'BGM 非常普通, 淡而无味',
    '音乐一般, 基本能配合剧情',
    '偶尔有不错的 BGM, 气氛还行',
    '整体音乐质量很高, 氛围感强',
    '有几首 BGM/ED 特别惊艳',
    '音乐非常出色, 结束之后单独去听',
    '神级 BGM, 直接听哭了'
  ],
  character: [
    '',
    '这游戏塑造的是鸡, 不是人',
    '勉强能算是在写人',
    '很难对这个游戏的角色有印象',
    '部分角色比较无聊, 没什么特色',
    '角色设定一般, 能接受',
    '有几个角色还挺有意思',
    '大部分角色有一定魅力, 可以当老婆',
    '角色个性鲜明, 有必推的人',
    '游戏推完之后好久好久都在想她',
    '我要和她恋爱一辈子, 立马结婚生孩子'
  ],
  route: [
    '',
    '没有分支, 单线游戏',
    '所谓分支只是摆设',
    '路线设计很单调, 重复度高',
    '部分路线很敷衍',
    '路线设计中规中矩',
    '有几个人物路线设计得还不错',
    '各路线剧情都相对完整',
    '分支路线有惊喜, 体验良好',
    '路线设计非常优秀, 选项合理',
    '分支和真结局都是神级, 回味无穷'
  ],
  system: [
    '',
    '系统极其简陋, 甚至有错误',
    '界面交互非常反人类',
    '功能少得可怜, 影响游玩体验',
    '系统功能不够完善',
    '系统一般, 该有的都有',
    '系统设计比较流程',
    '系统设计丝滑, 功能比较实用',
    '系统甚至有贴心的功能设计, 提升体验',
    '系统体验极为丝滑, 各方面都很完善',
    '完美的系统设计, 体验堪比现代大作'
  ],
  voice: [
    '',
    '没有配音, 不是人配的音',
    '配音质量极差, 不完整, 影响体验',
    '配音很敷衍, 听着尴尬',
    '部分角色配音糟糕或无配音',
    '配音中规中矩, 除男主外都有配音',
    '部分角色的声优表现出色',
    '整体配音质量不错, 沉浸感强',
    '声优表现非常亮眼, 完全贴合角色',
    '顶级声优阵容, 听觉享受',
    '神级演绎, 传奇声优阵容'
  ],
  replay_value: [
    '',
    '谁玩第二次谁 **',
    '玩过一遍就腻了',
    '重复体验基本没有必要',
    '部分场景想要重玩',
    '部分人物路线想要重玩',
    '有些场景值得玩很多次',
    '重玩依旧能有乐趣',
    '二刷三刷都有新体验',
    '百玩不厌, 每次都有收获',
    '神作, 一周不看混身难受'
  ]
}
