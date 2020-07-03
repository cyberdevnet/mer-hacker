import React from 'react'

export default function Home(ac) {
    return (
        <div id="page-inner">
            <div>{ac.flashMessages && <span>{ac.flashMessages}</span>}</div>

        </div>
    )
}
