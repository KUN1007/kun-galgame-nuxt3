export const checkBufferSize = (buffer: Buffer, maxSizeInMegabyte: number) => {
  const maxSizeInBytes = maxSizeInMegabyte * 1024 * 1024
  return buffer.length <= maxSizeInBytes
}
