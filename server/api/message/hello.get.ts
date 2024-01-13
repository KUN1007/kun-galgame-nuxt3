export default defineEventHandler((event) => {
  console.log(globalThis.io)

  return {
    hello: 'world',
  }
})
