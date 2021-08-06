import Button from "react-bootstrap/Button";

function ServerRow(props) {
    const onIdClick = () => {
        props.onIdClick(props.id);
    }

    return (
        <tr>
            <th scope="row"><Button variant="secondary" onClick={onIdClick} disabled={(props.onIdClick === undefined)}>{props.id}</Button></th>
            <td>{props.iconUrl ? <><img width="16px" height="16px" src={props.iconUrl}/></> : <></>}{props.name}</td>
            <td>{props.game}</td>
            <td>{props.info}</td>
        </tr>
    );
}

export default ServerRow;