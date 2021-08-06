import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ServerTableHead from '../components/server/ServerTableHead';
import ServerRow from '../components/server/ServerRow';

function ServerView(props) {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        requestServers(props.api_key)
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

    const requestServers = (akey) => {
        return fetch(props.api_url + "Servers/" + akey + "/list")
            .then(res => res.json())
            .then(
            (result) => {
                let rt = null;
                if(result.status !== 403) {
                    rt = result;
                }
                return rt;
            },
            (error) => {
                // Nothing yet...
            }
        );
    }

    const handleIdClick = (id) => {

    }

    const mapServers = () => {
        if (servers === null || servers === undefined) {
            return null;
        }
        return servers.map((s) => <ServerRow id={s.id} name={s.name} game={s.game} info={s.info} iconUrl={s.iconURL} onIdClick={handleIdClick}/>)
    }

    return(
        <>
        <div class="top-menu">
            <div class="button-back"><Button variant="primary" onClick={props.handleBack}>Back</Button></div>
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
        </div>
        </>
    )

}

export default ServerView;