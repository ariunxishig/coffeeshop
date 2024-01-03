import React from "react";
import Button from "../General/Button";

const OrderSummary = props => {
  let products =[]
  if(props.data){
    props.data.map((el, index)=> {
      el[4].forEach(element => {
        if(element[1] > 0 ){
          
          if((element[4]>10 && element[4]<19) || (element[4]>70 && element[4]<80)){
            products.push(`${element[0]} (HOT) ${element[5]} x ${element[1]} = ` + element[3]);
          } 
          else if(element[4]>50 && element[4]<70){
            products.push(`${element[0]} (SMALL) ${element[5]} x  ${element[1]} = ` + element[3]);
          }
        }
        if(element[2] > 0 ){
          let unitCost = element[5];
          if(element[4]>50 && element[4]<70){
            unitCost = element[5] + element[6];
            products.push(`${element[0]} (COLD)  ${unitCost} x ${element[2]} = ` + unitCost * element[2]);
          } 
          else if((element[4]>10 && element[4]<19) || (element[4]>70 && element[4]<80)){
            unitCost = element[5] + element[7];
            products.push(`${element[0]} (BIG) ${unitCost} x ${element[2]} = ` + unitCost * element[2]);
          } else{
            products.push(`${element[0]} ${element[2]} x ${element[2]}  = ` + element[3]);
          }
        }
      })
    }) 
  }
  
  
  return (
    <div>
      <h3>Reciepts</h3>
      <ul>
        {/* {Object.keys(props.ingredients).map(el => (
          <li key={el}>
            {props.ingredientsNames[el]} : {props.ingredients[el]}
          </li>
        ))} */}

        {
          products.map((el, index)  => 
            (<li key={index}>{el}</li>)
          )
        }

      </ul>
      <p>
        <strong>Total: {props.price}₮ </strong>
      </p>
      
      <Button daragdsan={props.onCancel} btnType="Danger" text="CLOSE" />
      <Button
        daragdsan={props.onContinue}
        btnType="Success"
        text="CONTINUE"
      />
    </div>
  );
};

export default OrderSummary;
