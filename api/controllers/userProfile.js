const UserProfile = require("../models/userProfile")

const getMyProfile = async (req, res) => {
    try {
        // find the userprofile by the auth id
        const profile = await UserProfile.findOne({ authUserId: req.user.id })

        //if not profile found
        if (!profile) {
            return res.status(404).json({ error: "User's profile not found" })
        }
        return res.json({ profile })
    } catch (error) {
        console.error(error)
    }
}

const updateFavouriteArtists = async (req, res) => {
    try {
        // take artists of req body
        const { artists } = req.body

        // if no artists provided
        if (!artists) {
            return res.status(404).json({ error: "User must provide artists to update with" })
        }
        // args for api fun 
        const profile = await UserProfile.findOneAndUpdate(
            //1. filter -> what does it need to find 
            { authUserId: req.user.id },
            // what does it need to update?
            { favouriteArtists: artists },
            // options -> return new profile not old one. 
            { new: true }
        )
        // return the found and updated profile
        return res.json({ profile })
    } catch (error) {
        console.error(error)
    }
}


const updateLocation = async (req, res) => { }

module.exports = { updateLocation, getMyProfile, updateFavouriteArtists }