import React from "react";
import css from "./style.module.css";
import Grid from '@react-css/grid';

const BuildControls = props => {
  function getVal() {
    const val = document.getElementById('cash').value;
    let inputc = document.getElementById('change')
    inputc.value = val - props.price;
  }
  
  function showAlert(value) {
    alert('You have selected: ' + value);
  }
  function selectRadio() {
    document.getElementById('contactChoice1').checked = false
    document.getElementById('contactChoice2').checked = false
  }
  return (
    <div>
      <p className={css.BuildControls}>
        Order cost   : <strong>{props.price}</strong>
      </p>
      <Grid columns='5% 30% 5% 30% 10% 20%'>
        <label></label>
        <label>Cash:</label> 
        <label></label> 
        <label>Change:</label> 
        <label></label> 
        <label>Pos:</label> 
      </Grid>
      <Grid columns='5%  30% 5% 30% 10% 20%'>
        <label></label>
        <input type="number" id="cash" name="cash" onChange={() => getVal()}/> 
        <label></label> 
        <input type="number" id="change" name="change" readOnly/>
        <label></label> 
        <input type="checkbox" id="contactChoice" name="Pos" value="Pos" />
      </Grid>
      <p></p>
      <Grid autoFlow='column' className={css.Slct}> 
        <Grid.Item justifySelf='end'>
          Card:<input type="radio" id="contactChoice1" name="contact" value="Card"/>
        </Grid.Item>
        <Grid.Item >
          Account:<input type="radio" id="contactChoice2" name="contact" value="Transfer"/>
        </Grid.Item>
        <Grid.Item>
          <button onClick={()=>selectRadio()}>
          <strong>reset</strong>
          </button>
        </Grid.Item>
        <Grid.Item column='4 / 4' justifySelf='end' >
          <button
          onClick={props.showConfirmModal}
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

export default BuildControls;
