import React from 'react'
import loadingGif from './img/loading.gif'

export default function Loading({ smallerSize }) {
    return (
        <div className="Loading" id={smallerSize === true ? "LoadingSmaller" : null}>
            <img id={smallerSize === true ? "loginLoadSmaller" : null} src={loadingGif} />
        </div>
    )
}
