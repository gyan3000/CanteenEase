import React from 'react'
import { useSelector } from "react-redux";
import './Home.css'

export default function Home() {
    const isAvilable = true;
    const user = useSelector((state) => state.getUser).user;
  return (
    <div className='home'>
        { isAvilable ? (
            <div className="text">
                <h1>Accepting</h1>
                <p>Orders</p>
            </div>
            ) :(
                <div className="text-inactive">
                    <h1>Temporarily</h1>
                    <p>Unavailable</p>
                </div>
            )
        }
        {isAvilable ? (
            [!user.authtoken ? (
                <div className="button">
                    <a href="/login" role="button">
                        Log In
                    </a>
                </div>
            ) : (
                <div className="button">
                    <a  href="/profile" role="button">
                        Profile
                    </a>
                </div>
            )]  

        ):(
            [!user.authtoken ? (
                <div className="button-inactive">
                    <a href="/login" role="button">
                        Log In
                    </a>
                </div>
            ) : (
                <div className="button-inactive">
                    <a  href="/profile" role="button">
                        Profile
                    </a>
                </div>
            )] 
        )}
    </div>
  )
}
