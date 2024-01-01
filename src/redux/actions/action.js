export const incDecProds =(cmdNo, prods, title, indx)=>{
    return function(dispatch){ 
        const products =[]
        let totalPrice = 0
        prods.data.forEach(element => {
            if(element[4].length > 0 ){
                let categTotal = 0;
                for (var i = 0; i < element[4].length; i++) {
                    const product = element[4][i]
                    if(element[0]===title && i === indx ){
                        if(cmdNo===1 && product[1]!==0){
                            product[1]--;
                        } else if(cmdNo===2){
                            product[1]++;
                        } else if(cmdNo===3 && product[2]!==0){
                            product[2]--;
                        } else if(cmdNo===4){
                            product[2]++;
                        }
                        const productCost = parseInt(product[0].split(':')[1])
                        // product[3]  == category-n niit une tootsohdoo
                        product[3] = productCost * product[2];
                        if(product[4]>50 && product[4]<70){
                            product[3] = ( productCost * product[1]) + ((productCost + 5000) * product[2]);
                        }else if((product[4]>10 && product[4]<19) || (product[4]>70 && product[4]<80)){
                            product[3] = ( productCost * product[1]) + ((productCost + 2000) * product[2]);
                        }
                        //product[3] = ( productCost * product[1]) + ((productCost+2000)*product[2]);
                    }
                    categTotal += product[3]
                };
                element[3] = categTotal;
                products.push(element);
                totalPrice += categTotal;
            }
        }); 
        dispatch(increaseDecreaseProds(products)); //prods too
        dispatch(calculateTotal(totalPrice));
    };
};

export const increaseDecreaseProds = products =>{
    return {
        type:"PRODS_INC_DEC",
        prods: products
    }
};

export const calculateTotal = totalPrice =>{
    return {
        type:"CALC_TOTAL_PRICE",
        prods: totalPrice
    }
};