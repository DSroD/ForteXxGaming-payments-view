import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PaymentRow from '../components/PaymentRow';
import PaymentPaginator from '../components/PaymentPaginator';
import ItemsPerPageDropdown from '../components/ItemsPerPageDropdown';
import UserSearchComponent from '../components/UserSearchComponent';
import PaymentTableHead from '../components/PaymentTableHead';

import ServerApi from '../api/ServerApi';

function PaymentsViewComponent(props) {
    const [payments, setPayments] = useState([]);
    const [pg, setPg] = useState(1);
    const [numPage, setNumPage] = useState(20);

    useEffect(() => {
        ServerApi.requestPaymentTable(props.api_key, numPage, pg)
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
    }, [props, pg, numPage])

    const setFirstPage = () => {
        setPage(1);
    }
    
    const setPage = (n) => {
        n < 1 ? setPg(1) : setPg(n);
    }
    
    const setNumOnPage = (n) => {
        n < 1 ? setNumPage(20) : setNumPage(n);
        setPg(1);
    }

    const getLength = (list) => {
        if (list==null) {
            return 0;
        }
        return list.length;
    }

    const getPaymentArray = () => {
        if (payments === null || payments === undefined) {
            return null;
        }
        const handleIdClick = (id) => {
            props.handleIdClick(id);
        }
        return payments.map((data, key) => {
            return (
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
            );
        });
    }

    return(
        <>
        <div className="top-menu">
            <PaymentPaginator firstPage={setFirstPage} setPage={setPage} current_page={pg} disable_next={getLength(payments) < numPage}/>
            <ItemsPerPageDropdown current={numPage} onClick={setNumOnPage}/>
            <div className="button-back"><Button variant="primary" onClick={props.handleShowServers}>Servers</Button></div>
            <UserSearchComponent searchUser={props.handleSearchUserClick}/>
        </div>
        <Table variant="dark" striped bordered hover responsive="sm">
            <PaymentTableHead/>
            <tbody>
                {getPaymentArray()}
            </tbody>
        </Table>
        <div className="footer-menu">
            <PaymentPaginator firstPage={setFirstPage} setPage={setPage} current_page={pg} disable_next={getLength(payments) < numPage}/>
            <ItemsPerPageDropdown current={numPage} onClick={setNumOnPage}/>
        </div>
        </>
    );
}

export default PaymentsViewComponent;