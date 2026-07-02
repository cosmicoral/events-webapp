import { GoogleMap, MarkerF, useJsApiLoader, InfoWindowF } from "@react-google-maps/api"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns"

function Map(props) {

    const [map, setMap] = useState(null)
    const [hovered, setHovered] = useState(null)

    const containerStyle = useMemo(() => ({
        width: props.width,
        height: props.height
    }), [props.width, props.height])


    useEffect(() => {
        if (!map || !props.events?.length) return
        const withCoords = props.events.filter(e => e.venue?.location?.coordinates)
        if (withCoords.length <= 1) return
        const bounds = new window.google.maps.LatLngBounds()
        withCoords.forEach(e => bounds.extend({
            lat: e.venue.location.coordinates[1],
            lng: e.venue.location.coordinates[0]
        }))
        map.fitBounds(bounds, 50)
    }, [map, props.events])

    const navigate = useNavigate();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) return <p>Loading map...</p>

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={(m) => setMap(m)}
            zoom={props.zoom}
            center={props.centre}
            options={{
                mapId: "e9c25c7289259c03170ca2a6"
            }}
        >
            {props.events.filter((e) => e.venue?.location?.coordinates).map((e) => (
                <>
                    <MarkerF
                        key={e._id}
                        position={{
                            lat: e.venue.location.coordinates[1],
                            lng: e.venue.location.coordinates[0]
                        }}
                        onClick={(() => (navigate(`/events/${e._id}`)))}
                        onMouseOver={() => setHovered(e)}
                        onMouseOut={() => setHovered(null)}
                    />
                    {hovered && (
                        <InfoWindowF
                            position={{
                                lat: hovered.venue.location.coordinates[1],
                                lng: hovered.venue.location.coordinates[0]
                            }}
                            options={{ disableAutoPan: true, pixelOffset: new window.google.maps.Size(0, -35) }}
                        >
                            <div style={{paddingTop:"15px"}}>
                                <strong>{hovered.artist}</strong>
                                <div style={{ fontSize: '12px', color: '#666' }}>{hovered.venue.name}</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>{hovered.venue.address}</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>{format(hovered.date, "eeee d MMMM")}</div>
                            </div>
                        </InfoWindowF>
                    )}
                </>
            ))}
        </GoogleMap>
    )
}

export default Map