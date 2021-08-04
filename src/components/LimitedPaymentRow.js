import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

function LimitedPaymentRow(props) {

    const onIdClick = () => {
        props.onIdClick(props.id);
    }

    return (
        <tr>
            <th scope="row"><Button variant="secondary" onClick={onIdClick} disabled={(typeof(props.onIdClick) === undefined)}>{props.id}</Button></th>
            <th>{new Intl.DateTimeFormat("default", {
          year: "numeric",
          month: "numeric",
          day: "2-digit",
          hour: 'numeric', minute: 'numeric', second: 'numeric',
        }).format(Date.parse(props.payment_date))}</th>
            <th>{props.payment_type || " - "}</th>
            <th>{props.value || " - "}</th>
            <th>{props.currency || " - "}</th>
            <th>{props.user || " - "}</th>
            <th>{props.main_info || " "}</th>
            <th>{props.activated ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</th>
        </tr>
    )
}

export default LimitedPaymentRow;