import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    }
  }

  componentDidMount() {
    console.log("Main component componentDidMount invoked");
}

componentDidUpdate() {
    console.log("Main component componentDidUpdate invoked");
}

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
    }

  render() {

    console.log("Main component render invoked");

    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <div className="container">
            <Menu
                dishes={this.state.dishes}
                onClick={(dishId) => this.onDishSelect(dishId)}
                />
            <div className="col">
            <DishDetail
                dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} 
                />
            </div>
            
        </div>
        
      </div>
    );
  }
  
}

export default Main;