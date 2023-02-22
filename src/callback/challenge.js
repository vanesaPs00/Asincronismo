
/*Para poder hacer uso de XHLHttpRequest debemos hacer una previa instalación 
de esta manera el navegador nos va reconocer este recurso. 
Esta manera hacemos lo siguente en la terminal: 
npm i xmlhttprequest
Una vez instalado podemos hacer uso de este recurso*/ 

const XMLHttpRequest=require('xmlhttprequest');

/*En esta parte hacemos le llamado a nuestra api de platzi.Nombramos la variable API en 
mayúscula para determinar que ese valor, es único y  no va a ser transformado 
en  nuestros archivos. Por lo tanto,  va ser u valor unico en nuestro archivos*/

const API='https://api.escuelajs.co/api/v1';

/* Primero tenermos que crear una función que nos permitirá usar el callback para
poder hacer llamados a los elementos claves de esta API que recibirá como parámetros
el url de la API a trabajar y el callback que seria la función anonima para recibir 
la solicitud que nos entrega el llamado de la api*/ 

function fetchData(urlApi, callback){ /*el  callback en este caso nos otorgará los datos o el error que ocurra  */
    /*Creamos una instancia que hace referencia a nuestro XMLHttpRequest para poder accerder a las funciones 
    internas de este elemento*/
    let xhttp=new XMLHttpRequest();
    /*Gracias a la instancia podemos hacer el llamado de lso metodos que contiene XMLHttpRequest.
    El método open() recibe  tres tres parámetros: prótocolo, url, asíncrono (true) y Prepara la petición para ser enviada.
    */
   //GET → Solicita un recurso.
    xhttp.open('GET',urlApi,true);
    //escucha diferentes estados de la solicitud y conocer cuando está disponible la información
    xhttp.onreadystatechange =function(event){
        if(xhttp.readyState===4){ //si el estado ha sido completada la llamada
            if(xhttp.status===200){ //el servido responde de forma correcta
                callback(null, JSON.parse(xhttp.resposeText)) 
                //dentro de xhttp.responseTex recibimos lo que entrega el servidor en texto y se hace la transformación en JSON
            }
        }
        else{
            const error=new  Error('Error'+ urlApi);
            return  callback(error, null); //es null porque no se está regresando ningún dato
        }

    }
    xhttp.send();
}