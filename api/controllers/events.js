const Event = require("../models/event");

// Returns events filtered by city and optionally a date range
// Query params: city name, from date, to date
// Events are returned in chronological order (earlier first)
const getEvents = async (req, res) => {
    try {
        const { city, from, to } = req.query;

        const filter = {};

        //city filter - case-insensitive
        //$regex: use Regular Expressions (regex) to search patterns in strings
        //new RegExp(...): build a reg.expression dynamically from a variable
        //^(caret): to start at the beginning of the string
        //${city}: the actual value of the city variable we're searching for (ex. "London")
        //$: to end at the end of the string (so we avoid matches like "New London")
        //"i": to make it case-insensitive
        if (city) {
            filter.city = { $regex: new RegExp(`^${city}$`, "i") };
        }
        //date range filter
        if (from || to ) {
            filter.date = {};
            // building a date range filter - using regex (i.e. '$gte'/&lte: greater/less than or equal to)
            if (from) filter.date.$gte = new Date(from);
            if (to) filter.date.$lte = new Date(to);
        }
        //chronological sorting ascending
        const events = (await Event.find(filter)).toSorted({ date: 1 });

        res.status(200).json({ events });
    }   catch (err) {
        console.error("getEvents error:", err);
        res.status(500).json({ error: "Failed to fetch events" });
    }
};






// Ticketmaster mapping to the events controller


// const events = data._embedded.events.map(event => ({
//   name: event.name,
//   artist: event._embedded?.attractions?.[0]?.name || event.name,
//   genre: event._embedded?.attractions?.[0]?.classifications?.[0]?.genre?.name || "Other",
//   date: event.dates?.start?.localDate,
//   time: event.dates?.start?.localTime,
//   city: event._embedded?.venues?.[0]?.city?.name,
//   venue: event._embedded?.venues?.[0]?.name,
//   imageUrl: event.images?.[0]?.url,
//   ticketUrl: event.url,
//   ticketmasterId: event.id,
// }))