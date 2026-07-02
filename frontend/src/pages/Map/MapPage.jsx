import Map from '../../components/Map'
import { useState, useEffect, useMemo } from "react";
import { getEvents } from '../../services/events';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { authClient } from '@/services/authentication';
import { getMyProfile } from '@/services/userProfile';
import { format } from "date-fns"
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MapPage(props) {
    const { data: session, isPending } = authClient.useSession()
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()


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
                <div className="relative flex-1">
                    <Button
                        onClick={() => navigate(-1)}
                        className="absolute top-20 left-10 z-10 drop-shadow-2xl"
                        variant="secondary"
                    >
                        <ArrowLeft/>
                        Back
                    </Button>
                    <Map events={events} height={"100%"} width={"100%"} />
                </div>
                <Map events={events} height={"100%"} width={"100%"} />
            </div>
            <Footer />
        </>
    )
}

