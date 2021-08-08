import { useState, useEffect } from 'react';

import ProductRow from '../components/products/ProductRow';
import ProductTableHead from '../components/products/ProductTableHead';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ServerApi from '../api/ServerApi';

function SingleProductView(props) {
    const [product, setProduct] = useState(null)
    const [product_name, setProductName] = useState("");
    const [product_information, setProductInformation] = useState("");
    const [product_priceCzk, setProductPriceCzk] = useState("");
    const [product_priceEur, setProductPriceEur] = useState("");
    const [product_codename, setProductCodeName] = useState("");
    const [delete_modal_show, setDeleteModalShow] = useState(false);

    useEffect(() => {
        ServerApi.requestProductById(props.api_key, props.id)
        .then((r) => {
            if(r === null) {
                props.throwForbidden();
            }
            else {
                setProduct(r);
                setProductName(r.name || "");
                setProductInformation(r.information || "");
                setProductPriceCzk((r.priceCzk || "")+"");
                setProductPriceEur((r.priceEur || "")+"");
                setProductCodeName(r.codeName || "");
            }
        })
    }, [props]);

    const getProductRow = () => {
        if(product === null || product === undefined) {
            return null;
        }
        console.log(product)
        return(
            <ProductRow
                id={props.id}
                name={product.name}
                information={product.information}
                priceCzk={product.priceCzk}
                priceEur={product.priceEur}
                codename={product.codeName}
                />
        )
    }

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    }

    const handleProductInformationChange = (event) => {
        setProductInformation(event.target.value);
    }

    const handleProductCzkPriceChange = (event) => {
        setProductPriceCzk(event.target.value);
    }

    const handleProductEurPriceChange = (event) => {
        setProductPriceEur(event.target.value);
    }

    const handleProductCodenameChange = (event) => {
        setProductCodeName(event.target.value);
    }

    const checkValidity = () => {
        if (isNaN(+(product_priceCzk.replace(/,/, ".")))) return false;
        if (isNaN(+(product_priceEur.replace(/,/, ".")))) return false;
        return true;
    }

    const handleSubmit = () => {
        if(!checkValidity()) {
            alert("Wrong price format!")
            return;
        }
        ServerApi.updateProduct(props.api_key, {
            id: props.id,
            name: product_name,
            information: product_information,
            codename: product_codename,
            priceEur: product_priceEur,
            priceCzk: product_priceCzk
        }).then((r) => {
            if(r === null) {
                props.throwForbidden();
            }
            else {
                setProduct(r);
                setProductName(r.name || "");
                setProductInformation(r.information || "");
                setProductPriceCzk((r.priceCzk || "")+"");
                setProductPriceEur((r.priceEur || "")+"");
                setProductCodeName(r.codename || "");
            }
        })
    }

    const handleDelete = () => {
        setDeleteModalShow(true);
    }

    const handleCancelDelete = () => {
        setDeleteModalShow(false);
    }

    const handleSubmitDelete = () => {
        ServerApi.deleteProductById(props.api_key, props.id)
        .then((r) => {
            if(r === false) {
                setDeleteModalShow(false);
                props.throwForbidden();
            } else {
                props.handleBack();
            }
        });
    }

    return(
        <>
        <DeleteConfirmationModal 
            show={delete_modal_show}
            handleClose={handleCancelDelete}
            text="Do you really want to delete this product record? It will result in REMOVAL of ALL payment records tied to it. THIS CAN NOT BE UNDONE!"
            handleSubmit={handleSubmitDelete}/>
        <div className="top-menu">
            <div className="button-back"><Button variant="primary" onClick={props.handleBack}>Back</Button></div>
        </div>
        <Table variant="dark" striped bordered hover responsive="sm">
            <ProductTableHead/>
            <tbody>
                {getProductRow()}
            </tbody>
        </Table>
        <Form>
            <Row className="mt-2">
                <Form.Group as={Col} controlId="formName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control placeholder="Name" value={product_name} onChange={handleProductNameChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGame">
                    <Form.Label>Product Information</Form.Label>
                    <Form.Control placeholder="Game" value={product_information} onChange={handleProductInformationChange}/>
                </Form.Group>

            </Row>
            <Row className="mt-2">
                <Form.Group as={Col} controlId="formUrl">
                    <Form.Label>Price (CZK)</Form.Label>
                    <Form.Control placeholder="Icon URL" value={product_priceCzk} onChange={handleProductCzkPriceChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formInformation">
                    <Form.Label>Price (EUR)</Form.Label>
                    <Form.Control placeholder="Server Info" value={product_priceEur} onChange={handleProductEurPriceChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formCodename">
                    <Form.Label>CodeName</Form.Label>
                    <Form.Control placeholder="Codename" value={product_codename} onChange={handleProductCodenameChange}/>
                </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} controlId="formSubmit" className="mb-4 mt-3">
                    <div className="button-in-row"><Button variant="primary" onClick={handleSubmit}>Update</Button></div>
                    <div className="button-in-row"><Button variant="danger" onClick={handleDelete}>Delete</Button></div>
                </Form.Group>
            </Row>
        </Form>
        </>
    )
}

export default SingleProductView;