import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";


// need to make logout button dynamic (login / logout) checking session exists
// don't show profile to logged out

const NavBar = () => {
    const navigate = useNavigate()
    return (
        <nav style={{borderBottom : "1px solid black"}}>
            <button onClick={() => navigate("/feed")}>Feed</button>
            <button onClick={() => navigate("/profile")}>Profile</button>
            <LogoutButton/>
        </nav>
        
    )
}


export default NavBar;