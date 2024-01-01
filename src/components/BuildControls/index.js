import React from "react";
import css from "./style.module.css";



const BuildControls = props => {
  let val2 = 0;
  function getVal() {
    const val = document.getElementById('cash').value;
    val2 = val - props.price;
    let inputc = document.getElementById('change')
    inputc.value = val2;
  }
  return (
    <div className={css.BuildControls}>
      <p>
        Order cost : <strong>{props.price}</strong>
      </p>
      <div className={css.BuildInputs}>
        Cash: <input type="number" id="cash" name="cash" onChange={() => getVal()}/> 
        Change: <input type="number" id="change" name="change" readOnly/>
        Pos: <input type="checkbox" id="contactChoice" name="Pos" value="Pos" />
      </div>
      <div className={css.BuildInputs}>
        <label>Card</label>
        <input className={css.Radiobox} type="radio" id="contactChoice1" name="contact" value="Card" />
        <label>Transfer</label>
        <input className={css.Radiobox} type="radio" id="contactChoice2" name="contact" value="Transfer" />
        <button
          onClick={props.showConfirmModal}
          disabled={props.disabled}
          className={css.OrderButton}
        >
        <strong>PAY</strong>
      </button>
      </div>
    </div>
  );
};

export default BuildControls;
