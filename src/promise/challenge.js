import fetch from 'node-fetch';
const API= 'https://api.escuelajs.co/api/v1';

/*Función que va a recibir como argumento la url que queremos llamar y esto retornará el llamado de+¿
fetch: una promesa*/

function fetchData(urlApi){
    return fetch(urlApi);
};
// /** El llamado*/ 

// fetchData(`${API}/products`)
// //se transforma a un objeto json
// .then(response =>response.json())
// .then(products =>{
//     console.log(products);
// })
// .then(()=>{
//     console.log('Hola');
// }) //Se puede anidar multiples .then
// .catch(error=> console.error(error));

fetchData(`${API}/products`)
.then (response => response.json()) ///se hace la conversión a un objeto json
.then(products =>{
    // console.log(products)
    return fetchData(`${API}/products/${products[0].id}`) // solo se quiere mostrar el primer elemento de la primera solicitud
})
.then(response => response.json())// Se vuelve a traer la data
.then(product =>{
    console.log(console.log(product.title));
    return fetchData(`${API}/categories/${product.category.id}`) // Se quiere mostrar la categoria de un producto en particular
})
.then(response => response.json())
.then(category =>{
    console.log(category.name);
})
.catch (err=>console.log(err))//Detecta el Error
.finally(()=>console.log('finally'))// Es opcional para mostrar que se termino la solicitud