/* React */
import {useState} from 'react'

/* CSS */
import '../index.css';


const Profile = () => {

    const [username, setUsername] = useState('')

    const handleChange = e => {
        setUsername(e.target.value)
    }

    const saveUsername = () =>{
        if (username.trim('').length > 0){
            localStorage.setItem('username', username)
            setUsername('')
        }else{
            setUsername('')
        }
    }

    return (
        <div className = "profile">
            <h2 className ="profile-h2">Profile</h2>
            <div className ="profile-profile">
                <label className ="profile-username">User Name</label>
                <input
                    type="text"
                    name="username"
                    className="profile-name"
                    placeholder="Enter you username..."
                    maxLength={15}
                    onChange ={handleChange}
                    value={username}
                />
                <button
                    className="button-save"
                    onClick = {saveUsername}>
                        Save
                </button>
            </div>
        </div>
    )
}

export default Profile