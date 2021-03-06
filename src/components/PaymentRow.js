import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

function PaymentRow(props) {

    const onIdClick = () => {
        props.onIdClick(props.id);
    }

    return (
        <tr data-tip={`<div> ${(props.main_info || "")}</div><div>${(props.other_info || "")}"</div>`} data-for='pinfo'>
            <th scope="row"><Button variant="secondary" onClick={onIdClick} disabled={(props.onIdClick === undefined)}>{props.id}</Button></th>
            <td>{props.payment_id || "-"}</td>
            <td>{new Intl.DateTimeFormat("en-GB", {
                    year: "numeric", month: "numeric", day: "2-digit",
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                })
                .format(Date.parse(props.payment_date))}</td>
            <td>{props.payment_type}</td>
            <td>{props.value || "-"}</td>
            <td>{props.currency || "-"}</td>
            <td>{props.user}</td>
            <td>{props.server || "?"}</td>
            <td>{props.product || "?"}</td>
            <td>{props.status || "-"}</td>
            <td>{props.activated ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</td>
        </tr>
        
    )
}

export default PaymentRow;