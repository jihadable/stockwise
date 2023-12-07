import "../style/Register.css"
import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Register(){
    return (
        <div className="register">
            <form>
                <h2>Register Stockwise</h2>
                <div className="email">
                    <IconMail stroke={1.5} />
                    <input type="text" placeholder="Email" required />
                </div>
                <div className="username">
                    <IconUserCircle stroke={1.5} />
                    <input type="text" placeholder="Username" required />
                </div>
                <div className="password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Password" required />
                </div>
                <div className="confirm-password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Confirm password" required />
                </div>
                <button type="submit">Register</button>
            </form>
            {/* {isRegister === false && <p className="login-fail">Username/Email is already in use</p>} */}
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    )
}