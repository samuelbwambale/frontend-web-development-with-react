import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    //   selectedDish: null
    }
  }

//   onDishSelect(dishId) {
//     this.setState({ selectedDish: dishId});
//     }

  render() {

    const HomePage = () => {
        return(
            <Home />
        );
    }

    return (
      <div>
            <Header />
            {/* <Menu
                dishes={this.state.dishes}
                onClick={(dishId) => this.onDishSelect(dishId)}
                />
            <div className="col">
            <DishDetail
                dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} 
                />
            </div> */}

            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={() => 
                    <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>}
                    />
                    {/* passing component as callback enables us pass props */}
                <Redirect to="/home" />
            </Switch>
            <Footer />
            
        </div>
        
    );
  }
  
}

export default Main;