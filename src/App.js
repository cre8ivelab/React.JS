import React from 'react';  
import './App.css';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import Sales from './Sales';
import Sale from './Sale';
import NotFound from './NotFound';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      recentlyViewed: [],
      serchId: ""
    };

    this.viewedSale = this.viewedSale.bind(this);
    this.updateSearchId = this.updateSearchId.bind(this);
  }

  viewedSale(id){
    this.setState((state) => {
      if(state.recentlyViewed.indexOf(id) === -1){
        state.recentlyViewed.push(id);
        return {recentlyViewed: state.recentlyViewed};
      }
    });   
  }

  updateSearchId(e){
    let value = e.target.value;
    this.setState((state) => {
      state.serchId = value;
    });
  }

  render(){
    return(
      <div>
        <Navbar inverse collapseOnSelect staticTop>
          <Navbar.Header>
            <LinkContainer to="/">
            <Navbar.Brand>
              Sales React App
            </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/Sales">
               <NavItem>All Sales</NavItem>
              </LinkContainer>
              <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
                {this.state.recentlyViewed.length > 0 ? 
                this.state.recentlyViewed.map((id, index)=>(
                <LinkContainer to={`/Sale/${id}`} key={index}>
                <MenuItem >Sale: {id}</MenuItem>
                  </LinkContainer> )) :
                <MenuItem>...</MenuItem>}
              </NavDropdown>
            </Nav>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl type="text" onChange={this.updateSearchId} placeholder="Sale ID" />
              </FormGroup>{' '}
              <Link className="btn btn-default" to={"/Sale/" + this.state.searchId}>Search</Link>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <Grid>
          <Row>
            <Col md={12}>
              <Switch>
                <Route exact path="/" render={()=>(
                  <Redirect push to={"/Sales"} />
                )}/>
                <Route exact path="/Sales" render={()=>(
                  <Sales />
                )}/>
                <Route path="/Sale/:id" render = {(props)=>(
                  <Sale id={props.match.params.id} viewedSale = {this.viewedSale} />
                )} />
                <Route render={()=>(
                  <NotFound />
                )} />
              </Switch>
            </Col>
          </Row>
        </Grid>
      </div>
    );
    }
}

export default App;
