require('dotenv').config()
const { betterAuth } = require('better-auth')
const { mongodbAdapter } = require('better-auth/adapters/mongodb')
const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGODB_URL)
const db = client.db()

const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: ['http://localhost:5173']
})

module.exports = { auth }




// api/lib/auth.js
// const auth = betterAuth({
//   database: mongodbAdapter(db),
//   emailAndPassword: { enabled: true },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     }
//   },
//   trustedOrigins: ['http://localhost:5173']
// })