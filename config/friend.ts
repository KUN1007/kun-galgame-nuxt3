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
export const kunFriendOther: KunFriend[] = friendsData.others as KunFriend[]

export const friendArray = [
  { key: 'official', label: '官方网站', value: kunFriendOfficial },
  { key: 'galgame', label: 'Galgame 网站', value: kunFriendGalgame },
  { key: 'others', label: '其它网站', value: kunFriendOther }
]
