import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import PaymentRow from '../components/PaymentRow';
import UserSearchComponent from '../components/UserSearchComponent';
import PaymentTableHead from '../components/PaymentTableHead';

import ServerApi from '../api/ServerApi';
import ReactTooltip from 'react-tooltip';

function PaymentsViewByNameComponent(props) {

    const [payments, setPayments] = useState([]);
    useEffect(() => {
        ServerApi.requestPaymentsTableByUser(props.api_key, props.username)
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

        const getPaymentRows = () => {
            if (payments === null || payments === undefined)
            {
                return null;
            }
            const handleIdClick = (id) => {
                props.handleIdClick(id);
            }
            return payments.map((data) => {
                return(
                    <PaymentRow 
                    id={data.id} 
                    payment_id={data.paymentId} 
                    payment_date={data.paymentDate}
                    payment_type={data.paymentType} 
                    value={data.value} 
                    currency={data.currency}
                    user={data.user}
                    server={data.serverName}
                    serverId={data.serverId}
                    product={data.productName}
                    productId={data.productId}
                    main_info={data.mainInfo}
                    other_info={data.otherInfo}
                    status={data.status}
                    activated={data.activated}
                    key={data.id}
                    onIdClick={handleIdClick}/>
                )
            })
        }

    return(
        <>
        <div className="top-menu">
          <div className="button-back"><Button variant="primary" onClick={props.handleBack}>Back</Button></div>
          <UserSearchComponent searchUser={props.handleSearchUserClick}/>
        </div>
        <Table variant="dark" striped bordered hover responsive="sm">
            <PaymentTableHead/>
            <tbody>
                {getPaymentRows()}
            </tbody>
        </Table>
        <div className="footer-menu">
          <div className="button-back">
            <Button variant="primary" onClick={props.handleBack}>Back</Button>
          </div>
        </div>
        <ReactTooltip id='pinfo' />
        </>
    );
}

export default PaymentsViewByNameComponent;