import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PaymentsViewComponent from './views/PaymentsViewComponent';
import LimitedPaymentsViewComponent from './views/PaymentsViewByNameComponent';
import SingleUserViewComponent from './views/SingleUserViewComponent';
import ServersView from './views/ServersView';
import PasswordPopup from './components/PasswordPopup';
import ForbiddenPopup from './components/ForbiddenPopup';


function App() {
  const [api_key, setKey] = useState("");
  const [view, setView] = useState(-1);
  const [pervView, setPervView] = useState(0);
  // 0 - view all records, page; 1 - view user records; 2 - view and edit single record;
  // 3 - BI view; 4 - Server view; 5 - Single server view; 6 - Products view;
  // 7 - single product view

  const [forbidden_show, setForbiddenShow] = useState(false);
  const [username, setUsername] = useState("");
  const [id, setId] = useState(0);
  const [server_id, setServerId] = useState(0);

  const API_URL = "https://localhost:5001/";

  const onKeySet = (akey) => {
    setKey(akey);
    console.log(akey);
    setView(0); 
  }

  const handleSearchUserClick = (u) => {
    setUsername(u);
    if(view !== 1) {
      setPervView(view);
    }
    setView(1);
  }

  const handleUserIDClick = (id) => {
    setId(id);
    setPervView(view);
    setView(2);
  }

  const handleShowServersClick = () => {
    setPervView(view);
    setView(4);
  }

  const handleServerIDClick = (id) => {
    setServerId(id);
    setPervView(view);
    setView(5);
  }

  const closeForbidden = () => {
    setForbiddenShow(false);
  }

  const showForbidden = () => {
    setForbiddenShow(true);
  }

  const handleBackClick = () => {
    setPervView(view);
    setView(pervView);
  }

  const view0 = () => {
    return (
      <PaymentsViewComponent
        api_key={api_key}
        throwForbidden={showForbidden}
        handleSearchUserClick={handleSearchUserClick}
        handleIdClick={handleUserIDClick}
        handleShowServers={handleShowServersClick}
        api_url={API_URL}/>
    );
  }

  const view1 = () => {
    return (
      <LimitedPaymentsViewComponent
      api_key={api_key}
      username={username}
      throwForbidden={showForbidden}
      handleSearchUserClick={handleSearchUserClick}
      handleIdClick={handleUserIDClick}
      handleBack={handleBackClick}
      api_url={API_URL}/>
    );
  }

  const view2 = () => {
    return (
      <SingleUserViewComponent
        api_key={api_key}
        id={id}
        throwForbidden={showForbidden}
        handleSearchUserClick={handleSearchUserClick}
        handleIdClick={handleUserIDClick}
        handleBack={handleBackClick}
        api_url={API_URL}/>
    );
  }

  const view3 = () => {

  }

  const view4 = () => {
    return (
      <ServersView
      api_key={api_key}
      api_url={API_URL}
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
