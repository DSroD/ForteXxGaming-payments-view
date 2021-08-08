import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NewProductModal(props) {
    const [product_name, setProductName] = useState("");
    const [product_priceCzk, setPriceCzk] = useState("");
    const [product_priceEur, setPriceEur] = useState("");
    const [product_information, setInformation] = useState("");
    const [product_codename, setProductCodename] = useState("")

    const handleCloseCancel = () => {
        setProductName("");
        setPriceCzk("");
        setPriceEur("");
        setInformation("");
        setProductCodename("");
        props.handleCancel();
    }

    const handleCloseSubmit = (event) => {
        if (!checkValidity()) {
            alert("Form is not valid.");
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            props.handleSubmit({
                name: product_name,
                priceEur: +(product_priceEur.replace(/,/, ".")),
                priceCzk: +(product_priceCzk.replace(/,/, ".")),
                information: product_information,
                codeName: product_codename,
                gameServerId: props.server_id
            });
        }
    }

    const checkValidity = () => {
        if (isNaN(+(product_priceCzk.replace(/,/, ".")))) return false;
        if (isNaN(+(product_priceEur.replace(/,/, ".")))) return false;
        return true;
    }

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    }

    const handleProductInformationChange = (event) => {
        setInformation(event.target.value);
    }

    const handlePriceCzkChange = (event) => {
        setPriceCzk(event.target.value);
    }

    const handlePriceEurChange = (event) => {
        setPriceEur(event.target.value);
    }

    const handleProductCodenameChange = (event) => {
        setProductCodename(event.target.value);
    }

    return (
        <Modal show={props.show} onHide={handleCloseCancel}>
            <Modal.Header closeButton>
              <Modal.Title>New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mt-2">
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label className="text-body">Product Name</Form.Label>
                            <Form.Control placeholder="Product Name" value={product_name} onChange={handleProductNameChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formInformation">
                            <Form.Label className="text-body">Product Information</Form.Label>
                            <Form.Control placeholder="Information" value={product_information} onChange={handleProductInformationChange}/>
                        </Form.Group>

                    </Row>
                    <Row className="mt-2">
                        <Form.Group as={Col} controlId="formUrl">
                            <Form.Label className="text-body">Price (CZK)</Form.Label>
                            <Form.Control placeholder="Price (CZK)" value={product_priceCzk} onChange={handlePriceCzkChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formInformation">
                            <Form.Label className="text-body">Price (EUR)</Form.Label>
                            <Form.Control placeholder="Price (EUR)" value={product_priceEur} onChange={handlePriceEurChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formCodename">
                            <Form.Label className="text-body">Codename</Form.Label>
                            <Form.Control placeholder="Codename" value={product_codename} onChange={handleProductCodenameChange}/>
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
    );
}

export default NewProductModal;