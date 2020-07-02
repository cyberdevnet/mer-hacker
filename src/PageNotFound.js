import React from 'react'
import './styles/PageNotFound.css'

export default function PageNotFound() {
    return (
        <div>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Oops! Nothing was found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <a href="/home">Return to homepage</a></p>
                </div>
            </div>
        </div>
    )
}
