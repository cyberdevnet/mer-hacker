import React from 'react'


export default function Home(ac) {
    return (
        <div id="page-inner" style={{ backgroundColor: '#F36A5A' }}>
            <div>{ac.flashMessages && <span>{ac.flashMessages}</span>}</div>
            <div className="col-md-3 register-left" style={{ width: '100%' }}>
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" style={{}} />
                <h3 style={{ textAlign: 'center' }}>Select Organization and network to start!</h3>
                <br />
            </div>

        </div>
    )
}
