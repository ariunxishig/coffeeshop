import React from "react";
import css from "./style.module.css";
import Grid from '@react-css/grid';

const BuildControls = props => {
  let val2 = 0;
  function getVal() {
    const val = document.getElementById('cash').value;
    val2 = val - props.price;
    let inputc = document.getElementById('change')
    inputc.value = val2;
  }
  return (
    <div>
      <p className={css.BuildControls}>
        Order cost : <strong>{props.price}</strong>
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
      <Grid autoFlow='column' className={css.BuildControls}> 
        <Grid.Item justifySelf='end'>
          Card:<input className={css.Radiobox} type="radio" id="contactChoice1" name="contact" value="Card" />
        </Grid.Item>
        <Grid.Item >
          Account:<input className={css.Radiobox} type="radio" id="contactChoice2" name="contact" value="Transfer" />
        </Grid.Item>
        <Grid.Item column='3 / 3' justifySelf='end' >
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
