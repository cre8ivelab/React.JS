import React from 'react';
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';

class Sale extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sale: {},
            loading: true
        }

        this.itemTotal = this.itemTotal.bind(this);
    }

    itemTotal(items){
        let total = 0;
        items.forEach(item => {
            total += (item.price * item.quantity);
        });
        return total;
    }

    componentDidMount(){
        fetch("https://sheltered-ridge-30188.herokuapp.com/api/sales/" + this.props.id)
            .then(res => res.json())
            .then((result) => {
                if(result._id){
                    this.props.viewedSale(result._id);
                }
                this.setState({sale: result, loading: false});
            });
    }

    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            this.setState({loading: false});
            fetch("https://sheltered-ridge-30188.herokuapp.com/api/sales/" + this.props.id)
            .then(res => res.json())
            .then((result) => {
                if(result._id){
                    this.props.viewedSale(result._id);
                }
                this.setState({sale: result});
            });
        }
    }

    render(){
        if (this.state.loading) {
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        } 
        else {
            if (this.state.sale._id) {
                return (
                    <div>
                        <h1>Sale: {this.state.sale._id}</h1>
                        <h2>Customer</h2>
                        <ListGroup>
                            <ListGroupItem><strong>email:</strong> {this.state.sale.customer.email}</ListGroupItem>
                            <ListGroupItem><strong>age:</strong> {this.state.sale.customer.age}</ListGroupItem>
                            <ListGroupItem><strong>satisfaction:</strong>  {this.state.sale.customer.satisfication}/5</ListGroupItem>
                        </ListGroup>
                        <h2> {this.itemTotal(this.state.sale.items)}</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sale.items.map((item, index) =>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                );
            } 
            else {
                return <div><h1>Unable to find Sale</h1><p>id: {this.props.id}</p></div>
            }
        }           
    }
}

export default Sale;