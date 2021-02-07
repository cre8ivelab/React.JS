import React from 'react';
import { withRouter } from 'react-router-dom';
import  { Table, Pagination } from 'react-bootstrap';

class Sales extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sales: [],
            currentPage: 1
        }

    this.getData = this.getData.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    }

    getData(page){
        return new Promise(function(resolve,reject){
            fetch("https://sheltered-ridge-30188.herokuapp.com/api/sales?page=" + page + "&perPage=10")
            .then(res => res.json())
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err));
        });  
    }

    componentDidMount(){
        this.getData(this.state.currentPage)
        .then((json) => {
            this.setState({sales : json});
        })
        .catch(err=>console.log("Error: " + JSON.stringify(err)));
    }

    previousPage(){
        if(this.state.currentPage > 1){
            this.getData(this.state.currentPage - 1)
            .then((json) => {
                this.setState((state) => {
                    return {
                        sales: json,
                        currentPage: state.currentPage - 1
                    }
                });
            });   
        }
    }

    nextPage(){
        this.getData(this.state.currentPage + 1)
        .then((json) => {
            this.setState((state) =>{
                return {
                    sales: json,
                    currentPage: state.currentPage + 1
                }
            })
        });
    }

    render(){
        if(this.state.sales.length > 0){
            return (
                <div>
                    <Table hover>
                        <thead>
                        <tr>
                                <th>Customer</th>
                                <th>Store Location</th>
                                <th>Number of Items</th>
                                <th>Sale Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sales.map((sale) =>
                                <tr key={sale._id} onClick={()=>{this.props.history.push(`/Sale/${sale._id}`)}}>
                                    <td>{sale.customer.email}</td>
                                    <td>{sale.storeLocation}</td>
                                    <td>{sale.items.length}</td>
                                    <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={this.previousPage} />
                        <Pagination.Item>{this.state.currentPage}</Pagination.Item>
                        <Pagination.Next onClick={this.nextPage} />
                    </Pagination>
                </div>
            );
        }
        else{
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        }

    }
}

export default withRouter(Sales);