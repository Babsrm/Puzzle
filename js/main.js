/*Programacion de JavaScript*/

let pieces = document.getElementsByClassName('pieces');
let piecesSizeWidth = [134,192,134,163,134,163,134,192,134];
let piecesSizeHeight = [163,134,163,134,192,134,163,134,163];

//variables para almacenar información de movimiento de piezas

let elementSelect = 0;
let currentX = 0;
let currentY = 0;
let currentPosX = 0;
let currentPosY = 0;

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
  elementSelect = ev.target;

  //guardamos la posición del ratón en el momento en el que se hizo el evento
  currentX = ev.clientX;
  currentY = ev.clientY;

  //obtenemos el valor de la posición x,y de la pieza
  currentPosX = parseFloat(elementSelect.getAttribute("x"));
  currentPosy = parseFloat(elementSelect.getAttribute("y"));

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

}