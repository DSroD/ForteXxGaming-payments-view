import { useState, useEffect } from "react";

import ServerTableHead from "../components/server/ServerTableHead";
import ServerRow from "../components/server/ServerRow";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ServerApi from "../api/ServerApi";
import ProductTableHead from "../components/products/ProductTableHead";
import ProductRow from "../components/products/ProductRow";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewProductModal from "../components/products/NewProductModal";

function SingleServerView(props) {
    const [server, setServer] = useState(null);
    const [products, setProducts] = useState([]);
    const [server_name, setServerName] = useState("");
    const [server_codeName, setServerCodeName] = useState("");
    const [server_game, setServerGame] = useState("");
    const [server_icon, setServerIcon] = useState("")
    const [server_information, setServerInformation] = useState("");
    const [delete_modal_show, setDeleteModalShow] = useState(false);
    const [newproduct_modal_show, setNewProductModalShow] = useState(false);

    useEffect(() => {
        ServerApi.requestServerById(props.api_key, props.id)
        .then((r) => {
            if(r === null) {
                props.throwForbidden();
            }
            else {
                setServer(r);
                setServerName(r.name || "");
                setServerCodeName(r.codeName || "");
                setServerGame(r.game || "");
                setServerIcon(r.iconURL || "");
                setServerInformation(r.information || "");
            }
        });
        ServerApi.requestProductsByServerId(props.api_key, props.id)
        .then((r) => {
            if(r === null) {
                props.throwForbidden();
            }
            else {
                setProducts(r);
            }
        })
    }, [props]);

    const getServerRow = () => {
        if(server === null || server === undefined) {
            return null;
        }
        return(
            <ServerRow
                id={props.id}
                name={server.name}
                codeName = {server.codeName}
                game={server.game}
                info={server.information}
                iconUrl={server.iconURL}/>
        )
    }

    const handleProductIdClick = (id) => {
        props.handleProductIdClick(id);
    }

    const getProductRows = () => {
        if (products === null || products === undefined) {
            return null;
        }
        return products.map((p) => {
            return (
                <ProductRow
                key={p.name+p.id}
                id={p.id}
                name={p.name}
                codename={p.codeName}
                information={p.information}
                priceCzk={p.priceCzk}
                priceEur={p.priceEur}
                onIdClick={handleProductIdClick}/>
            );
        })
    }

    const handleServerNameChange = (event) => {
        setServerName(event.target.value);
    }

    const handleServerGameChange = (event) => {
        setServerGame(event.target.value);
    }

    const handleServerIconChange = (event) => {
        setServerIcon(event.target.value);
    }

    const handleServerInformationChange = (event) => {
        setServerInformation(event.target.value);
    }

    const handleServerCodeNameChange = (event) => {
        setServerCodeName(event.target.value);
    }

    const handleSubmit = (event) => {
        ServerApi.updateServer(props.api_key, {
            id: props.id,
            name: server_name,
            codeName: server_codeName,
            game: server_game,
            iconURL: server_icon,
            information: server_information
        }).then((r) => {
            if(r === null) {
                props.throwForbidden();
            }
            else {
                setServer(r);
                setServerName(r.name || "");
                setServerCodeName(r.codeName || "");
                setServerGame(r.game || "");
                setServerIcon(r.iconURL || "");
                setServerInformation(r.information || "");
            }
        });
    }

    const handleDelete = (event) => {
        setDeleteModalShow(true);
    }

    const handleCancelDelete = () => {
        setDeleteModalShow(false);
    }

    const handleSubmitDelete = () => {
        ServerApi.deleteServerById(props.api_key, props.id)
        .then((r) => {
            if(r === false) {
                setDeleteModalShow(false);
                props.throwForbidden();
            } else {
                props.handleBack();
            }
        });
    }

    const handleNewProduct = () => {
        setNewProductModalShow(true);
    }

    const handleCancelNewProduct = () => {
        setNewProductModalShow(false);
    }

    const handleSubmitNewProduct = (rt) => {
        setNewProductModalShow(false);
        ServerApi.createProduct(props.api_key, rt)
        .then((r) => {
            if(r === null) {
                props.throwForbidden();
            }
            else {
                setProducts([...products, r]);
            }
        });
    }

    return(
        <>
        <DeleteConfirmationModal 
            show={delete_modal_show}
            handleClose={handleCancelDelete}
            text="Do you really want to delete this server record? It will result in REMOVAL of ALL products and payment records tied to it. THIS CAN NOT BE UNDONE!"
            handleSubmit={handleSubmitDelete}/>
        <NewProductModal
            show={newproduct_modal_show}
            handleCancel={handleCancelNewProduct}
            handleSubmit={handleSubmitNewProduct}
            server_id={props.id || -1}/>
        <div className="top-menu">
            <div className="button-back"><Button variant="primary" onClick={props.handleBack}>Back</Button></div>
        </div>
        <Table variant="dark" striped bordered hover responsive="sm">
            <ServerTableHead/>
            <tbody>
                {getServerRow()}
            </tbody>
        </Table>
        <Form>
            <Row className="mt-2">
                <Form.Group as={Col} controlId="formName">
                    <Form.Label>Server Name</Form.Label>
                    <Form.Control placeholder="Name" value={server_name} onChange={handleServerNameChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGame">
                    <Form.Label>Server Game</Form.Label>
                    <Form.Control placeholder="Game" value={server_game} onChange={handleServerGameChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formCodename">
                    <Form.Label>Codename</Form.Label>
                    <Form.Control placeholder="Codename" value={server_codeName} onChange={handleServerCodeNameChange}/>
                </Form.Group>

            </Row>
            <Row className="mt-2">
                <Form.Group as={Col} controlId="formUrl">
                    <Form.Label>Icon URL</Form.Label>
                    <Form.Control placeholder="Icon URL" value={server_icon} onChange={handleServerIconChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formInformation">
                    <Form.Label>Server Info</Form.Label>
                    <Form.Control placeholder="Server Info" value={server_information} onChange={handleServerInformationChange}/>
                </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} controlId="formSubmit" className="mb-4 mt-3">
                    <div className="button-in-row"><Button variant="primary" onClick={handleSubmit}>Update</Button></div>
                    <div className="button-in-row"><Button variant="danger" onClick={handleDelete}>Delete</Button></div>
                </Form.Group>
            </Row>
        </Form>

        <div className="text-white d-inline-block mx-1">
            <h4>Products</h4>
        </div>
        <div className="text-white d-inline-block mx-1 py-2">
            <Button variant="outline-success" size="small" onClick={handleNewProduct}><FontAwesomeIcon icon={faPlusSquare}/></Button>
        </div>

        <Table variant="dark" striped bordered hover responsive="sm">
            <ProductTableHead/>
            <tbody>
                {getProductRows()}
            </tbody>
        </Table>

        <div className="footer-menu">
          <div className="button-back">
            <Button variant="primary" onClick={props.handleBack}>Back</Button>
          </div>
        </div>
        </>        
    )

}

export default SingleServerView;