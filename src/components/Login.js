import React from 'react'

/* React */
import { Link } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';

export default function Login() {
    return (
        <div className="login">
            <p className="heading">Login</p>
            <form id="form-login" className="main__login">
                <div className="box">
                    <label htmlFor="email">Email: </label>
                    <div>
                        <input type="email" name="email" id="email" />
                    </div>
                </div>
                <div className="box">
                    <label htmlFor="password">Password: </label>
                    <div>
                        <input type="password" name="password" id="password" />
                    </div>
                </div>
                <input type="submit" value="Login" className="loginBtn" />
                <p className="aaa">Or</p>
                <button type="submit" value="Login" className="loginBtn">
                    <FcGoogle /> <small className="google">Login with Google</small>
                </button>
                <p className='text'>Don't have an account? <Link to="/signup">Sign up</Link> </p>
            </form>
        </div>
    )
}
