import { IconMail, IconMailForward, IconMapPinFilled, IconPhone } from "@tabler/icons-react";
import { useContext } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import "../style/Contact.css";
import NotFound from "./NotFound";

export default function Contact(){

    const { isLogin } = useContext(AuthContext)

    if (isLogin === false){
        return <NotFound />
    }

    if (isLogin === true){
        document.title = "StockWise | Contact"
    
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
            <section className="contact">
                <Navbar page="Contact us" />
                <article className="content">
                    <Header />
                    <article className="contact-container">
                        <div className="header">
                            <p>Your feedback is important to us</p>
                            <p>Do not hesitate to let us know</p>
                        </div>
                        <div className="form-info">
                            <form>
                                <textarea rows={10} placeholder="Message" spellCheck="false"></textarea>
                                <button type="button">
                                    <span>Submit</span>
                                    <IconMailForward stroke={1.5} />
                                </button>
                            </form>
                            <div className="contact-info">
                                <p className="header">Contact information</p>
                                <div className="info">
                                {info.map((item, index) => (
                                    <div className="item" key={index}>
                                        {item.svg}
                                        <span>{item.value}</span>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </article>
                </article>
            </section>
        )
    }

    return null
}