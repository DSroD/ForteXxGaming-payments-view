import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteConfirmationModal(props) {
    return(
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete?</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.text}</Modal.Body>
            <Modal.Footer>
                <div className="button-in-row"><Button variant="danger" onClick={props.handleSubmit}>
                    Delete
                </Button></div>
                <div className="button-in-row"><Button variant="secondary" onClick={props.handleClose}>
                Cancel
              </Button></div>
            </Modal.Footer>
          </Modal>
    )
}

export default DeleteConfirmationModal;