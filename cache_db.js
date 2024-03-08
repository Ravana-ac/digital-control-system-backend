import redis from 'redis'

const client = redis.createClient({
  url: 'redis://149.28.148.239:6379',
})

client.on('error', (err) => console.log('Redis Client Error', err))
await client.connect()

export const setValue = async (key, value) => {
  await client.lPush(key, JSON.stringify(value))
  await client.expire(key, 20)
}

export const getValue = async (key) => {
  const element = await client.rPop(key)
  return JSON.parse(element)
}
