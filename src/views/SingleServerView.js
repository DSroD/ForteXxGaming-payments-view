import React, { useState, useEffect } from "react";
import ServerTableHead from "../components/server/ServerTableHead";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ServerApi from "../api/ServerApi";
import ServerRow from "../components/server/ServerRow";

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
                info={server.info}
                iconUrl={server.iconURL}/>
        )
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

        <div class="footer-menu">
          <div class="button-back">
            <Button variant="primary" onClick={props.handleBack}>Back</Button>
          </div>
        </div>
        </>        
    )

}

export default SingleServerView;