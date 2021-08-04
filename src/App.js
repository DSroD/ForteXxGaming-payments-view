import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import PaymentsViewComponent from './components/PaymentsViewComponent';
import PaymentRow from './components/PaymentRow';
import LimitedPaymentsViewComponent from './components/LimitedPaymentsViewComponent';
import LimitedPaymentRow from './components/LimitedPaymentRow';
import PasswordPopup from './components/PasswordPopup';
import PaymentPaginator from './components/PaymentPaginator';
import ForbiddenPopup from './components/ForbiddenPopup';
import ItemsPerPageDropdown from './components/ItemsPerPageDropdown';
import UserSearchComponent from './components/UserSearchComponent';


function App() {
  const [key, setKey] = useState("");
  const [view, setView] = useState(0);
  // 0 - view all records, page; 1 - view user records; 2 - view and edit single record; 3 - BI view
  const [payments, setPayments] = useState([]);
  const [pg, setPg] = useState(1);
  const [numPage, setNumPage] = useState(20);
  const [forbidden_show, setForbiddenShow] = useState(false);

  const API_URL = "https://localhost:5001/Payment/";

  const requestPaymentTable = (akey, npage, pgn) => {
    fetch(API_URL + akey + "/show/" + npage + "/page/" + pgn.toString())
      .then(res => res.json())
      .then(
        (result) => {
          const handleIdClick = (id) => {
            requestUserById(akey, id);
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
              )
            })
            setPayments(array);
          }
          else {
            setPayments(array);
            setForbiddenShow(true);
          }
          setView(0);
        },
        (error) => {
          // Nothing yet...
        }
      );
  }

  const requestLimitedTableByUser = (akey, user) => {
    fetch(API_URL + akey + "/check/" + user )
      .then(res => res.json())
      .then(
        (result) => {
          const handleIdClick = (id) => {
            requestUserById(akey, id);
          }
          let array = [];
          if(result.status !== 403) {
            array = result.map((data, key) => {
              return (
                <LimitedPaymentRow 
                  id={data.id} 
                  payment_date={data.paymentDate}
                  payment_type={data.paymentType} 
                  value={data.value} 
                  currency={data.currency}
                  user={data.user}
                  main_info={data.mainInfo}
                  activated={data.activated}
                  key={data.id}
                  onIdClick={handleIdClick}/>
              )
            })
            setPayments(array);
            setView(1);
          }
          else {
            setPayments(array);
            setForbiddenShow(true);
          }
        },
        (error) => {
          // Nothing yet...
        }
      );
  }

  const requestUserById = (akey, id) => {
    fetch(API_URL + akey + "/id/" + id )
      .then(res => res.json())
      .then(
        (result) => {
          let array = [];
          if(result.status !== 403) {
            array = [
              <PaymentRow 
                id={result.id} 
                payment_id={result.paymentId} 
                payment_date={result.paymentDate}
                payment_type={result.paymentType} 
                value={result.value} 
                currency={result.currency}
                user={result.user}
                main_info={result.mainInfo}
                other_info={result.otherInfo}
                status={result.status}
                activated={result.activated}
                key={result.id}/>
            ];
            setPayments(array);
            setView(2);
          }
          else {
            setPayments(array);
            setForbiddenShow(true);
          }
        },
        (error) => {
          // Nothing yet...
        }
      );
  }

  const onKeySet = (akey) => {
    setKey(akey);
    requestPaymentTable(akey, 20, 1);
  }

  const handleSearchUserClick = (username) => {
    requestLimitedTableByUser(key, username);
  }

  const setFirstPage = () => {
    setPage(1);
    requestPaymentTable(key, numPage, 1);
  }

  const setPage = (n) => {
    n < 1 ? setPg(1) : setPg(n);
    requestPaymentTable(key, numPage, n);
  }

  const setNumOnPage = (n) => {
    n < 1 ? setNumPage(20) : setNumPage(n);
    setPg(1);
    requestPaymentTable(key, n, 1);
  }

  const handleForbiddenClose = () => {
    setForbiddenShow(false);
  }

  const handleBackToZeroView = () => {
    requestPaymentTable(key, numPage, pg);
  }

  const view0 = () => {
    return (
      <>
        <div class="top-menu">
          <PaymentPaginator firstPage={setFirstPage} setPage={setPage} current_page={pg} disable_next={payments.length < numPage}/>
          <ItemsPerPageDropdown current={numPage} onClick={setNumOnPage}/>
          <UserSearchComponent searchUser={handleSearchUserClick}/>
        </div>
          <PaymentsViewComponent payments={payments}/>
        <div class="footer-menu">
          <PaymentPaginator firstPage={setFirstPage} setPage={setPage} current_page={pg} disable_next={payments.length < numPage}/>
          <ItemsPerPageDropdown current={numPage} onClick={setNumOnPage}/>
        </div>
      </>
    );
  }

  const view1 = () => {
    return (
      <>
        <div class="top-menu">
          <div class="button-back"><Button variant="primary" onClick={handleBackToZeroView}>Back</Button></div>
          <UserSearchComponent searchUser={handleSearchUserClick}/>
        </div>
          <LimitedPaymentsViewComponent payments={payments}/>
        <div class="footer-menu">
          <div class="button-back">
            <Button variant="primary" onClick={handleBackToZeroView}>Back</Button>
          </div>
        </div>
      </>
    )
  }

  const view2 = () => {
    return(
      <>
        <div class="top-menu">
          <div class="button-back"><Button variant="primary" onClick={handleBackToZeroView}>Back</Button></div>
          <UserSearchComponent searchUser={handleSearchUserClick}/>
        </div>
          <PaymentsViewComponent payments={payments}/>
        <div class="footer-menu">
          <div class="button-back">
            <Button variant="primary" onClick={handleBackToZeroView}>Back</Button>
          </div>
        </div>
      </>
    )
  }

  const viewRouter = () => {
    switch(view) {
      case 0:
        return view0();
      case 1:
        return view1();
      case 2:
        return view2();

    }
  }
    
  return (
    <div className="App">
      <header className="App-header">
          <h2>Fortexx Payment Service</h2>
      </header>
      <main>
        <Container fluid>
          <PasswordPopup setKey={onKeySet}/>
          <ForbiddenPopup show={forbidden_show} handleClose={handleForbiddenClose}/>
          {viewRouter()}
        </Container>
      </main>
    </div>
  );
}

export default App;
