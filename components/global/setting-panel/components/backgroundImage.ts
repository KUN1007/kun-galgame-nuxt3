interface Background {
  index: number
  message: BackgroundDetail
}

interface BackgroundDetail {
  en: string
  zh: string
}

export const backgroundImages: Background[] = [
  {
    index: 1,
    message: {
      en: 'Akai Hitomi ni Utsuru Sekai 紅い瞳に映るセカイ',
      zh: '紅い瞳に映るセカイ 红瞳映入的世界',
    },
  },
  {
    index: 2,
    message: {
      en: 'Shugaten! しゅがてん！',
      zh: 'しゅがてん！ 糖调',
    },
  },
  {
    index: 3,
    message: {
      en: 'Amayui Castle Meister 天結いキャッスルマイスター',
      zh: '天結いキャッスルマイスター 天结神缘',
    },
  },
  {
    index: 4,
    message: {
      en: 'Pieces Wataridori no Somnium 渡り鳥のソムニウム',
      zh: '渡り鳥のソムニウム 渡鸟的梦',
    },
  },
  {
    index: 5,
    message: {
      en: 'Karenai Sekai to Owaru Hana 枯れない世界と終わる花',
      zh: '枯れない世界と終わる花 不败世界与终焉之花',
    },
  },
  {
    index: 6,
    message: {
      en: 'NEKOPARA ネコぱら',
      zh: 'ネコぱら 猫娘乐园',
    },
  },
  {
    index: 7,
    message: {
      en: 'Sakura no Uta サクラノ詩',
      zh: 'サクラノ詩 樱之诗',
    },
  },
  {
    index: 8,
    message: {
      en: 'Hokenshitsu no Sensei to Shabondama Chuudoku no Joshu 保健室のセンセーとシャボン玉中毒の助手',
      zh: '保健室のセンセーとシャボン玉中毒の助手 保健室的老师与肥皂泡中毒的助手',
    },
  },
  {
    index: 9,
    message: {
      en: 'Senren * Banka 千戀＊萬花',
      zh: '千戀＊萬花 千恋＊万花',
    },
  },
]
