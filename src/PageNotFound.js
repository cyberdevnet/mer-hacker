import React, { useEffect } from 'react'
import $ from 'jquery'
import './styles/PageNotFound.css'

export default function PageNotFound(ac) {


    //function used to close toggle menu and hide hamburger icon
    useEffect(() => {
        const handleToggle = () => {
            $(this).addClass('closed');
            $('.navbar-side').css({ left: '-260px' });
            $('#page-wrapper').css({ 'margin-left': '0px' });
            ac.setcollapseButton({ display: 'none' })
        };
        handleToggle()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Oops! Nothing was found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <a href="/home">Return to homepage</a></p>
                </div>
            </div>
        </div>
    )
}
