const request = require("supertest")
const { MongoClient } = require("mongodb")
const app = require("../../app")

require("../mongodb_helper")

let mongoClient

beforeAll(async () => {
  mongoClient = new MongoClient(process.env.MONGODB_URL)
  await mongoClient.connect()
})

afterAll(async () => {
  await mongoClient.close()
})

beforeEach(async () => {
  // wipe better-auth's collections
  const db = mongoClient.db()
  await db.collection("user").deleteMany({})
  await db.collection("session").deleteMany({})
  await db.collection("account").deleteMany({})
})

describe("Auth integration", () => {
  test("a user can sign up, log in, and use their session", async () => {
    // sign up
    const signupRes = await request(app)
      .post("/api/auth/sign-up/email")
      .send({
        email: "integration@test.com",
        password: "password123",
        name: "Integration Test"
      })

    expect(signupRes.status).toBe(200)

    // log in
    const loginRes = await request(app)
      .post("/api/auth/sign-in/email")
      .send({
        email: "integration@test.com",
        password: "password123"
      })

    expect(loginRes.status).toBe(200)
    const cookie = loginRes.headers["set-cookie"]
    expect(cookie).toBeDefined()

    // session check using the cookie
    const sessionRes = await request(app)
      .get("/api/auth/get-session")
      .set("Cookie", cookie)

    expect(sessionRes.body.user.email).toBe("integration@test.com")
  })
})