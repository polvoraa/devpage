import mongoose from 'mongoose'

export async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('MONGO_URI nao foi configurada no .env')
  }

  await mongoose.connect(mongoUri)
}
