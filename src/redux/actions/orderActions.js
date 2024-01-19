import axios from "../../axios-orders";

export const loadOrders = userId => {
  return function(dispatch, getState) {
    // Захиалгыг татаж эхлэлээ гэдгийг мэдэгдэнэ.
    // Энийг хүлээж аваад Spinner ажиллаж эхлэнэ.
    dispatch(loadOrdersStart());

    const token = getState().signupReducer.token;

    axios
      .get(`orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(response => {
        const loadedOrders = Object.entries(response.data).reverse();
        dispatch(loadOrdersSuccess(loadedOrders));
      })
      .catch(err => dispatch(loadOrdersError(err)));
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START"
  };
};

export const loadOrdersSuccess = loadedOrders => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders
  };
};

export const loadOrdersError = error => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error
  };
};

// Захиалгыг хадгалах
export const saveOrder = newOrder => {
  return function(dispatch, getState) {
    // Spinner ergelduulne
    dispatch(saveOrderStart());
    const token = getState().signupReducer.token;
    // Firebase ruu hadgalna
    axios
      .post(`/orders.json?auth=${token}`, newOrder)
      .then(response => {
        dispatch(saveOrderSuccess());
      })
      .catch(error => {
        dispatch(saveOrderError(error));
      });
  };
};

// Захиалгыг хадгалах
export const rec = data => {
  return function(dispatch) {
    dispatch(saveOrderStart());
    let orderProducts = []
    let products =[]
    data.map((el, index) => {
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
    dispatch(saveOrderSuccess(orderProducts));
  }
}

export const calcChange= data=>{
  return function(dispatch) {
    dispatch(changeCash(data));
  }
}
export const saveOrderType = data => {
  return function(dispatch) {
    console.log(data)
    dispatch(saveOrderData(data));
  }
}

export const saveOrdertoDB = order => {
  return function(dispatch, getState) {
    const token = getState().signupReducer.token;
    dispatch(saveOrderSuccess(order));
    // Firebase ruu hadgalna
    // axios
    //   .post(`/orders.json?auth=${token}`, newOrder)
    //   .then(response => {
    //     dispatch(saveOrderSuccess());
    //   })
    //   .catch(error => {
    //     dispatch(saveOrderError(error));
    //   });
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START"
  };
};

export const saveOrderSuccess = order => {
  return {
    type: "SAVE_ORDER_SUCCESS",
    order
  };
};

export const changeCash = data => {
  return {
    type: "CHANGE_CASH",
    cash: data
  };
};

export const saveOrderData = data => {
  return {
    type: "SAVE_ORDER_DATA",
    data
  };
};

export const saveOrderError = error => {
  return {
    type: "SAVE_ORDER_ERROR",
    errorMessage: error
  };
};
