import friendsData from './friend.json'

interface KunFriend {
  name: string
  banner: string
  label: string
  link: string
  status?: 'normal' | 'essential' | 'down'
}

export const kunFriendOfficial: KunFriend[] = friendsData.official
export const kunFriendGalgame: KunFriend[] = friendsData.galgame as KunFriend[]
export const kunFriendAnime: KunFriend[] = friendsData.anime as KunFriend[]
export const kunFriendOther: KunFriend[] = friendsData.others

export const friendArray = [
  { key: 'official', label: '官方网站', value: kunFriendOfficial },
  { key: 'galgame', label: 'Galgame 网站', value: kunFriendGalgame },
  { key: 'anime', label: '动漫网站', value: kunFriendAnime },
  { key: 'others', label: '其它网站', value: kunFriendOther }
]
