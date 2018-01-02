const urlKey = '102763-bastian-karkarov-malfoy' // Parte final del link al perfil

let file = '' // Definimos la variable en la que, posteriormente, almacenaremos el json recibido del fetch
let orderFile = [] // En este archivo, más adelante, setearemos la información ordenada del json.
const searchs = [
  "Nivel Mágico",
  "Rango Social",
  "Galeones",
  "Ficha de Personaje",
  "Bóveda",
  "Bóveda Trastero",
  "Libros de Hechizos"
] // Definimos los campos del perfil que queremos mostrar

let s = document.createElement('style') // Creamos un elemento del dom para colocar nuestro css
s.textContent = `
  .modal_information {
    position: fixed;
    top: 5%;
    left: 1%;    
    padding: 16px;
    background: #fff;
    color: #333;
    z-index:10000;
    max-height: 143px;  
    transition: width 0.3s linear 0s;
  }

  .modal_text {    
    padding-top: 15px;    
  }
  
  .modal_information a {
    color: #333;
    text-decoration: underline;
  }
  
  #closeInformationButton {
    position: absolute;
    top: -10px;
    left: -10px;
  }

  #closeInformationButton {
    font-weight: bold;
    font-size: 20px;
  }

  ` // Definimos los estilos que tendrá el elemento en dónde se almacenará la información.

let containerModal = document.createElement('div') /* Creamos un contenedor, acá almacenaremos el botón para "togglear" la información mostrada */
containerModal.addClassName('modal_information') /* Agregamos una clase de CSS al contenedor, la clase está definida en los estilos (style) que definimos antes */
containerModal.style.width = '6px' /* Damos un tamaño inicial al contenedor, este tamaño posteriormente será cambiado según queramos mostrar u ocultar la información */

let toggleButton = document.createElement('button') /* Creamos un botón al que, al darle clic, mostrará u ocultará la información */
toggleButton.setAttribute('id', 'closeInformationButton') /* Agregamos un identificador único para poder hacer referencia a él posteriormente */
containerModal.append(toggleButton) // Agregamos el botón al "modal"

let containerText = document.createElement('div') /* Creamos un div, este contenerá la información extraída mediante fetch */
containerText.addClassName('modal_text') /* Agregamos la clase contenedora del texto */
containerText.style.visibility = 'hidden' /* Ocultamos el contenido con visibility para poder animar el toggle con css */
containerText.style.display = 'none' /* Se oculta con display para que no ocupe espacio en el maquetado */
containerModal.append(containerText) /* Se agrega al modal */

document.head.append(s) /* Con toddos los estilos definidos, agremos los estilos y el contenedor principal al dom */
document.body.append(containerModal)

const toggleOpenClose = document.getElementById('closeInformationButton') /* Obtenemos el  botón que definimos antes con el identificador único */
let cross = document.createTextNode('X') // Nodo de text que representa la acción "Cerrar modal"
let plus = document.createTextNode('+') // Nodo de text que representa la acción "Abrir modal"
toggleButton.appendChild(plus) // Agregamos el nodo abrir, pues por defecto el modal se encuentra cerrado
let opened = false // Creamos un estado de "abierto/cerrado" para togglear entre los nodos de texto.

toggleOpenClose.addEventListener("click", () => { // Le decimos a Js que escuche el evento click en el botón y que ejecute la función () => {}
  containerText.style.visibility = (containerText.style.visibility == 'hidden') ? 'visible' : 'hidden' /* Alternamos la visibility con un if ternario */
  containerText.style.display = (containerText.style.display == 'none') ? 'block' : 'none' /* Alternamos el display con un if ternario */
  containerModal.style.width = (containerModal.style.width == '250px') ? '6px' : '250px' /* Alternamos el tamaño con un if ternario */
  toggleButton.removeChild(toggleButton.childNodes[0]) // Quitamos el nodo de texto actual
  if (opened) { // Si está cerrado
    toggleButton.appendChild(plus) // Agregamos el nodo Abrir
  } else { // Si está abierto
    toggleButton.appendChild(cross) // Agregamos el nodo Cerrar
  }

  opened = !opened // Abrirmo o cerramos el estado del modal.

});

// Se define una función para manejar los errores de las promesas
const handleError = error => {
  console.log(`Request failed: ${error}`)
  containerModal.textContent = "Algo raro pasó, actauliza o acosa al sexy de Bastian :perv:"
}

fetch(`http://juliens.skn1.com/api/?id=${urlKey}`) // Realizamos una petición a la URL
  .then(response => response.json()) /* Si la petición se ejecuta sin errores, entonces llamamos a una función que nos devuelve un json */ 

  /* El siguiente .then ejecuta una función que recive el archivo json (devuelto por la función anterior)  y realiza el proceso de tratamiento de los datos obtenidos */
  .then(json => {
    file = json // Almacenamos el archivo json en una variable 
    file._each(element => {
      orderFile.push(Object.values(element))
    }) // Este objeto ejecuta el método _each, que recibe el elemento (que es un objeto) y lo convierte en un array que es agregado al array OrderFile


    /* Utilizando el método map, recorremos el array de arrays */
    orderFile.map(element => {
      /* Recorremos el objeto que contiene la lista de campos que queremos extraer y le damos el forma que ddeseamos */
      searchs.map(search => {
        if (element[0] === search) {
          {
            let tempDiv = document.createElement('div')
            let tempSpan = document.createElement('span')
            let temB = document.createElement('b')
            /* Acá verificamos que si el campo es una ficha, bóveda o bóveda trastero se cree un link en lugar de un texto simple */
            if (element[0] === "Ficha de Personaje" || element[0] === 'Bóveda' || element[0] === 'Bóveda Trastero')
              {
                let link = document.createElement('a')
                let text = document.createTextNode(`${element[0]}:`)
                link.setAttribute('href', `http://www.harrylatino.org/index.php?showtopic=${element[1]}`)
                link.setAttribute('target', '_blank')
                link.appendChild(text)
                temB.append(link)
              }
            else{
              temB.textContent = `${element[0]}:`
            }
            tempSpan.textContent = ` ${element[1]}`
            tempDiv.append(temB)
            tempDiv.append(tempSpan)
            containerText.append(tempDiv)
          }
        }
      })

    })
    })
    .catch(error => handleError(error))




