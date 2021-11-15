
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Tweet = ({ tweet }) => {
    const { userName, content, date } = tweet;
    return (
        <div className="tweet">
            <img
                src="https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"
                alt=""
                className="img-tweet" />
            <div className="a1">
                <div className="dateandname">
                    <small>{userName}</small>
                    <small>{date}</small>
                </div>
                <div className="content">
                    <span>{content}</span>
                </div>
                <div className="icons">
                    <div className="hearted">
                        <AiOutlineHeart className="heart" />
                        <small className="a2">0</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet