// Mock BEFORE any require - tells Jest to never even try to load lib/auth
jest.mock("../../lib/auth", () => ({
  auth: {
    api: {
      getSession: jest.fn() // ← this creates an empty fake function
    }
  }
}))

// Also mock better-auth/node since requireAuth imports fromNodeHeaders from it
jest.mock("better-auth/node", () => ({
  fromNodeHeaders: jest.fn((headers) => headers)
}))

const requireAuth = require("../../middleware/requireAuth")
const { auth } = require("../../lib/auth")

// ... rest of the test stays the same


describe("requireAuth middleware", () => {
    let req, res, next
    beforeEach(() => {
        // fresh fakes for each test
        req = { headers: {} }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        next = jest.fn()

        // reset the mock between tests
        auth.api.getSession.mockReset()
    })

    describe("when no session exists", () => {
        test("responds with 401", async () => {
            // "user not logged in" test
            auth.api.getSession.mockResolvedValue(null)
            await requireAuth(req, res, next)
            expect(res.status).toHaveBeenCalledWith(401)
        })

        test("does not call next", async () => {
            // "user not logged in" test
            auth.api.getSession.mockResolvedValue(null)
            await requireAuth(req, res, next)
            expect(next).not.toHaveBeenCalled()
        })
    })

    describe("when a valid session exists", () => {
        const fakeSession = {
            user: { id: "user-123", email: "test@test.com", name: "Test" },
            session: { id: "session-abc", expiresAt: new Date() }
        }

        test("calls next", async () => {
            auth.api.getSession.mockResolvedValue(fakeSession)
            await requireAuth(req, res, next)
            expect(next).toHaveBeenCalled()
        })

        test("attaches user to req", async () => {
            auth.api.getSession.mockResolvedValue(fakeSession)
            await requireAuth(req, res, next)
            expect(req.user).toEqual(fakeSession.user)
        })

        test("does not send a response", async () => {
            auth.api.getSession.mockResolvedValue(fakeSession)
            await requireAuth(req, res, next)
            expect(res.status).not.toHaveBeenCalled()
            expect(res.json).not.toHaveBeenCalled()
        })
    })
})