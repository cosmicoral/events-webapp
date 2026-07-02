import Map from '../../components/Map'
import { useState, useEffect, useMemo } from "react";
import { getEvents } from '../../services/events';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { authClient } from '@/services/authentication';
import { getMyProfile } from '@/services/userProfile';
import { format } from "date-fns"

export function MapPage(props) {
    const { data: session, isPending } = authClient.useSession()
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)


    useEffect(() => {
        if (isPending) return
        getMyProfile()
            .then(async ({ profile }) => {
                setProfile(profile)
                const { events } = await getEvents({
                    city: profile.homeLocation?.city || "Manchester",
                    limit: 0,
                    from: format(new Date(), "yyyy-MM-dd")
                })
                setEvents(events)
            })
            .catch(async () => {
                const { events } = await getEvents({ city: "Manchester", limit: 0, from: format(new Date(), "yyyy-MM-dd") })
                setEvents(events)
            })
            .finally(() => setLoading(false))
    }, [isPending])


    return (
        <>
            <NavBar />
            <div className='map-page'>
                <Map events={events} height={"100%"} width={"100%"} />
            </div>
            <Footer />
        </>
    )
}

