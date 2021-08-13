import React from 'react'
import { useState } from 'react'

export default function Messages() {
    const [state, setstate] = useState({ numberOfMessage: [1, 2] })

    return (
        <div id="Messages">
            <p className="opponent">Ovo je prva poruka od strane protivnika koji preti baš opasno</p>
            <p className="player">Ovo je prva poruka od našeg igrača koji se strahovito brani i zadaje kontra udarac</p>
        </div>
    )
}
