/* React */
import { useState } from 'react'

/* CSS */
import '../index.css';

/* Router */
import { useHistory } from 'react-router-dom'

const Profile = () => {

    const [username, setUsername] = useState('')
    const [error, setError] = useState(false)

    const history = useHistory()

    const handleChange = e => {
        setError(false)
        setUsername(e.target.value)
    }

    const saveUsername = () => {
        if (username.trim().length === 0) {
            setUsername('')
            setError(true)
        } else {
            localStorage.setItem('username', username)
            alert('userName Changed')
            setUsername('')
            setError(false)
            history.push('/')
        }
    }

    return (
        <div className="profile">
            <h2 className="profile-h2">Profile</h2>

            {error ? <p className="p-message">You have to add a new userName</p> : null}
            <div className="my-profile">
                <div className="a">
                    <img
                        src="https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"
                        alt=""
                        className="img-tweet-perfil" />

                    <input type="file" className="ab"/>
                    <button  className="ab">Upload</button>
                </div>
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
                    <div className="profile-button">
                        <button
                            className="button-save"
                            onClick={saveUsername}>
                            Save
                        </button>
                    </div>

                </div>
            </div>
            <div className="followers">
                <small className="followers">Followers: 0</small>
                <small className="followers">Follows: 0</small>
            </div>
        </div>
    )
}

export default Profile