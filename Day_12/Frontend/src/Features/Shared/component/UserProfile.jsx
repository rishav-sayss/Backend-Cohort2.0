import React from "react";
import { useNavigate } from "react-router-dom";
import "./userProfile.scss";
import { useContext } from "react";
import { Authcontext } from "../../auth/Auth.context";
function UserProfile({ fileimage, username }) {
    const navigate = useNavigate();
    let { user, setuser } = useContext(Authcontext)
    console.log(user)
    const handleClick = () => {
        navigate("/profile");
    };

    return (
        <div className="user-profile" onClick={handleClick}>
            <img
                src={
                    fileimage ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="user-img"
            />
            <p className="username">{user}</p>
        </div>
    );
}

export default UserProfile;