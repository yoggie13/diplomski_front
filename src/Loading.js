import React from 'react'
import loadingGif from './assets/loading.gif'

export default function Loading({ smallerSize }) {
    return (
        <div className="Loading" id={smallerSize ? "LoadingSmaller" : null}>
            <img id={smallerSize ? "loginLoadSmaller" : null} src={loadingGif} />
        </div>
    )
}
