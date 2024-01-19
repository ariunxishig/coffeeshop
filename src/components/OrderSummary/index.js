import Button from "../General/Button";

const OrderSummary = props => {
  let products =[]
  if(props.data){
    //props.recOrder(props.data);
    let orderProducts = []
    // console.log(props.payment);
    props.data.map((el, index)=> {
      el[4].forEach(element => {
        if(element[1] > 0 ){
          if((element[4]>10 && element[4]<19) || (element[4]>70 && element[4]<80)){
            products.push(`${element[0]} (HOT) ${element[5]} x ${element[1]} = ` + element[5] * element[1]);
          } 
          else if(element[4]>50 && element[4]<70){
            products.push(`${element[0]} (SMALL) ${element[5]} x ${element[1]} = ` + element[5] * element[1]);  
          }
          orderProducts.push({
            prodID: element[4], 
            unit: element[1], 
            price: element[5], 
            unitXprice: element[5] * element[1]
          });
        }
        if(element[2] > 0 ){
          //db deerh product une[5]
          let unitCost = element[5]; 
          //big smoothieshake 5k nemegdene [6]
          if(element[4]>50 && element[4]<70){
            unitCost = element[5] + element[6];
            products.push(`${element[0]} (BIG)  ${unitCost} x ${element[2]} = ` + unitCost * element[2]);
          } 
          //cold coffee 2k nemegdene [7]
          else if((element[4]>10 && element[4]<19) || (element[4]>70 && element[4]<80)){
            unitCost = element[5] + element[7];
            products.push(`${element[0]} (COLD) ${unitCost} x ${element[2]} = ` + unitCost * element[2]);
          } else{
            products.push(`${element[0]} ${unitCost} x ${element[2]}  = ` + unitCost * element[2]);
          }
          orderProducts.push({
            prodID: element[4], 
            unit: element[1], 
            price: unitCost, 
            unitXprice: unitCost * element[2]
          });
        }
      })
    }) 
    // props.saveOrderDB(orderProducts);
  }
  
  return (
    <div>
      <h3>Reciepts</h3>
      <ul>
        {
          products.map((el, index)  => 
            (<li key={index}>{el}</li>)
          )
        }

      </ul>
      {/* <p>
        Cash: {props.payment.cash}, Change: {props.payment.change}, Pos: {props.payment.pos}
      </p>
      <p>
        Card: {props.payment.card}, Account: {props.payment.transfer}
      </p> */}
      
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
