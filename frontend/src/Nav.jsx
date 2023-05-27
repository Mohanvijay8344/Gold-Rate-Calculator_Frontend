import React from 'react'
import {useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

function Nav({ Name }) {

    let navigate = useNavigate()

    let Logout = async () => {
        let sure = await swal("Are you sure to Logout?", {
            buttons: ["No", true],
        });
        console.log(sure);
        if (sure === true) {
            navigate('/')
        }
    }
    const styles = {
        width: "30px",
        height: "30px",
        borderRadius: '50%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
    }

    return (
        <>
            <nav className="navbar navbar-expand topbar mb-4 static-top shadow trans">
                {/* <!-- Topbar Search --> */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <span className="navbar-brand mb-0 text-black h1">Welcome</span>
                        <div className="input-group-append">
                        </div>
                    </div>
                </form>

                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"></div>
                </ul>
            </nav>
        </>
    )
}

export default Nav;