/* Background test picture: 
  https://s3.bmp.ovh/imgs/2023/05/30/1ee99996d0eb2646.png
  https://s3.bmp.ovh/imgs/2023/05/30/87d94be5e004547a.png
  https://s3.bmp.ovh/imgs/2023/05/30/2a639bd15113b570.png
  https://s3.bmp.ovh/imgs/2023/05/30/b7c73a1643bdc55b.png
  https://s3.bmp.ovh/imgs/2023/05/30/ee67fdadd4104bbd.png
  https://s3.bmp.ovh/imgs/2023/05/30/30aacd3045496498.png
  https://s3.bmp.ovh/imgs/2023/05/30/ab2da01971cc1629.png
  https://s3.bmp.ovh/imgs/2023/05/30/ed196495796482e4.png
  https://s3.bmp.ovh/imgs/2023/05/30/a6dcdae0afe118f0.png
  https://s3.bmp.ovh/imgs/2023/05/30/7aa57120cc6977a1.png
  */

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
