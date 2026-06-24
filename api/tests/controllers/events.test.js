jest.mock("../../models/event");

const Event = require("../../models/event");
const { getEvents } = require("../../controllers/events");
const fakeEvents = [
    {
        _id: "event-id-1",
        name: "Coldplay Live",
        artist: "Coldplay",
        city: "Manchester",
        date: new Date("2026-08-01"),
        genre: "Britpop",
    },
    {
        _id: "event-id-2",
        name: "The Cure Live",
        artist: "The Cure",
        city: "London",
        date: new Date("2026-10-01"),
        genre: "Rock",
    },
];    

function makeReqRes(query = {}, params = {}) {
    const req = { query, params };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    return { req, res };
}

//1. without filter - start again from here
describe("getEvents", () => {
    let req, res

    beforeEach(() => {
        req = {
            query: {}

        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Reset all mock methods before each test
        Event.find.mockReset?.()
    })
    describe("getEvents", () => {
        test("returns the events", async () => {
        
        }
    )}
)});

//1. without filter
//2. filter by city
//3. filter by date
//4. filter by date from to
//5. filter by both city and date range
//6.fail to fetch the event
