import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; /* Enables the Main component to subscribe to the store*/
import { actions } from 'react-redux-form';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';



class Main extends Component {

//   onDishSelect(dishId) {
//     this.setState({ selectedDish: dishId});
//     }

componentDidMount() {
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
}



  render() {

    const HomePage = () => {
        return(
            // render featured dish, featured promotion and featured leader
            <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
        );
      }
    
    const DishWithId = ({match}) => {
        return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            addComment={this.props.addComment}
          />
        );
      };

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
                    <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>}
                    />
                    {/* passing component as callback enables us pass props */}
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Route exact path='/contactus' component={() =>
                  <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}
                  />
                <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />}/>
                <Redirect to="/home" />
            </Switch>
            <Footer />
            
        </div>
        
    );
  }
  
}

// dispatch is a store function accessed through the connect function
const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}, // to reset the form
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

const mapStateToProps = (state) => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

// Surround Main with connect so that it is subscribed to  the store
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Main));