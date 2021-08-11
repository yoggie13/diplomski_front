import React from 'react';


export default function UserInfo({ changeRender, admin }) {

    const handleClick = e => {
        e.preventDefault();
        changeRender("changepassword");
    }
    return (
        <div className="UserInfo">
            <h1>Ognjen Nikolić</h1>

            {
                admin === false
                    ?
                    <div id="text">
                        <div id="stats">
                            <div className="statWrap">
                                <p>Mesto na listi:</p>
                                <p className="result">1</p>
                            </div>
                            <div className="statWrap">
                                <p>Ukupno osvojenih poena:</p>
                                <p className="result">1</p>
                            </div>
                            <div className="statWrap">
                                <p>Ukupno odigranih igara:</p>
                                <p className="result">1</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div id="profileInfo">
                            <div className="statWrap">
                                <p>Broj indeksa:</p>
                                <p className="result">20170077</p>
                            </div>
                            <div className="statWrap">
                                <p>Email:</p>
                                <p className="result">on20170077@student.fon.bg.ac.rs</p>
                            </div>
                        </div>
                    </div >
                    : <div id="text">
                        <div id="profileInfo">
                            <div className="statWrap">
                                <p>Zvanje:</p>
                                <p className="result">Dr.Mr.</p>
                            </div>
                            <div className="statWrap">
                                <p>Email:</p>
                                <p className="result">on20170077@student.fon.bg.ac.rs</p>
                            </div>
                        </div>
                    </div>
            }
            <div id="buttons">
                <button onClick={handleClick}>Promeni šifru</button>
            </div>
        </div >
    )
}
