import React from 'react';
import Table from 'react-bootstrap/Table';

class PaymentsViewComponent extends React.Component {

    render() {
        return(
            <Table variant="dark" striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">PaymentID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Value</th>
                        <th scope="col">Currency</th>
                        <th scope="col">User</th>
                        <th scope="col">Info</th>
                        <th scope="col">Additional info</th>
                        <th scope="col">Status</th>
                        <th scope="col">Activated</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.payments}
                </tbody>
            </Table>
        );
    }
}

export default PaymentsViewComponent;