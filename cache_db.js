import redis from 'redis'

const client = redis.createClient({
  url: 'redis://149.28.148.239:6379',
})

client.on('error', (err) => console.log('Redis Client Error', err))

export const setValue = async (key, value) => {
  if (!client.isOpen) {
    await client.connect()
  }
  await client.lPush(key, JSON.stringify(value))
  await client.expire(key, 20)
}

export const getValue = async (key) => {
  if (!client.isOpen) {
    await client.connect()
  }
  const element = await client.rPop(key)
  return JSON.parse(element)
}
