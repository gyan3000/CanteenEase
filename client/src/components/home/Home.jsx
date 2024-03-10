import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import './Home.css';
import axios from 'axios';
import Loader from "./../loader/Loader";
import { Link } from "react-router-dom";

export default function Home() {
    const [isAvailable, setAvailable] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/currentstatus");
                setAvailable(response.data.isOpen);
            } catch (error) {
                console.error("Error fetching data:", error);
            } 
        };
        fetchData();
    }, []);

    const user = useSelector((state) => state.getUser).user;

    return (
        <div className='home'>
            {isAvailable ? (
                <div className="text">
                    <h1>Accepting</h1>
                    <p>Orders</p>
                </div>
            ) : (
                <div className="text-inactive">
                    <h1>Temporarily</h1>
                    <p>Unavailable</p>
                </div>
            )
            }
            {isAvailable ? (
                [!user.authtoken ? (
                    <div className="button">
                        <Link to="/login" role="button">
                            Log In
                        </Link>
                    </div>
                ) : (
                    <div className="button">
                        <Link to="/profile" role="button">
                            Profile
                        </Link>
                    </div>
                )]

            ) : (
                [!user.authtoken ? (
                    <div className="button-inactive">
                        <Link to="/login" role="button">
                            Log In
                        </Link>
                    </div>
                ) : (
                    <div className="button-inactive">
                        <Link to="/profile" role="button">
                            Profile
                        </Link>
                    </div>
                )]
            )}
        </div>
    );
}
