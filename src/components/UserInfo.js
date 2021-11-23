import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function UserInfo({ admin, User }) {

    useEffect(() => {
        document.title = "Profil | Teorija igara"
    }, []);

    return (
        <div className="UserInfo">
            <h1>{User.name + " " + User.surname}</h1>
            {
                admin === false
                    ?
                    <div id="text">
                        <div id="stats">
                            <div className="statWrap">
                                <p>Mesto na listi:</p>
                                <p className="result">{User.placeOnList}</p>
                            </div>
                            <div className="statWrap">
                                <p>Ukupno osvojenih poena:</p>
                                <p className="result">{User.pointsGotten}</p>
                            </div>
                            <div className="statWrap">
                                <p>Ukupno odigranih igara:</p>
                                <p className="result">{User.gamesPlayed}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div id="profileInfo">
                            <div className="statWrap">
                                <p>Broj indeksa:</p>
                                <p className="result">{User.id}</p>
                            </div>
                            <div className="statWrap">
                                <p>Email:</p>
                                <p className="result">{User.email}</p>
                            </div>
                        </div>
                    </div >
                    : <div id="text">
                        <div id="profileInfo">
                            <div className="statWrap">
                                <p>Zvanje:</p>
                                <p className="result">{User.title}</p>
                            </div>
                            <div className="statWrap">
                                <p>Email:</p>
                                <p className="result">{User.email}</p>
                            </div>
                        </div>
                    </div>
            }
            <div className="ButtonsAlignRight">
                <Link to='changePassword'><button>Promeni šifru</button></Link>
            </div>
        </div >
    )
}
