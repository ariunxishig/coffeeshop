import React, { Component } from "react";
import { connect } from "react-redux";
import MenuList from "../../components/MenuList";
import BuildControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal";
import Spinner from "../../components/General/Spinner";
import OrderSummary from "../../components/OrderSummary";
import {BaseProvider, LightTheme} from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import * as actions from "../../redux/actions/prodAction";
import * as oneprodact from "../../redux/actions/action";
import axios from "../../axios-orders";
const engine = new Styletron();

class BurgerBuilder extends Component {
  state = {
    purchasing: true,
    confirmOrder: false,
    data: []
  };

  continueOrder = () => {
    console.log("continue daragdlaa...");
    // const order ={
    //   orts:this.state.ingredients,
    //   dun: this.props.totalPrice,
    // }
    const dbProds = require("../../database/orders.json");
    axios.post("orders.json", dbProds).then(response =>{
        alert("Amjilttai hadgalaglaa")
    });
  };
  
  showConfirmModal = () => {
    this.setState({ 
      confirmOrder: true,
      purchasing: true 
    });
  };

  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };
  
  componentDidMount() {
    this.props.loadProds();
  };
  
  render() {
    return (
      <div>
        <Modal
          closeConfirmModal={this.closeConfirmModal}
          show={this.state.confirmOrder}
        >
          <OrderSummary
            onCancel={this.closeConfirmModal}
            onContinue={this.continueOrder}
            price={this.props.totalPrice}
          />
        </Modal>
        <BuildControls
          showConfirmModal={this.showConfirmModal}
          disabled={!this.state.purchasing}
          price={this.props.totalPrice}
        />
        {this.props.loading && <Spinner/>}
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <MenuList 
              data={this.props.data}
              orderNem={this.props.orderNem}
              orderHas={this.props.orderHas}
              orderAdd={this.props.orderAdd}
              orderSub={this.props.orderSub}
            />
          </BaseProvider>
        </StyletronProvider>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    data : state.prodReducer.data,
    loading: state.prodReducer.loading,
    totalPrice : state.prodReducer.totalPrice
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    loadProds: () => dispatch(actions.loadProds()),
    orderNem: (cmdNo, products, title, idx) => dispatch(oneprodact.incDecProds(cmdNo, products, title, idx)),
    orderHas: (cmdNo, products, title, idx) => dispatch(oneprodact.incDecProds(cmdNo, products, title, idx)),
    orderAdd: (cmdNo, products, title, idx) => dispatch(oneprodact.incDecProds(cmdNo, products, title, idx)),
    orderSub: (cmdNo, products, title, idx) => dispatch(oneprodact.incDecProds(cmdNo, products, title, idx))
  }
}
export default  connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
