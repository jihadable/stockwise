import Navbar from "../components/Navbar";
import Header from "../components/Header";
import user from "../assets/user.png"
import "../style/Account.css"

export default function Account(){

    const info = [
        {
            title: "Name",
            value: "User"
        },
        {
            title: "Email",
            value: "user@mail.com"
        },
        {
            title: "Phone",
            value: "+62 812 3456 7890"
        },
        {
            title: "Bio",
            value: `Lorem ipsum dolor sit amet.`
        }
    ]

    return (
        <div className="account">
            <Navbar page="Account" />
            <div className="content">
                <Header />
                <div className="user-info">
                    <div className="img">
                        <img src={user} alt="Use" />
                    </div>
                    <div className="side">
                        <div className="info">
                        {
                            info.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <div className="label">{item.title}</div>
                                        <div className="value">{item.value}</div>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <button type="button">Edit profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}