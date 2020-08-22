import React from 'react'


export default function Home(ac) {
    return (
        <div id="page-inner" style={{ backgroundColor: '#F36A5A', margin: '-60px 20px 10px 0px' }}>
            <div>{ac.flashMessages && <span>{ac.flashMessages}</span>}</div>
            <div className="col-md-3 register-left" style={{ width: '100%' }}>
                <img src="https://i.ibb.co/1XQKfyd/Mer-Haker-white.png" alt="" style={{ width: '370px' }} />
                {/* <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" style={{}} /> */}
                <h3 style={{ textAlign: 'center' }}>Select Organization and network to start!</h3>
                <br />
            </div>

        </div>
    )
}




