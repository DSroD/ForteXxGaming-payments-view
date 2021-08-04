import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function ItemsPerPageDropdown(props) {

    const handleClick = (event) => {
        console.log(event.target)
        props.onClick(Number(event.target.text));
    }

    return (
        <DropdownButton title={"Items per page: " + props.current}>
            <Dropdown.Item eventKey="di_10" onClick={handleClick}>10</Dropdown.Item>
            <Dropdown.Item eventKey="di_20" onClick={handleClick}>20</Dropdown.Item>
            <Dropdown.Item eventKey="di_50" onClick={handleClick}>50</Dropdown.Item>
            <Dropdown.Item eventKey="di_100" onClick={handleClick}>100</Dropdown.Item>
            <Dropdown.Item eventKey="di_200" onClick={handleClick}>200</Dropdown.Item>
        </DropdownButton>
    )
}

export default ItemsPerPageDropdown;