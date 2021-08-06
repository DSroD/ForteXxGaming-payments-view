import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import PaymentRow from '../components/PaymentRow';
import UserSearchComponent from '../components/UserSearchComponent';
import PaymentTableHead from '../components/PaymentTableHead';

function PaymentsViewByNameComponent(props) {

    const [payments, setPayments] = useState([]);
    useEffect(() => {
        requestPaymentsTableByUser(props.api_key, props.username)
        .then((r) => {
            if(r === null) {
                props.throwForbidden();
            }
            else {
                setPayments(r);
            }
        });
        return () => {
            
        }
    }, [props])

    const requestPaymentsTableByUser = (akey, user) => {
        return fetch(props.api_url + "Payments/" + akey + "/name/" + user )
            .then(res => res.json())
            .then(
            (result) => {
                const handleIdClick = (id) => {
                props.handleIdClick(id);
                }
                let array = [];
                if(result.status !== 403) {
                    array = result.map((data, key) => {
                        return (
                            <PaymentRow 
                            id={data.id} 
                            payment_id={data.paymentId} 
                            payment_date={data.paymentDate}
                            payment_type={data.paymentType} 
                            value={data.value} 
                            currency={data.currency}
                            user={data.user}
                            server={data.server}
                            product={data.product}
                            main_info={data.mainInfo}
                            other_info={data.otherInfo}
                            status={data.status}
                            activated={data.activated}
                            key={data.id}
                            onIdClick={handleIdClick}/>
                        )
                    })
                }
                else {
                return null;
                }
                return array;
            },
            (error) => {
                // Nothing yet...
            }
            );
        }

    return(
        <>
        <div class="top-menu">
          <div class="button-back"><Button variant="primary" onClick={props.handleBack}>Back</Button></div>
          <UserSearchComponent searchUser={props.handleSearchUserClick}/>
        </div>
        <Table variant="dark" striped bordered hover responsive="sm">
            <PaymentTableHead/>
            <tbody>
                {payments}
            </tbody>
        </Table>
        <div class="footer-menu">
          <div class="button-back">
            <Button variant="primary" onClick={props.handleBack}>Back</Button>
          </div>
        </div>
        </>
    );
}

export default PaymentsViewByNameComponent;