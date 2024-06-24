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
            <div className="contact">
                <Navbar page="Contact us" />
                <div className="content">
                    <Header />
                    <div className="contact-container">
                        <div className="header">
                            <div>Ulasan Anda penting bagi kami</div>
                            <div>Jangan ragu untuk mengirimkan pesan kepada kami</div>
                        </div>
                        <div className="form-info">
                            <form>
                                <textarea rows={10} placeholder="Pesan" spellCheck="false"></textarea>
                                <button type="button">
                                    <span>Submit</span>
                                    <IconMailForward stroke={1.5} />
                                </button>
                            </form>
                            <div className="contact-info">
                                <div className="header">Informasi kontak</div>
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
}