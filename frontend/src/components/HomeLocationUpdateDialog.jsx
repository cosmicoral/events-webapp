import { useState } from "react"
import { updateIsFirstLogin, updateHomeLocation } from "../services/userProfile";
import LocationSearch from "../components/LocationSearch";


// will change to Shad dialog component once installed

const HomeLocationUpdateDialog = ({isFirstLoginSession, setIsFirstLoginSession}) => {
    const [homeLocation, setHomeLocation] = useState(null);
    const [success, setSuccess] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [error, setError] = useState(null);

    const completeFirstLogin = async () => {
        await updateIsFirstLogin();
        setIsFirstLoginSession(false);
    };

    const handleLocationSubmit = async (e) => {
        e.preventDefault()
        if (!selectedLocation) return
        try {
            const updatedCity = await updateHomeLocation({ 
                city: selectedLocation.city, 
                lat: selectedLocation.lat, 
                long: selectedLocation.lng
            })
            setHomeLocation(updatedCity)
            setSuccess(true)
            await completeFirstLogin()

        } catch (err) {
            setError(err)
        }
    }

    const handleClose = async () => {
        try {
            await completeFirstLogin();
        } catch (err) {
            setError(err);
        }
    }
    
    return(
        isFirstLoginSession && 
            <div style={{width: "300px", border: "1px solid black"}}> 
                <p>Set your location for a personalised feed!</p>
                <form onSubmit={handleLocationSubmit}>
                    <p>Your location: {homeLocation}</p>
                    <LocationSearch onCitySelect={({ city, lat, lng }) => {
                        setSelectedLocation({ city, lat, lng })
                    }} />
                    <button type="submit">Update</button>
                </form>
                <p>Want to keep your location as Manchester for now? You can always update it on your profile page.</p>
                
                <button onClick={handleClose}>Close</button>
            </div>

    )
}

export default HomeLocationUpdateDialog