/* css */
import '../spinner.css'


const Spinner = () => {
    return (
        <div>
            <p className="spinner-p">Loading tweet list...</p>
            <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        </div>
    )

}

export default Spinner