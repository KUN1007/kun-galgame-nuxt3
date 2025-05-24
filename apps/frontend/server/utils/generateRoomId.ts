export const generateRoomId = (uid1: number, uid2: number): string => {
  const sortedUids = [uid1, uid2].sort((a, b) => a - b)
  return `${sortedUids[0]}-${sortedUids[1]}`
}
