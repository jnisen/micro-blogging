/* React */
import { useState } from 'react'

/* CSS */
import '../index.css';


const Profile = () => {

    const [username, setUsername] = useState('')
    const [error, setError] = useState(false)

    const handleChange = e => {
        setError(false)
        setUsername(e.target.value)
    }

    const saveUsername = () => {
        if (username.trim().length === 0) {
            setUsername('')
            setError(true)
            return
        } else {
            localStorage.setItem('username', username)
            alert('userName Changed')
            setUsername('')
            setError(false)
        }
    }

    return (
        <div className="profile">
            <h2 className="profile-h2">Profile</h2>
            {error ? <p className="p-message">You have to add a new userName</p> : null}
            <div className="profile-profile">
                <label className="profile-username">User Name</label>
                <input
                    type="text"
                    name="username"
                    className="profile-name"
                    placeholder="Enter you username..."
                    maxLength={15}
                    onChange={handleChange}
                    value={username}
                    required
                />
                <button
                    className="button-save"
                    onClick={saveUsername}>
                    Save
                </button>

            </div>
        </div>
    )
}

export default Profile