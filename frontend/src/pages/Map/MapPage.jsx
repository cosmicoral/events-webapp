import Map from '../../components/Map'
import { useState, useEffect, useMemo } from "react";
import { getEvents } from '../../services/events';
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import { useNavigate } from 'react-router-dom';


export function MapPage(props) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        getEvents({ city: "Manchester" })
            .then((d) => setEvents(d.events))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false))
    },)


    return (
        <>
            <div className='map-page'>
                <div className='go-back' onClick={(() => (navigate("/feed")))}>
                    <button>back</button>
                </div>
                <Map events={events} height={"100%"} width={"100%"} zoom={12} />
            </div>
            <Footer />
        </>
    )
}

