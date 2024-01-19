import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import Grid from '@react-css/grid';
import { connect } from "react-redux";
import * as orderAction from "../../redux/actions/orderActions";
const BuildControls = props => {
  useEffect(()=>{setChange();}, [props.totalPrice]);

  async function getVal() {
    let csh = 0;
    if(document.getElementById('cash').value!=='') {
      csh = parseInt(document.getElementById('cash').value);
      if(csh > props.totalPrice) {
        document.getElementById('change').value = csh - parseInt(props.totalPrice);
      }else{
        document.getElementById('change').value = 0;
      }
      await props.calcChange(csh);
    }
  }

  function setChange(){
    if(document.getElementById('cash').value!=='') {
      let csh = parseInt(document.getElementById('cash').value);
      if(csh > props.totalPrice) {
        document.getElementById('change').value = csh - parseInt(props.totalPrice);
      }else{
        document.getElementById('change').value = 0;
      }
    }
  }
  
  function deselectRadio() {
    document.getElementById('contactChoice1').checked = false;
    document.getElementById('contactChoice2').checked = false;
  }
  
  async function chgProp(){
    let orderType ={
      totalprice: 0,
      card: 0,
      pos: true,
      transfer: 0
    }
    orderType.pos = document.getElementById('contactChoice').checked;
    orderType.totalprice= props.totalPrice;
    if (document.getElementById('contactChoice1').checked && props.totalPrice > props.cash){
      orderType.card= props.totalPrice - props.cash;
    }else if (document.getElementById('contactChoice2').checked && props.totalPrice > props.cash){
      orderType.transfer= props.totalPrice - props.cash;
    }else if(!document.getElementById('contactChoice1').checked && !document.getElementById('contactChoice2').checked){
      if(props.totalPrice > props.cash){
        console.log("end sorry gsn alert hiih");
        return
      }
    }
    await props.saveOrderType(orderType);
    return (props.showConfirmModal)
  }

  return (
    <div>
      <p className={css.BuildControls}>
        Order cost: <strong>{props.price}</strong>
      </p>
      <Grid columns='5% 30% 5% 30% 10% 20%'>
          <label></label><label>Cash:</label> 
          <label></label><label>Change:</label> 
          <label></label><label>Pos:</label> 
        </Grid>
        <Grid columns='5% 30% 5% 30% 10% 20%'>
          <label></label><input type="number" id="cash" name="cash" onChange={()=>getVal()}/> 
          <label></label><input type="number" id="change" name="change" readOnly/>
          <label></label><input type="checkbox" id="contactChoice" name="Pos" value="Pos"/>
        </Grid>
        <p></p>
        <Grid autoFlow='row' className={css.Slct}> 
          <Grid.Item>
            Card:<input type="radio" id="contactChoice1" name="contact" value="Card"/>
          </Grid.Item>
          <Grid.Item >
            Account:<input type="radio" id="contactChoice2" name="contact" value="Transfer"/>
          </Grid.Item>
          <Grid.Item>
            <button onClick={()=>deselectRadio()}>
            < strong>reset</strong>
            </button>
          </Grid.Item>
          <Grid.Item column='4 / 4' justifySelf='end'>
            <button
              onClick={()=>chgProp()}
              disabled={props.disabled}
              className={css.OrderButton}
            >
            <strong>PAY</strong>
          </button>
          </Grid.Item>
        </Grid>
    </div>
  );
};

//export default BuildControls;
const mapStateToProps = state =>{
  return {
    orderid: state.orderReducer.orderid,
    isRegistered: state.orderReducer.isRegistered,
    totalPrice : state.prodReducer.totalPrice,
    cash: state.orderReducer.cash,
    card: state.orderReducer.card,
    pos: state.orderReducer.pos,
    transfer: state.orderReducer.transfer,
    totalprice : state.orderReducer.totalprice,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    saveOrderType: (order) => dispatch(orderAction.saveOrderType(order)),
    calcChange: (prods) => dispatch(orderAction.calcChange(prods))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);
