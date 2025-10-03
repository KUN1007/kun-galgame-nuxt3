export const GALGAME_RESOURCE_TYPE_ICON_MAP: Record<string, string> = {
  game: 'lucide:box',
  patch: 'lucide:puzzle',
  collection: 'lucide:boxes',
  voice: 'lucide:music-4',
  image: 'lucide:image',
  ai: 'simple-icons:openai',
  video: 'lucide:video',
  others: 'lucide:ellipsis'
}

export const GALGAME_RESOURCE_PLATFORM_ICON_MAP: Record<string, string> = {
  windows: 'ant-design:windows-outlined',
  mac: 'iconoir:apple-mac',
  linux: 'ant-design:linux-outlined',
  emulator: 'lucide:terminal',
  app: 'lucide:smartphone',
  others: 'lucide:ellipsis'
}

export const GALGAME_RESOURCE_PROVIDER_MAP: Record<string, string> = {
  magnet: '磁力下载',
  'baidu.com': '百度网盘',
  'quark.cn': '夸克网盘',
  'alipan.com': '阿里云盘',
  '123912.com': '123 云盘',
  '123865.com': '123 云盘',
  '123pan.com': '123 云盘',
  '123pan.cn': '123 云盘',
  'xunlei.com': '迅雷云盘',
  'weiyun.com': '腾讯微云',
  '139.com': '和彩云 (移动云盘)',
  '189.cn': '天翼云盘',
  'uc.cn': 'UC 网盘',
  lanzou: '蓝奏云',
  'ctfile.com': '城通网盘',
  'nullcloud.top': '未知云盘',
  'mypikpak.com': 'PikPak',
  'sharepoint.com': 'OneDrive',
  'sharepoint.cn': 'OneDrive',
  '1drv.ms': 'OneDrive',
  'mega.nz': 'MEGA',
  'google.com': 'Google 云破案',
  'yandex.com': 'Yandex Disk',
  'gofile.io': 'GoFile',
  'ipfs.dweb.link': 'IPFS',
  'steampowered.com': 'Steam',
  'epicgames.com': 'Epic 游戏商店',
  'itch.io': 'itch.io',
  'github.com': 'GitHub',
  'bilibili.com': '哔哩哔哩',
  'tieba.baidu.com': '百度贴吧',
  't.me': 'Telegram',
  'archive.org': 'Internet Archive',
  'nyaa.si': 'Nyaa',
  '2dfan.com': '2BFun',
  'ddfan.org': '2BFun',
  'ddfan.top': '2BFun',
  'galge.top': '2BFun',
  'hacg.uno': '琉璃神社 (HACG)',
  'kungal.com': '鲲 Galgame 论坛',
  'moyu.moe': '鲲 Galgame 补丁',
  'anime-sharing.com': 'Anime-Sharing',
  'e-hentai.org': 'E-Hentai',
  'dmm.co.jp': 'DMM',
  'zi6.cc': '梓澪',
  'zi0.cc': '梓澪',
  'zi8.cc': '梓澪',
  'shinnku.com': '真红小站',
  'shinnku.org': '真红小站',
  'oo0o.ooo': '真红小站',
  'touchgal.io': 'TouchGal',
  'touchgal.us': 'TouchGal',
  'dlgal.com': 'GGbases'
}

export type ProviderKey =
  | 'baidu'
  | 'aliyun'
  | 'quark'
  | 'pan123'
  | 'tianyiyun'
  | 'caiyun'
  | 'xunlei'
  | 'uc'
  | 'lanzou'
  | 'other'

export const PROVIDER_PATTERNS: Record<ProviderKey, string[]> = {
  baidu: ['pan.baidu.com', 'tieba.baidu.com', 'pan.baidu.', 'baidu.com'],
  aliyun: ['alipan.com', 'aliyun', 'aliyundrive', 'aliyuncs', 'aliyunpan'],
  quark: ['pan.quark.cn', 'quark.cn', 'quark'],
  pan123: [
    '123pan',
    '123684',
    '123865',
    '123912',
    '123912.com',
    '123684.com',
    '123865.com',
    '123pan.cn',
    'vip.123pan'
  ],
  tianyiyun: ['cloud.189.cn', '189.cn', 'ecloud.189.cn'],
  caiyun: ['caiyun.139.com', 'yun.139.com', '139.com'],
  xunlei: ['pan.xunlei.com', 'xunlei.com'],
  uc: ['drive.uc.cn', 'uc.cn'],
  lanzou: [
    'lanzou.com',
    'lanzous.com',
    'lanzoux.com',
    'lanzoui.com',
    'lanzouw.com',
    'lanzouj.com',
    'lanzouu.com',
    'lanzouq.com'
  ],
  other: []
}

export const PROVIDER_KEY_OPTIONS = [
  'baidu',
  'aliyun',
  'quark',
  'pan123',
  'tianyiyun',
  'caiyun',
  'xunlei',
  'uc',
  'lanzou',
  'other'
] as const satisfies ProviderKey[]

export const KUN_GALGAME_PROVIDER_LABEL_MAP: Record<ProviderKey, string> = {
  baidu: '百度网盘',
  aliyun: '阿里云盘',
  quark: '夸克网盘',
  pan123: '123盘',
  tianyiyun: '天翼云盘',
  caiyun: '和彩云',
  xunlei: '迅雷网盘',
  uc: 'UC网盘',
  lanzou: '蓝奏云',
  other: '其他 (自建网盘等不限速)'
}
