import { useState } from "react"
import { updateIsFirstLogin, updateHomeLocation } from "../services/userProfile";
import LocationSearch from "../components/LocationSearch";
import HomeLocationForm from "./HomeLocationForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


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
            // updates isFirstLogin when dialog closed with X button
            // <Dialog open={isFirstLoginSession}>
            <Dialog 
                open={isFirstLoginSession} 
                onOpenChange={(open) => {
                    if (!open) {
                        handleClose();
                }
            }}>
                <DialogContent
                    showCloseButton={false}
                >
                    <p>Set your location for a personalised feed!</p>
                    <HomeLocationForm 
                        isFirstLoginSession={isFirstLoginSession}
                        setIsFirstLoginSession={setIsFirstLoginSession}
                    />
                    {/* <form onSubmit={handleLocationSubmit}>
                        <LocationSearch onCitySelect={({ city, lat, lng }) => {
                            setSelectedLocation({ city, lat, lng })
                        }} />
                        <button type="submit">Update</button>
                    </form> */}
                    <p>Want to keep your location as Manchester for now? You can always update it on your profile page.</p>
                <DialogClose asChild>
                    <Button type="button" onClick={handleClose}>Close</Button>
                </DialogClose>
                </DialogContent>
            </Dialog>

    )
}

export default HomeLocationUpdateDialog