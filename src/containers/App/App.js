import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { url } from "../../utils/api";

import Test from "../../test/Test";

import Auxiliary from "../../assets/hoc/Auxiliary/Auxiliary";
import Main from "../../components/Main/Main";
import BoxDelivery from "../../components/BoxDelivery/BoxDelivery";
import BucketMain from "../../components/BucketMain/BucketMain";
import Menu from "../../components/Menu/Menu";
import Restaurant from "../../components/Restaurant/Restaurant";
import Contacts from "../../components/Contacts/Contacts";
import Reviews from "../Reviews/Reviews";
import FirmCatering from "../FirmCatering/FirmCatering";
import ScrollToTop from "../../assets/hoc/ScrollToTop/ScrollToTop";
import OfficeCatering from "../OfficeCatering/OfficeCatering";

class App extends Component {
  state = {
    boxDeliveryData: [],
    boxDeliveryBucket: [],
    ordering: false,
    modalRequest: false,
    boxPopUp: false,
    review: false,
    popUpBoxId: 0,
    categories: [],
    modal: false,
    message: ''
  };

  componentDidMount = () => {

    fetch(`${url}/api/v1/box/`)
      .then(response => response.json())
      .then(data => this.setState({ boxDeliveryData: data }))
      .catch(error => console.log(error));

    fetch(`${url}/api/v1/menu/list/`)
      .then(response => response.json())
      .then(data => this.setState({ categories: data }))
      .catch(error => console.log(error));
  };

  takeMessage = event => this.setState({message: event.currentTarget.dataset.message})

  modalToggle = () => this.setState({modal: !this.state.modal})

  clearBucket = () => this.setState({boxDeliveryBucket: []})

  addDefaultCount = event => {
    let id = event.target.id;
    let menu = [
      ...this.state.boxDeliveryData.map(el => {
        if (el.id === Number(id)) {
          return { ...el, default_count: el.default_count + 1 };
        } else return el;
      })
    ];

    this.setState({
      boxDeliveryData: menu
    });
  };

  subDefaultCount = event => {
    let id = event.target.id;
    let menu = [
      ...this.state.boxDeliveryData.map(el => {
        if (el.id === Number(id)) {
          return { ...el, default_count: el.default_count - 1 };
        } else return el;
      })
    ];

    this.setState({
      boxDeliveryData: menu
    });
  };

  addToBucketBox = event => {
    let id = event.target.id;

    let isItemInBox = this.state.boxDeliveryBucket.some(
      el => el.id === Number(id)
    );

    if (isItemInBox) {
      let additionalCount = this.state.boxDeliveryData.find(
        el => el.id === Number(id)
      ).default_count;

      let newArr = this.state.boxDeliveryBucket.map(el => {
        if (el.id === Number(id)) {
          return {
            ...el,
            count: el.count + additionalCount,
            totalPrice: el.totalPrice + el.price * additionalCount
          };
        } else return el;
      });

      this.setState({
        boxDeliveryBucket: newArr
      });
    } else {
      let orderItem = this.state.boxDeliveryData.find(
        el => el.id === Number(id)
      );

      let orderObj = {
        name: orderItem.name,
        count: orderItem.default_count,
        totalPrice: orderItem.default_count * orderItem.price,
        price: orderItem.price,
        image: orderItem.image,
        id: orderItem.id
      };

      let newArr = [...this.state.boxDeliveryBucket];

      newArr.push(orderObj);

      this.setState({
        boxDeliveryBucket: newArr
      });
    }
  };

  removeFromBucketBox = event => {
    let id = event.target.id;

    let newArr = [...this.state.boxDeliveryBucket].filter(
      el => el.id !== Number(id)
    );

    this.setState({
      boxDeliveryBucket: newArr
    });
  };

  addBoxCount = event => {
    let id = event.target.id;
    let menu = [
      ...this.state.boxDeliveryBucket.map(el => {
        if (el.id === Number(id)) {
          return {
            ...el,
            count: el.count + 1,
            totalPrice: el.totalPrice + el.price
          };
        } else return el;
      })
    ];

    this.setState({
      boxDeliveryBucket: menu
    });
  };

  subBoxCount = event => {
    let id = event.target.id;
    let menu = [
      ...this.state.boxDeliveryBucket.map(el => {
        if (el.id === Number(id)) {
          return {
            ...el,
            count: el.count - 1,
            totalPrice: el.totalPrice - el.price
          };
        } else return el;
      })
    ];

    this.setState({
      boxDeliveryBucket: menu
    });
  };

  orderingChange = () => {
    this.setState({
      ordering: !this.state.ordering
    });
  };

  modalRequestChange = () => {
    this.setState({
      modalRequest: !this.state.modalRequest
    });
  };

  boxPopUpOff = () => {
    this.setState({
      boxPopUp: false
    });
  };

  boxPopUpOn = () => {
    this.setState({
      boxPopUp: true
    });
  };

  boxInfoHandler = event => {
    let id = Number(event.target.id);

    this.setState({
      popUpBoxId: id
    });
  };

  reviewToggle = () => {
    this.setState({
      review: !this.state.review
    });
  };

  render() {
    return (
      <Fragment>
        <Switch>
        <ScrollToTop>
          {/* =============================MAIN PAGE================================== */}

          <Route
         
            exact
            path="/"
            render={props => (
              <Main
                {...props}
                modalToggle={this.modalToggle}
                message={this.state.message}
                modal={this.state.modal}
                boxDeliveryBucket={this.state.boxDeliveryBucket}
                categories={this.state.categories}
                path={this.props.location.pathname}
              />
            )}
          />

          <Route
          
            exact
            path="/Menu"
            render={props => (
              <Menu
                {...props}
                boxDeliveryBucket={this.state.boxDeliveryBucket}
                categories={this.state.categories}
                path={this.props.location.pathname}
              />
            )}
          />
          <Route
          
            exact
            path="/Catering"
            render={props => (
              <FirmCatering
                {...props}
                categories={this.state.categories}
                boxDeliveryBucket={this.state.boxDeliveryBucket}
                path={this.props.location.pathname}
              />
            )}
          />

          <Route 
            path="/BoxDelivery"
            render={props => (
              <BoxDelivery
                {...props}
                takeMessage={this.takeMessage}
                modalToggle={this.modalToggle}
                message={this.state.message}
                modal={this.state.modal}
                modalRequest={this.state.modalRequest}
                modalRequestChange={this.modalRequestChange}
                boxInfoHandler={this.boxInfoHandler}
                popUpBoxId={this.state.popUpBoxId}
                popUp={this.state.boxPopUp}
                boxPopUpOff={this.boxPopUpOff}
                boxPopUpOn={this.boxPopUpOn}
                path={this.props.location.pathname}
                addDefaultCount={this.addDefaultCount}
                subDefaultCount={this.subDefaultCount}
                boxDeliveryData={this.state.boxDeliveryData}
                addToBucketBox={this.addToBucketBox}
                categories={this.state.categories}
                boxDeliveryBucket={this.state.boxDeliveryBucket}
              />
            )}
          />

          <Route 
            path="/Restaurant"
            render={props => (
              <Restaurant
                {...props}
                boxDeliveryBucket={this.state.boxDeliveryBucket}
                categories={this.state.categories}
                path={this.props.location.pathname}
              />
            )}
          />
          <Route 
            path="/Reviews"
            render={props => (
              <Reviews
                {...props}
                takeMessage={this.takeMessage}
                modalToggle={this.modalToggle}
                message={this.state.message}
                modal={this.state.modal}
                boxDeliveryBucket={this.state.boxDeliveryBucket}
                reviewToggle={this.reviewToggle}
                review={this.state.review}
                categories={this.state.categories}
                path={this.props.location.pathname}
              />
            )}
          />
          <Route  path="/AboutUs" render={props => <Test {...props} />} />
          <Route
            path="/Contacts"
            render={props => (
              <Contacts
                {...props}
                takeMessage={this.takeMessage}
                modalToggle={this.modalToggle}
                message={this.state.message}
                modal={this.state.modal}
                boxDeliveryBucket={this.state.boxDeliveryBucket}
                categories={this.state.categories}
                path={this.props.location.pathname}
              />
            )}
          />
          <Route  path="/OfficeCatering" render={props => 
          <OfficeCatering {...props}
            boxDeliveryBucket={this.state.boxDeliveryBucket}
            categories={this.state.categories}
            path={this.props.location.pathname}
          />} />

          <Route
          
            path="/DeliveryAndPayment"
            render={props => <Test {...props} />}
          />

          <Route 
            path="/Bucket"
            render={props => (
              <BucketMain
                {...props}
                clearBucket={this.clearBucket}
                takeMessage={this.takeMessage}
                modalToggle={this.modalToggle}
                categories={this.state.categories}
                path={this.props.location.pathname}
                orderForm={this.state.orderForm}
                removeFromBucketBox={this.removeFromBucketBox}
                boxDeliveryBucket={this.state.boxDeliveryBucket}
                addBoxCount={this.addBoxCount}
                subBoxCount={this.subBoxCount}
                ordering={this.state.ordering}
                orderingChange={this.orderingChange}
              />
            )}
          />

          {/* ==============================Menu routes========================================== */}

          {this.state.categories.map(el => {
            return (
              <Route
              
                key={el.slug}
                path={`/${el.name}`}
                render={props => (
                  <Auxiliary
                    {...props}
                    boxDeliveryBucket={this.state.boxDeliveryBucket}
                    path={this.props.location.pathname}
                    category={el}
                    categories={this.state.categories}
                  />
                )}
              />
            );
          })}
          </ScrollToTop>
        </Switch>
      </Fragment>
    );
  }
}
export default withRouter(App);
