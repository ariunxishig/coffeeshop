import React, { useState, useEffect } from "react";
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

const BurgerBuilder =(props) => {
  const [purchasing, setPurchasing] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  useEffect(()=>{
    props.loadProds();
  }, []);
  
  useEffect(()=>{
    props.totalPrice === 0 ? setPurchasing(true) : setPurchasing(false);
  });

  const continueOrder = () => {
    // console.log("continue daragdlaa...");
    // const dbProds = require("../../database/orders.json");
    // axios.post("orders.json", dbProds).then(response =>{
    //     alert("Amjilttai hadgalaglaa")
    // });
  };
  
  const showConfirmModal = () => {
    setConfirmOrder(true);
    setPurchasing(true);
  };

  const closeConfirmModal = () => {
    setConfirmOrder(false);
    setPurchasing(false);
  };
  
  return (
    <div>
      <Modal
        closeConfirmModal={closeConfirmModal}
        show={confirmOrder}
      >
        <OrderSummary
          onCancel={closeConfirmModal}
          onContinue={continueOrder}
          price={props.totalPrice}
          data = {props.data}
        />
      </Modal>
      <BuildControls
        showConfirmModal={showConfirmModal}
        disabled={purchasing}
        price={props.totalPrice}
      />
      {props.loading && <Spinner/>}
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <MenuList 
            data={props.data}
            orderNem={props.orderNem}
            orderHas={props.orderHas}
            orderAdd={props.orderAdd}
            orderSub={props.orderSub}
          />
        </BaseProvider>
      </StyletronProvider>
    </div>
  );
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
