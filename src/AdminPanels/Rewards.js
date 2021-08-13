import React from 'react'

export default function Rewards() {
    return (
        <div className="Rewards">
            <h1>Isplate</h1>
            <form>
                <div id="RewardMatrix">
                    <div id="AA">
                        <input id="1.1" type="number" />
                        <input id="2.1" type="number" />
                    </div>
                    <div id="AB" >
                        <input id="1.1" type="number" />
                        <input id="2.2" type="number" />
                    </div>
                    <div id="BA">
                        <input id="1.2" type="number" />
                        <input id="2.1" type="number" />
                    </div>
                    <div id="BB">
                        <input id="1.2" type="number" />
                        <input id="2.2" type="number" />
                    </div>
                </div>
                <input type="submit" value="Unesi isplate" />
            </form>
        </div>
    )
}
