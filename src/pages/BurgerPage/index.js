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
import * as orderAction from "../../redux/actions/orderActions";
const engine = new Styletron();

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  useEffect(()=>{props.loadProds()}, []);
  
  useEffect(()=>{
    props.totalPrice === 0 ? setPurchasing(true) : setPurchasing(false);
  }, [props.totalPrice]);
  
  const continueOrder = () => {
    console.log("continue daragdlaa...");
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleTimeString()
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();
    const dateString = currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth;
    let products= [];
    props.recOrder(props.data);
    console.log(props);
    // if(props.data){
    //   props.data.map((el, index)=> {
    //     el[4].forEach(element => {
    //       if(element[1] > 0 ){
    //         let unitxCost = element[5] * element[1];
    //         products.push({
    //           "prodID": element[4],
    //           "unit": element[1],
    //           "price": element[5],
    //           "unit x price": unitxCost
    //         });
    //       }
    //       if(element[2] > 0 ){
    //         let unitCost = element[5]; //db deerh product une[5]
    //         let unitxCost = unitCost * element[2];
    //         let prodID = element[4];
    //         if(element[4]>50 && element[4]<70){
    //           unitCost = element[5] + element[6]; //big smoothieshake 5k nemegdene [6]
    //           unitxCost = unitCost * element[2];
    //           prodID = parseInt(String(element[4])+7);
    //         } 
    //         else if((element[4]>10 && element[4]<19) || (element[4]>70 && element[4]<80)){
    //           unitCost = element[5] + element[7]; //cold coffee 2k nemegdene [7]
    //           unitxCost = unitCost * element[2];
    //         } 
    //         products.push({
    //           "prodID": prodID,
    //           "unit": element[1],
    //           "price": unitCost,
    //           "unit x price": unitxCost});
    //       }
    //     })
    //   }) 
      
    //   var key = dateString +" "+ timestamp + "|" + props.userId + "|" + 0;
    //   const orders = {[key]: products}
    //   console.log(orders);

    //   axios.post("orders.json", orders).then(response =>{
    //     setConfirmOrder(false);
    //   });
      
    // }
    setConfirmOrder(false);
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
    totalPrice : state.prodReducer.totalPrice,
    userId: state.signupReducer.userId,
    cash: state.orderReducer.cash
    // orderid: state.orderReducer.orderid,
    // isRegistered: state.orderReducer.isRegistered,
    // totalprice: state.orderReducer.totalprice,
    
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    loadProds: () => dispatch(actions.loadProds()),
    orderNem: (cmdNo, products, title, idx) => dispatch(oneprodact.incDecProds(cmdNo, products, title, idx)),
    orderHas: (cmdNo, products, title, idx) => dispatch(oneprodact.incDecProds(cmdNo, products, title, idx)),
    orderAdd: (cmdNo, products, title, idx) => dispatch(oneprodact.incDecProds(cmdNo, products, title, idx)),
    orderSub: (cmdNo, products, title, idx) => dispatch(oneprodact.incDecProds(cmdNo, products, title, idx)),
    recOrder: (prods) => dispatch(orderAction.rec(prods))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
