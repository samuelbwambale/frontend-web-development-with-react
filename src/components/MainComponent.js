import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; /* Enables the Main component to subscribe to the store*/
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { postComment, fetchDishes,
  fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';


class Main extends Component {

componentDidMount() {
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
  this.props.fetchLeaders();
}

  render() {

    console.log('leaders >>>>>', this.props.leaders)

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
              leader={
                this.props.leaders.leaders.filter(leader => leader.featured)[0]
              }
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
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
            postComment={this.props.postComment}
          />
        );
      };

    return (
      <div>
            {/* <Header />
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={() => 
                    <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>}
                    />
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Route exact path='/contactus' component={() =>
                  <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}
                  />
                <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />}/>
                <Redirect to="/home" />
            </Switch>
            <Footer /> */}

            <Header />
            <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => 
                    <About
                      leaders={this.props.leaders.leaders}
                      isLoading={this.props.leaders.isLoading}
                      errMess={this.props.leaders.errMess} 
                    />} />
                  <Route exact path='/menu' component={() => 
                    <Menu dishes={this.props.dishes} />} 
                  />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => 
                    <Contact
                      resetFeedbackForm={this.props.resetFeedbackForm}
                      postFeedback={this.props.postFeedback}
                      />}
                  />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
            <Footer />
            
        </div>
        
    );
  }
  
}

// dispatch is a store function accessed through the connect function
const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}, // to reset the form
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) =>
    dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
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