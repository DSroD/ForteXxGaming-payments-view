import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PaymentsViewComponent from './views/PaymentsViewComponent';
import PaymentsViewByNameComponent from './views/PaymentsViewByNameComponent';
import SinglePaymentViewComponent from './views/SinglePaymentViewComponent';
import ServersView from './views/ServersView';
import PasswordPopup from './components/PasswordPopup';
import ForbiddenPopup from './components/ForbiddenPopup';
import SingleServerView from './views/SingleServerView';
import SingleProductView from './views/SingleProductView';


function App() {
  const [api_key, setKey] = useState("");
  const [view, setView] = useState(-1);
  const [pervView, setPervView] = useState([0]);
  // 0 - view all records, page; 1 - view user records; 2 - view and edit single record;
  // 3 - BI view; 4 - Server view; 5 - Single server view; 6 - Products view;
  // 7 - single product view

  const [forbidden_show, setForbiddenShow] = useState(false);
  const [username, setUsername] = useState("");
  const [id, setId] = useState(0);
  const [server_id, setServerId] = useState(0);
  const [product_id, setProductId] = useState(0);

  const onKeySet = (akey) => {
    setKey(akey);
    var pvs = [...pervView];
    setView(pvs.pop()); 
    setPervView(pvs);
  }

  const handleSearchUserClick = (u) => {
    setUsername(u);
    if(view !== 1) {
      setPervView([...pervView, view]);
    }
    setView(1);
  }

  const handleUserIDClick = (id) => {
    setId(id);
    setPervView([...pervView, view]);
    setView(2);
  }

  const handleShowServersClick = () => {
    setPervView([...pervView, view]);
    setView(4);
  }

  const handleServerIDClick = (id) => {
    setServerId(id);
    setPervView([...pervView, view]);
    setView(5);
  }

  const handleProductIdClick = (id) => {
    setProductId(id);
    setPervView([...pervView, view]);
    setView(6);
  }

  const closeForbidden = () => {
    setForbiddenShow(false);
    setPervView([...pervView, view]);
    setView(-1);
  }

  const showForbidden = () => {
    setForbiddenShow(true);
  }

  const handleBackClick = () => {
    var pvs = [...pervView];
    var nv = pvs.pop()
    setPervView(pvs);
    setView(nv);
  }

  const view0 = () => {
    return (
      <PaymentsViewComponent
        api_key={api_key}
        throwForbidden={showForbidden}
        handleSearchUserClick={handleSearchUserClick}
        handleIdClick={handleUserIDClick}
        handleShowServers={handleShowServersClick}/>
    );
  }

  const view1 = () => {
    return (
      <PaymentsViewByNameComponent
      api_key={api_key}
      username={username}
      throwForbidden={showForbidden}
      handleSearchUserClick={handleSearchUserClick}
      handleIdClick={handleUserIDClick}
      handleBack={handleBackClick}/>
    );
  }

  const view2 = () => {
    return (
      <SinglePaymentViewComponent
        api_key={api_key}
        id={id}
        throwForbidden={showForbidden}
        handleSearchUserClick={handleSearchUserClick}
        handleIdClick={handleUserIDClick}
        handleBack={handleBackClick}/>
    );
  }

  const view3 = () => {

  }

  const view4 = () => {
    return (
      <ServersView
      api_key={api_key}
      throwForbidden={showForbidden}
      handleBack={handleBackClick}
      handleIdClick={handleServerIDClick}/>
    )
  }

  const view5 = () => {
    return (
      <SingleServerView
      api_key={api_key}
      id={server_id}
      throwForbidden={showForbidden}
      handleBack={handleBackClick}
      handleProductIdClick={handleProductIdClick}/>
    )
  }

  const view6 = () => {
    return (
      <SingleProductView
      api_key={api_key}
      id={product_id}
      throwForbidden={showForbidden}
      handleBack={handleBackClick}/>
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
      case 4:
        return view4();
      case 5:
        return view5();
      case 6:
        return view6();
      default:
        return <PasswordPopup setKey={onKeySet}/>;

    }
  }
    
  return (
    <div className="App">
      <header className="App-header">
          <h2>Fortexx Payment Service</h2>
      </header>
      <main>
        <Container fluid>
          <ForbiddenPopup show={forbidden_show} handleClose={closeForbidden}/>
          {viewRouter()}
        </Container>
      </main>
    </div>
  );
}

export default App;
