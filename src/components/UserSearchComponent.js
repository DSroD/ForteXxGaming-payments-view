import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function UserSearchComponent(props) {
    const [search_user, setSearchUser] = useState("");

    const handleChange = (event) => {
        setSearchUser(event.target.value);
    }

    const handleKeyPress = (event) => {
        if(event.charCode === 13) {
            props.searchUser(event.target.value);
          }
    }

    const searchUser = () => {
        props.searchUser(search_user);
    }

    return (
        <div className="user-search">
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Username"
                aria-label="username"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={searchUser}>
                    Search
                </Button>
            </InputGroup>
        </div>
    )
}

export default UserSearchComponent;