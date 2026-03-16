import React from 'react';
import Modal from 'react-modal';

const RuleSetModal = ({ onCloseModal, isOpen, children, contentLabel, id }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        contentLabel={contentLabel}
        className={'modal right fade'}
        id={id}
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel4"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body rules-popup-new rules-popup-new22">
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
              <div className="rls-pop-cntnt">
                <h4>Rules</h4>
                {children}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RuleSetModal;
