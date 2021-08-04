import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ForbiddenPopup(props) {
    return (
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Forbidden</Modal.Title>
            </Modal.Header>
            <Modal.Body>Can't view this resource.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
      );
}

export default ForbiddenPopup;