/*Programacion de JavaScript*/

let pieces = document.getElementsByClassName('pieces-js');
let piecesSizeWidth = [134,192,134,163,134,163,134,192,134];
let piecesSizeHeight = [163,134,163,134,192,134,163,134,163];

//variables para almacenar información de movimiento de piezas

let elementSelect = 0;
let currentX = 0;
let currentY = 0;
let currentPosX = 0;
let currentPosY = 0;

//variable global que almacena todo el entorno variable gráfico

let enviroment = document.getElementById('enviroment');

for (let i=0; i<pieces.length; i++){
    // le damos a cada pieza su tamaño
    pieces[i].setAttribute("width", piecesSizeWidth[i]);
    pieces[i].setAttribute("height", piecesSizeWidth[i]);

    //le damos a cada pieza una posición aleatoria en x,y

    pieces[i].setAttribute("x",Math.floor((Math.random() +10) +1))
    pieces[i].setAttribute("y", Math.floor((Math.random() +406) +1))

    //agregamos evento a cada pieza con el click del ratón pulsado para poder moverlas
    pieces[i].setAttribute("onmousedown","selectElement(ev)");
}

function selectElement(ev) {
  elementSelect = reorder(ev);

  //guardamos la posición del ratón en el momento en el que se hizo el evento
  currentX = ev.clientX;
  currentY = ev.clientY;

  //obtenemos el valor de la posición x,y de la pieza
  currentPosX = parseFloat(elementSelect.getAttribute("x"));
  currentPosY = parseFloat(elementSelect.getAttribute("y"));

  //agregamos el elemento onmousemove a la pieza seleccionada. esto llamará a la función indicada para mover el elemento
  elementSelect.setAttribute("onmousemove","moveElement(ev)");
}

function moveElement(ev) {
  //calculamos la diferencia entre x,y de la primera posición a la actual
  let dx = ev.clientX - currentX;
  let dy = ev.clientY - currentY;

  //mover la pieza la misma distancia que se ha desplazado el ratón
  currentPosX = currentPosX + dx;
  currentPosY = currentPosY + dy;

  //actualizamos la posición de la pieza
  elementSelect.setAttribute("x", currentPosX);
  elementSelect.setAttribute("y", currentPosY);

  //volvemos a guardar la posición del ratón
  currentX = ev.clientX;
  currentY = ev.clientY;

  //deseleccionamos la pieza
  elementSelect.setAttribute("onmouseout","unselectPiece(ev)");
  elementSelect.setAttribute("onmouseup","unselectPiece(ev)");

}

function unselectPiece(ev) {

  //eliminamos los elementos añadidos previamente, si procede
  if (elementSelect !=0){
    elementSelect.removeAttribute("onmousemove");
    elementSelect.removeAttribute("onmouseout");
    elementSelect.removeAttribute("onmouseup");
    elementSelect = 0;
  }
}

function reorder (ev) {
  const parent = ev.target.parentNode;
  const clone = parent.cloneNode(true);
  let id = parent.getAttribute("id");

  //se elimina la pieza seleccionada
  enviroment.removeChild(document.getElementById(id));

  //agregamos la copia creada y retornamos el nuevo elemento para que sea seleccionado
  enviroment.appendChild(clone);
  return enviroment.lastChild.firstChild;
}

//mejoramos la interacción con el usuario, dándole a las piezas la opción de imantarlas y que se junten fácilmente entre ellas