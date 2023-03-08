import YouTubePlayer from './YouTubePlayer';
import '../styles/modal.scss';
import '../styles/utils.scss';



const Modal = ({show, videoKey, closeModal, closeVideo, status}) => {

    const handleClose = () => {
        closeModal();
        closeVideo();
    }

    return (
        <div className={show ? "modal modal--show" : "modal"}>
            <div className="modal-backdrop">
                    <button className="btn-close" onClick={handleClose}></button>
                    {
                        status === 'loading' ? (
                            <div className='feedback__text feedback__text--loading'>
                                <h6>Loading...</h6>
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