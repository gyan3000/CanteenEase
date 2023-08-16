import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">CanteenConnect</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Order</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-disabled="true">Cart</a>
                            </li>
                        </ul>
                        <button className="btn btn-primary" type="submit">Login</button>
                        <button className="btn btn-primary mx-2" type="submit">Signup</button>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
