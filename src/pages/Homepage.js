import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import homepage_photo from '../assets/homepage.png'

export default function HomePage() {

    useEffect(() => {
        document.title = "Teorija igara"
    }, []);
    return (
        <div className="Homepage">
            <div id="left">
                <h1>Teorija igara</h1>
                <p>Dobrodošli na sajt iz predmeta Teorija igara, pri Fakultetu organizacionih nauka.</p>
                <p>Ulogujte se na svoj profil kako biste počeli sa takmičenjem i učenjem na igrama koje Vas očekuju.</p>
                <Link to='/login'><button>Prijava</button></Link>
            </div>
            <div id="right">
                <img src={homepage_photo} />
            </div>
        </div>
    )
}
