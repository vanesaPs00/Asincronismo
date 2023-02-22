// Una función de callback es una función que se pasa a otra función 
// como un argumento, que luego se invoca dentro de la función externa para 
// completar algún tipo de rutina o acción.

function sum(num1, num2) {
    return num1 + num2;
}
function calc(num1, num2, callback) {
    return callback(num1, num2); //No necesariamente se debe llamar callback
};

console.log(calc(2, 2, sum)); //sum debe estar sin () y sin argumentos

//segundo ejemplo con setTimeout

/*se tiene un setTimeout que funciona como un callback, en el código está
 configurado para imprimir el mensaje 2 segundos después de ejecutar el 
 código con Run Code:*/

 //creamos un función setTimeout que recibe una función anonima
 setTimeout(function(){
    console.log('Hola JavaScript');
 }, 2000); //le pasamos el tiempo 2 segundos

//  creamos un función de saludo
function gretting(name){
    console.log(`Hola, ${hola}`);
}
// le pasamos la función, luego los segundos y por ultimo el argumento.
setTimeout(gretting, 2000, 'vanesa');

function execCallback(callback) {
    
    
  }
  setTimeout(execCallback,2000,'2');

