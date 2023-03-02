const promise= new Promise(function(resolve, reject){
    resolve('Hey!')
});

//Ejemplo de contar vacas

const cows=15;
const countCows= new Promise(function(resolve, reject){
    if(cows>10){
        resolve(`We have ${cows} cows on the farm`);
    }else{
        reject("there is no cows on the farm");
    }
});
countCows.then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
}).finally(()=> console.log('finally'));