import Pagination from 'react-bootstrap/Pagination';

function PaymentPaginator(props) {
    const nextPage = () => {
        props.setPage(props.current_page + 1);
    }

    const previousPage = () => {
        props.setPage(props.current_page - 1);
    }
    return (
        <Pagination>
            <Pagination.First disabled={props.current_page === 1} onClick={props.firstPage}/>
            <Pagination.Prev disabled={props.current_page === 1} onClick={previousPage}/>
            <Pagination.Item disabled>{props.current_page}</Pagination.Item>
            <Pagination.Next disabled={props.disable_next} onClick={nextPage}/>
        </Pagination>
    );
}

export default PaymentPaginator;