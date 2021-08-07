import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import ServerTableHead from '../components/server/ServerTableHead';
import ServerRow from '../components/server/ServerRow';


import ServerApi from '../api/ServerApi';
import NewServerModal from '../components/server/NewServerModal';

function ServerView(props) {
    const [servers, setServers] = useState([]);
    const [nsrwshow, setNsrwShow] = useState(false);

    useEffect(() => {
        ServerApi.requestServers(props.api_key)
        .then((r) => {
                if(r === null) {
                    props.throwForbidden();
                }
                else {
                    setServers(r);
                }
        });
        return () => {
            
        }
    }, [props])

    const handleIdClick = (id) => {
        props.handleIdClick(id);
    }

    const handleCreateNew = () => {
        setNsrwShow(true);
    }

    const handleCreateNewSubmit = (rt) => {
        setNsrwShow(false);
        ServerApi.createServer(props.api_key, rt)
            .then((r) => {
                if(r === null) {
                    props.throwForbidden();
                }
                else {
                    setServers([...servers, r]);
                }
            })
    }

    const handleCreateNewCancel = () => {
        setNsrwShow(false);
    }

    const mapServers = () => {
        if (servers === null || servers === undefined) {
            return null;
        }
        return servers.map((s) => <ServerRow id={s.id} name={s.name} game={s.game} info={s.information} iconUrl={s.iconURL} onIdClick={handleIdClick}/>)
    }

    return(
        <>
        <NewServerModal show={nsrwshow} handleCloseSubmit={handleCreateNewSubmit} handleCloseCancel={handleCreateNewCancel}/>
        <div class="top-menu">
            <div class="button-back"><Button variant="primary" onClick={props.handleBack}>Back</Button></div>
            <dic class="button-create"><Button variant="success" onClick={handleCreateNew}>Create New</Button></dic>
        </div>
        <div class="text-white">
                <h4>Server View</h4>
        </div>
        <Table variant="dark" striped bordered hover responsive="sm">
            <ServerTableHead/>
            <tbody>
                {mapServers()}
            </tbody>
        </Table>
        <div class="footer-menu">
          <div class="button-back">
            <Button variant="primary" onClick={props.handleBack}>Back</Button>
          </div>
          <div class="button-create">
            <Button variant="success" onClick={handleCreateNew}>Create New</Button>
          </div>
        </div>
        </>
    )

}

export default ServerView;