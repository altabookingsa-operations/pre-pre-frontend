import React from 'react';
import Modal from 'react-modal';

const ModalWarpper = ({ onCloseModal, isOpen, children, contentLabel, id }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        contentLabel={contentLabel}
        ariaHideApp={false}
        className={'modal right fade show'}
        overlayClassName={'modal-backdrop-overlay'}
        id={id}
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel4"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1050,
          },
          content: {
            display: 'block',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 'auto',
            width: '500px',
            maxWidth: '100%',
            backgroundColor: '#fff',
            zIndex: 1051,
            overflow: 'auto',
            padding: 0,
            border: 'none',
            borderRadius: 0,
          },
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-header">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalWarpper;
