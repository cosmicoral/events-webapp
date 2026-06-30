import { useState } from "react"
import { updateIsFirstLogin, updateHomeLocation } from "../services/userProfile";
import LocationSearch from "./LocationSearch";
import { Button } from "@/components/ui/button";

const HomeLocationForm = ({isFirstLoginSession, setIsFirstLoginSession}) => {
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
    return(
        <form onSubmit={handleLocationSubmit}>
            <LocationSearch onCitySelect={({ city, lat, lng }) => {
                setSelectedLocation({ city, lat, lng })
            }} />
            <Button type="submit">Update</Button>
        </form>
    )
}

export default HomeLocationForm