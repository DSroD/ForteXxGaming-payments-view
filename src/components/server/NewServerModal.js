import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NewServerModal(props) {

    const [name, setName] = useState("");
    const [game, setGame] = useState("");
    const [iconUrl, setIconUrl] = useState("");
    const [information, setInformation] = useState("");
    const [codename, setCodeName] = useState("");

    const handleCloseSubmit = () => {
        props.handleCloseSubmit({
            name: name,
            game: (game === "") ? null : game,
            iconURL: (iconUrl ===  "") ? null : iconUrl,
            information: (information === "") ? null : information,
            codeName: codename
        });
    }

    const handleCloseCancel = () => {
        setName("");
        setGame("");
        setIconUrl("");
        setInformation("");
        setCodeName("");
        props.handleCloseCancel();
    }

    const handleServerNameChange = (event) => {
        setName(event.target.value);
    }

    const handleServerGameChange = (event) => {
        setGame(event.target.value);
    }

    const handleServerIconChange = (event) => {
        setIconUrl(event.target.value);
    }

    const handleServerInformationChange = (event) => {
        setInformation(event.target.value);
    }

    const handleServerCodeNameChange = (event) => {
        setCodeName(event.target.value);
    }
    
    return (
        <Modal show={props.show} onHide={handleCloseCancel}>
            <Modal.Header closeButton>
              <Modal.Title>New Server</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mt-2">
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label className="text-body">Server Name</Form.Label>
                            <Form.Control placeholder="Name" value={name} onChange={handleServerNameChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGame">
                            <Form.Label className="text-body">Server Game</Form.Label>
                            <Form.Control placeholder="Game" value={game} onChange={handleServerGameChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formCodename">
                            <Form.Label className="text-body">CodeName</Form.Label>
                            <Form.Control placeholder="CodeName" value={codename} onChange={handleServerCodeNameChange}/>
                        </Form.Group>

                    </Row>
                    <Row className="mt-2">
                        <Form.Group as={Col} controlId="formUrl">
                            <Form.Label className="text-body">Icon URL</Form.Label>
                            <Form.Control placeholder="Icon URL" value={iconUrl} onChange={handleServerIconChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formInformation">
                            <Form.Label className="text-body">Server Info</Form.Label>
                            <Form.Control placeholder="Server Info" value={information} onChange={handleServerInformationChange}/>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleCloseSubmit}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
    )
}

export default NewServerModal;