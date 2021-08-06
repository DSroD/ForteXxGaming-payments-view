import React, {useState, useEffect} from "react";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PaymentRow from "../components/PaymentRow";
import UserSearchComponent from '../components/UserSearchComponent';
import PaymentTableHead from "../components/PaymentTableHead";

function SingleUserViewComponent(props) {

    const [payment, setPayment] = useState(null);
    const [status, setStatus] = useState("");
    const [mainInfo, setMainInfo] = useState("");
    const [user, setUser] = useState("");
    
    useEffect(() => {
        requestUserById(props.api_key, props.id)
        .then((r) => {
                if(r === null) {
                    props.throwForbidden();
                }
                else {
                    setPayment(r);
                    setStatus(r.status);
                    setMainInfo(r.mainInfo);
                    setUser(r.user);
                }
        });
        return () => {
            
        }
    }, [props])

    const requestUserById = (akey, id) => {
        return fetch(props.api_url + "Payments/" + akey + "/id/" + id )
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

    const getPaymentRow = () => {
        if (payment === null || payment === undefined) {
            return null;
        }
        return(<PaymentRow 
        id={payment.id} 
        payment_id={payment.paymentId} 
        payment_date={payment.paymentDate}
        payment_type={payment.paymentType} 
        value={payment.value} 
        currency={payment.currency}
        user={payment.user}
        main_info={payment.mainInfo}
        other_info={payment.otherInfo}
        status={payment.status}
        activated={payment.activated}
        key={payment.id}/>);
    }

    const handleUserChange = (event) => {
        setUser(event.target.value);
    }

    const handleInfoChange = (event) => {
        setMainInfo(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    return (
        <>
        <div class="top-menu">
            <div class="button-back"><Button variant="primary" onClick={props.handleBack}>Back</Button></div>
            <UserSearchComponent searchUser={props.handleSearchUserClick}/>
        </div>
        <Table variant="dark" striped bordered hover responsive="sm">
            <PaymentTableHead/>
            <tbody>
                {getPaymentRow()}
            </tbody>
        </Table>

        <Form>
            <Row>
                <Form.Group as={Col} controlId="formUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Username" value={user} onChange={handleUserChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formInfo">
                    <Form.Label>Info</Form.Label>
                    <Form.Control placeholder="Info" value={mainInfo} onChange={handleInfoChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control placeholder="Status" value={status} onChange={handleStatusChange}/>
                </Form.Group>
            </Row>
        </Form>

        <div class="footer-menu">
          <div class="button-back">
            <Button variant="primary" onClick={props.handleBack}>Back</Button>
          </div>
        </div>
        </>
    );
}

export default SingleUserViewComponent;