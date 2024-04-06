import * as fs from 'fs'

export const fileToBuffer = (filePath: string): Promise<Buffer> => {
  return new Promise(() => fs.readFile(filePath, () => {}))
}
