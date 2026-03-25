import Modal from "react-modal";
const BoardingPassModal = ({ isOpen }) => {

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0px"
        },
        overlay: {
            zIndex: 2
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            ariaHideApp={false} //
            contentLabel="Verify Mobile Modal"
            id="modalOtp-verify-mobile"
        >
            <div on>
                <h1>Modal Opened</h1>
            </div>
        </Modal>
    )
}
export default BoardingPassModal;