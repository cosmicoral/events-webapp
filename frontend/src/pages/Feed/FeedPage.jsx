// pages/Feed/FeedPage.jsx
import { useState, useEffect } from "react"
import { authClient } from "../../services/authentication"
import { getMyProfile } from "../../services/userProfile"
import NavBar from "../../components/NavBar"
import Recommendations from "../../components/Recommendations"
import EventFeedSection from "../../components/EventFeedSection"
import Footer from "../../components/Footer"
import { useNavigate } from "react-router-dom"

export function FeedPage() {
  const { data: session, isPending } = authClient.useSession()
  const [profile, setProfile] = useState(null)
  const [favouriteArtists, setFavouriteArtists] = useState([])
  const [savedEvents, setSavedEvents] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isPending && session?.user) {
      getMyProfile()
        .then(({ profile }) => {
          setProfile(profile)
          setFavouriteArtists(profile.favouriteArtists)
          setSavedEvents(profile.savedEvents)
        })
        .catch((err) => console.error(err))
    }
  }, [session, isPending])

  function handleSavedToggled(eventId) {
    if (session && !isPending) {
      setSavedEvents((prev) =>
        prev.includes(eventId)
          ? prev.filter((id) => id !== eventId)
          : [...prev, eventId]
      )
    }
  }

  return (
    <>
      <NavBar />
      <Recommendations
        homeCity={profile?.homeLocation?.city}
        favouriteArtists={favouriteArtists}
        setFavouriteArtists={setFavouriteArtists}
        savedEvents={savedEvents}
        onSavedToggled={handleSavedToggled}
      />
      <EventFeedSection
        favouriteArtists={favouriteArtists}
        setFavouriteArtists={setFavouriteArtists}
        savedEvents={savedEvents}
        onSavedToggled={handleSavedToggled}
        homeCity={profile?.homeLocation.city}
        isPending={isPending}
      />
      <Footer />
    </>
  )
}
