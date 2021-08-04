import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function PasswordPopup(props) {
    const [show, setShow] = useState(true);
    const [pwd, setPwd] = useState("");

    const handleClose = () => {
            setShow(false);
            props.setKey(pwd);
            //props.setKey(cyrb53(pwd));
        }
    const handleKeyPress = (event) => {
      if(event.charCode === 13) {
        handleClose();
      }
    }

    const handleChange = (event) => {
        setPwd(event.target.value);
    }
    
    const cyrb53 = function(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1>>>0);
    };

    return(
        <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Password required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter password to access resources on this page
          <InputGroup className="mb-3">
            <FormControl
            type="password"
            placeholder="password"
            aria-label="password"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={handleClose}>
                Save
            </Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
    )
}

export default PasswordPopup;