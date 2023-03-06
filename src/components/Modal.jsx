import YouTubePlayer from './YouTubePlayer';
import '../styles/modal.scss';



const Modal = ({show, videoKey, closeModal, closeVideo, loading}) => {

    const handleClose = () => {
        closeModal();
        closeVideo();
    }

    return (
        <div className={show ? "modal modal--show" : "modal"}>
            <div className="modal-backdrop">
                    <button className="btn-close" onClick={handleClose}></button>
                    {
                        loading ? (
                            <div style={{padding: "30px"}}>
                                <h6>no trailer available. Try another movie</h6>
                            </div>
                        ) : null
                    }
                    <div className="modal-content modal-dialog-centered">{
                        videoKey ? (
                            <YouTubePlayer
                                videoKey={videoKey}
                            />
                        ) : (
                            <div style={{padding: "30px"}}><h6>no trailer available. Try another movie</h6></div>
                        )}
                    </div>  
            </div>
            
        </div>

    );
}

export default Modal;