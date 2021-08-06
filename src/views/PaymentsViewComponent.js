import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PaymentRow from '../components/PaymentRow';
import PaymentPaginator from '../components/PaymentPaginator';
import ItemsPerPageDropdown from '../components/ItemsPerPageDropdown';
import UserSearchComponent from '../components/UserSearchComponent';
import PaymentTableHead from '../components/PaymentTableHead';

function PaymentsViewComponent(props) {
    const [payments, setPayments] = useState([]);
    const [pg, setPg] = useState(1);
    const [numPage, setNumPage] = useState(20);

    useEffect(() => {
        requestPaymentTable(props.api_key, numPage, pg)
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

    const requestPaymentTable = (akey, npage, pgn) => {
        return fetch(props.api_url + "Payments/" + akey + "/show/" + npage + "/page/" + pgn.toString())
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
                        main_info={data.mainInfo}
                        other_info={data.otherInfo}
                        status={data.status}
                        activated={data.activated}
                        key={data.id}
                        onIdClick={handleIdClick}/>
                    );
                });
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
            <PaymentPaginator firstPage={setFirstPage} setPage={setPage} current_page={pg} disable_next={getLength(payments) < numPage}/>
            <ItemsPerPageDropdown current={numPage} onClick={setNumOnPage}/>
            <div class="button-back"><Button variant="primary" onClick={props.handleShowServers}>Servers</Button></div>
            <UserSearchComponent searchUser={props.handleSearchUserClick}/>
        </div>
        <Table variant="dark" striped bordered hover responsive="sm">
            <PaymentTableHead/>
            <tbody>
                {payments}
            </tbody>
        </Table>
        <div class="footer-menu">
            <PaymentPaginator firstPage={setFirstPage} setPage={setPage} current_page={pg} disable_next={getLength(payments) < numPage}/>
            <ItemsPerPageDropdown current={numPage} onClick={setNumOnPage}/>
        </div>
        </>
    );
}

export default PaymentsViewComponent;