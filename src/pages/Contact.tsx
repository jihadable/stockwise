import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Contact.css"

export default function Contact(){

    const info = [
        {
            value: "+62 812 3456 7890",
            svg:
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
            </svg>
        },
        {
            value: "stockwise@mail.com",
            svg:
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                <path d="M3 7l9 6l9 -6"></path>
            </svg>      
        },
        {
            value: "Yogyakarta, indonesia",
            svg:
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" strokeWidth="0" fill="currentColor"></path>
            </svg>
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
                            <input type="text" placeholder="Subject" />
                            <textarea rows={10} placeholder="Message"></textarea>
                            <button type="button">
                                <span>Send</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-forward" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"></path>
                                    <path d="M3 6l9 6l9 -6"></path>
                                    <path d="M15 18h6"></path>
                                    <path d="M18 15l3 3l-3 3"></path>
                                </svg>
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