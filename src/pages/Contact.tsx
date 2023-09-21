import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Contact.css"
import { IconMail, IconMailForward, IconMapPinFilled, IconPhone } from "@tabler/icons-react";

export default function Contact(){

    const info = [
        {
            value: "+62 812 3456 7890",
            svg: <IconPhone stroke={1.5} />
        },
        {
            value: "stockwise@mail.com",
            svg: <IconMail stroke={1.5} />
        },
        {
            value: "Yogyakarta, indonesia",
            svg: <IconMapPinFilled stroke={1.5} />
        }
    ]

    return (
        <div className="contact">
            <Navbar page="Contact us" />
            <div className="content">
                <Header />
                <div className="contact-container">
                    <div className="header">
                        <div>Your thoughts are important to us</div>
                        <div>Feel free to drop us a message</div>
                    </div>
                    <div className="form-info">
                        <form action="">
                            <input type="text" placeholder="Subject" spellCheck="false" />
                            <textarea rows={10} placeholder="Message" spellCheck="false"></textarea>
                            <button type="button">
                                <span>Send</span>
                                <IconMailForward stroke={1.5} />
                            </button>
                        </form>
                        <div className="contact-info">
                            <div className="header">Our contact information</div>
                            <div className="info">
                            {
                                info.map((item, index) => {
                                    return (
                                        <div className="item" key={index}>
                                            {item.svg}
                                            <span>{item.value}</span>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}