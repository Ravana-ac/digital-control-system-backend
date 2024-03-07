import redis from 'redis'

const client = redis.createClient({
  url: 'redis://149.28.148.239:6379',
})

client.on('error', (err) => console.log('Redis Client Error', err))

export const setValue = async (key, value) => {
  await client.connect()
  await client.lPush(key, JSON.stringify(value))
  await client.expire(key, 20)
  await client.quit()
}

export const getValue = async (key) => {
  await client.connect()
  const element = await client.rPop(key)
  await client.quit()

  return JSON.parse(element)
}
