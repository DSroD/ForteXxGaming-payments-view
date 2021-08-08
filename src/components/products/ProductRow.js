import Button from "react-bootstrap/Button";

function ProductRow(props) {
    const onIdClick = () => {
        props.onIdClick(props.id);
    }
    
    return (
        <tr>
            <th scope="row"><Button variant="secondary" onClick={onIdClick} disabled={(props.onIdClick === undefined)}>{props.id}</Button></th>
            <td>{props.name}</td>
            <td>{props.codename}</td>
            <td>{props.information}</td>
            <td>{props.priceCzk}</td>
            <td>{props.priceEur}</td>
        </tr>
    );
}

export default ProductRow;