import React, { useState, useEffect } from "react";

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

function SingleServerView(props) {
    const [server, setServer] = useState(null);
    const [products, setProducts] = useState([]);
    const [server_name, setServerName] = useState("");
    const [server_game, setServerGame] = useState("");
    const [server_icon, setServerIcon] = useState("")
    const [server_information, setServerInformation] = useState("");

    useEffect(() => {
        ServerApi.requestServerById(props.api_key, props.id)
        .then((r) => {
            if(r === null) {
                props.throwForbidden();
            }
            else {
                setServer(r);
                setServerName(r.name);
                setServerGame(r.game);
                setServerIcon(r.iconURL);
                setServerInformation(r.information);
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
                id={server.id}
                name={server.name}
                game={server.game}
                info={server.information}
                iconUrl={server.iconURL}/>
        )
    }

    const getProductRows = () => {
        if (products === null || products === undefined) {
            return null;
        }
        return products.map((p) => {
            return (
                <ProductRow
                id={p.id}
                information={p.information}
                priceCzk={p.priceCzk}
                priceEur={p.priceEur}/>
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

    const handleSubmit = (event) => {
        ServerApi.updateServerId(props.api_key, {
            id: server.id,
            name: server_name,
            game: server_game,
            iconURL: server_icon,
            information: server_information
        })
        .then((r) => {
            if(r === null) {
                props.throwForbidden();
            }
            else {
                setServer(r);
                setServerName(r.name);
                setServerGame(r.game);
                setServerIcon(r.iconURL);
                setServerInformation(r.information);
            }
        });
    }

    return(
        <>
        <div class="top-menu">
            <div class="button-back"><Button variant="primary" onClick={props.handleBack}>Back</Button></div>
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
                    <Button variant="primary" onClick={handleSubmit}>Update</Button>
                </Form.Group>
            </Row>
        </Form>

        <div class="text-white">
                <h4>Products</h4>
        </div>

        <Table variant="dark" striped bordered hover responsive="sm">
            <ProductTableHead/>
            <tbody>
                {getProductRows()}
            </tbody>
        </Table>

        <div class="footer-menu">
          <div class="button-back">
            <Button variant="primary" onClick={props.handleBack}>Back</Button>
          </div>
        </div>
        </>        
    )

}

export default SingleServerView;