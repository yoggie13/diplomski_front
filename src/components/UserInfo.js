import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function UserInfo({ isAdmin, user }) {
    useEffect(() => {
        document.title = "Profil | Teorija igara"
    }, []);

    return (
        <div className="UserInfo">
            <h1>{user.name + " " + user.surname}</h1>
            {
                isAdmin
                    ? <div id="text">
                        <div id="profileInfo">
                            <div className="statWrap">
                                <p>Zvanje:</p>
                                <p className="result">{user.title}</p>
                            </div>
                            <div className="statWrap">
                                <p>Email:</p>
                                <p className="result">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    : <div id="text">
                        <div id="stats">
                            <div className="statWrap">
                                <p>Mesto na listi:</p>
                                <p className="result">{user.placeOnList}</p>
                            </div>
                            <div className="statWrap">
                                <p>Ukupno osvojenih poena:</p>
                                <p className="result">{user.pointsGotten}</p>
                            </div>
                            <div className="statWrap">
                                <p>Ukupno odigranih igara:</p>
                                <p className="result">{user.gamesPlayed}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div id="profileInfo">
                            <div className="statWrap">
                                <p>Broj indeksa:</p>
                                <p className="result">{user.id}</p>
                            </div>
                            <div className="statWrap">
                                <p>Email:</p>
                                <p className="result">{user.email}</p>
                            </div>
                        </div>
                    </div >
            }
            <div className="ButtonsAlignRight">
                <Link to='changePassword'><button>Promeni šifru</button></Link>
            </div>
        </div >
    )
}
