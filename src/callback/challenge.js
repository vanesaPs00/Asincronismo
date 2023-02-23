
/*Para poder hacer uso de XHLHttpRequest debemos hacer una previa instalación 
de esta manera el navegador nos va reconocer este recurso. 
Esta manera hacemos lo siguente en la terminal: 
npm i xmlhttprequest
Una vez instalado podemos hacer uso de este recurso*/

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

/*En esta parte hacemos le llamado a nuestra api de platzi.Nombramos la variable API en 
mayúscula para determinar que ese valor, es único y  no va a ser transformado 
en  nuestros archivos. Por lo tanto,  va ser u valor unico en nuestro archivos*/

const API = 'https://api.escuelajs.co/api/v1';

/* Primero tenermos que crear una función que nos permitirá usar el callback para
poder hacer llamados a los elementos claves de esta API que recibirá como parámetros
el url de la API a trabajar y el callback que seria la función anonima para recibir 
la solicitud que nos entrega el llamado de la api*/

function fetchData(urlApi, callback) {
    /*el  callback en este caso nos otorgará los datos o el error que ocurra  */
    /*Creamos una instancia que hace referencia a nuestro XMLHttpRequest para poder accerder a las funciones 
    internas de este elemento*/
    let xhttp = new XMLHttpRequest();
    /*Gracias a la instancia podemos hacer el llamado de lso metodos que contiene XMLHttpRequest.
    El método open() recibe  tres tres parámetros: prótocolo, url, asíncrono (true) y Prepara la petición para ser enviada.
    */
    //GET → Solicita un recurso.
    xhttp.open('GET', urlApi, true);
    //escucha diferentes estados de la solicitud y conocer cuando está disponible la información
    xhttp.onreadystatechange = function (event) {
        if (xhttp.readyState === 4) { //si el estado ha sido completada la llamada
            if (xhttp.status === 200) { //el servido responde de forma correcta
                callback(null, JSON.parse(xhttp.responseText));
                //dentro de xhttp.responseTex recibimos lo que entrega el servidor en texto y se hace la transformación en JSON
            } else {
                const error = new Error('Error' + urlApi);
                return callback(error, null); //es null porque no se está regresando ningún dato
         }
        }
    }
    xhttp.send();
}

/*se invoca el metodo fetchData() pasandole como argumentos la varible API 
concatenada con la cadena 'products' para acceder a la URL de la API deseada, 
y una función anónima que recibe 2 parámetros (un objeto de error y un arreglo 
    que almacena todos los objetos traidos por la API).*/

fetchData(`${API}/products`, function (error1, data1) {
    /*se valida si existe un error, en caso de que exista se detiene el 
    proceso y se imprime el error*/
    if (error1) return console.error(error1);
    /** se invoca nuevamente la función fetchData con el fin de acceder a un 
     * objeto puntual del arreglo data1, se envia como parámetros la url de la 
     * API apuntando al atributo del primer objeto de arreglo data1 y nuevamente 
     * una función anónima. */
    fetchData(`${API}/products/${data1[0].id}`, function (error2, data2) {
        /** //si en este punto se identifica un error se imprime en consola y se detiene el proceso */
        if (error2) return console.error(error2);
        /** //Se invoca nuevamente la funcion fetchData con el fin de acceder a la 
         * categoria, se envían como parametros la url de la API con la concatenación 
         * de 'Categories' y el atributo Id de categoria del objeto data2 de la función
         *  anterior */

        fetchData(`${API}/categories/${data2?.category?.id}`, function (error3, data3) {
            if (error3) return console.error(error3);
            /**mprime el objeto en la posición 1 del arreglo de los objetos obtenidos
             *  en el metodo invocado inicialmente
             */
            console.log(data1[0]);
            /**imprime el titulo del objeto que se consultó en la seguna invocación
             *  de la función
             */
            console.log(data2.title);
            /**Se imprime el nombre de la categoria a la que pertenece el objeto que
             *  se consultó en la seguna invocación del método. */
            console.log(data3.name);
        });
    });
});