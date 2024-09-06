import React from'react';
import { defaultCopy } from '../../utils/dictionary.js';
import Modal from '../Modal/Modal.js'

function ErrorModal(props) {
    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <div className="DeleteBadgeModal">
            <h2 style={{color: 'tomato'}}>{`${defaultCopy.components.errorModal.errorLabel}:`} {props.error.code}</h2>
            <p>{props.error.message}</p>
            <div>
                <button className="btn btn-normal" onClick={props.onClose}>{`${defaultCopy.components.errorModal.buttonLabel}:`}</button>
            </div>
        </div>
    </Modal>
}

export default ErrorModal;