/*Programacion de JavaScript*/

let pieces = document.getElementsByClassName('pieces-js');
let piecesSizeWidth = [134,192,134,163,134,163,134,192,134];
let piecesSizeHeight = [163,134,163,134,192,134,163,134,163];

//arrays con posiciones correctas de las piezas
let origX = [200,304,466,200,333,437,200,304,466];
let origY = [100,100,100,233,204,233,337,366,337];

//variables para almacenar información de movimiento de piezas

let elementSelect = 0;
let currentX = 0;
let currentY = 0;
let currentPosX = 0;
let currentPosY = 0;

//variable global que almacena todo el entorno variable gráfico

let enviroment = document.getElementById('enviroment');

//variable para cuando el puzzle ha sido resuelto bien y reproduzca sonido
let win = document.getElementById('win');

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
  magnet();
}

function unselectPiece(ev) {
  testing();

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

function magnet () {
  //recorremos todas las piezas. si la posición se encuentra en un radio de 15px de la posición correcta, la pieza será atraída a la posición buena
  for (let i=0;i<pieces.length;i++) {
    if (Math.abs(currentPosX-origX[i]) <15 && Math.abs(currentPosY-origY[i])<15)
    elementSelect.setAttribute("x", origX[i]);
    elementSelect.setAttribute("y", origY[i]);
  }
}

//comprobamos que el puzzle ha sido formado correctamente

function testing () {
  //contador de piezas correctamente bien ubicadas
let correctPieceLocation = 0;

  //almacenamos en una variable todos los elementos con la clase parent
  let parents = document.getElementsByClassName('parent');
  for (let i=0;i<pieces.length;i++){
    //obtenemos la posicion de cada elemento child de los elementos padres
    let posX = parseFloat(parents[i].firstChild.getAttribute("x"));
    let posY = parseFloat(parents[i].firstChild.getAttribute("y"));

    //obtenemos el índice para poder hacer las comparaciones con las posiciones correctas
    ide = parents[i].getAttribute("id");
    if (origX[ide] == posX && origY[ide] == posY){
      correctPieceLocation = correctPieceLocation +1;
    }
    if (correctPieceLocation == 9){
      win.play();
    }
}}