//variables globales
var ele;
var latas = [];
var intervalos = [];
var audioLata = document.createElement("audio");
var audioCancion = document.createElement("audio");
var score = 0;
var marca;
var numLatas = 20;
var parado = false;
var seg = 0;
var inter;

//main
function iniciar() {
    document.body.appendChild(audioLata);
    audioLata.src = "../src/disparo.mp3";
    document.body.appendChild(audioCancion)
    audioCancion.src = "../src/bandaSonora.mp3";
    var element = document.createElement("div");
    document.body.appendChild(element);
    crearContenedor();
    crearLata();
    marcador();
}

// función para crear el contenedor exterior
function crearContenedor() {
    ele = document.createElement("div");
    var alineacion = document.querySelector('.alineacion');
    alineacion.appendChild(ele);
    ele.className = 'contenedor';
}

// función para crear las diferentes latas
function crearLata() {
    // bucle con el creamos las latas con un número determinado
    for (let i = 1; i < numLatas; i++) {
        var lata = document.createElement("div");
        lata.id = "lata" + i;
        ele.appendChild(lata);
        lata.className = 'latas';
        // switch para crear todas las latas con intervalos de movimielntos diferentes 
        switch (aleatorio(1,6)) {
            case 1:
                //lata negra
                lata.innerHTML = '<img id="lata1" src="./src/can1.png" />';
                var interval = setInterval(crearIntervalos, 850, lata);
                break;
            case 2:
                //lata azul
                lata.innerHTML = '<img id="lata2" src="./src/can2.png" />';
                var interval = setInterval(crearIntervalos, 1250, lata);
                break;
            case 3:
                // lata roja
                lata.innerHTML = '<img id="lata3" src="./src/can3.png" />';
                var interval = setInterval(crearIntervalos, 1500, lata);
                break;
            default:
                lata.innerHTML = '<img id="lata2" src="./src/can2.png" />';
                var interval = setInterval(crearIntervalos, 1250, lata);
                break;
        }
        lata.addEventListener("click", eliminar);
        latas.push(lata);
        intervalos.push(interval);
    }
}

// función que crea intervalos
function crearIntervalos(lata) {
    var top = aleatorio(100, 700);
    var left = aleatorio(300, 1500);
    lata.style.top = top + "px";
    lata.style.left = left + "px";
    var rotar = aleatorio(20, 960);
    lata.style.webkitTransform = 'rotate(' + rotar + 'deg)';
    lata.style.msTransform = 'rotate(' + rotar + 'deg)';
    lata.style.OTransform = 'rotate(' + rotar + 'deg)';
    lata.style.transform = 'rotate(' + rotar + 'deg)';
}

// funcionar para eliminar las latas al hacer click en ellas
function eliminar() {
    if (!parado) {
        this.parentNode.removeChild(this);
        // reproducimos los audios
        audioLata.play();
        audioCancion.play();
        // eliminamos las latas del array
        latas.pop();
        // establecemos los diferentes marcadores para las latas
        if (this.firstChild.id == 'lata2') {
            score += 10;
        } else if (this.firstChild.id == 'lata1') {
            score += 50;
            seg += 5;
        } else if (this.firstChild.id == 'lata3'){
            score += 25;
        }
        marca.innerHTML = 'Marcador: ' + score;
        // hacemos un retardo en la muestra del alert
        if (latas.length == 0) {
            setTimeout(() => {
                score += 10;
                alert("Has ganado!!");
                location.reload();
            }, 500);
        }
    }
}

// función para para los intervalos de las latas
function parar() {
    for (let i = 0; i < intervalos.length; i++) {
        clearInterval(intervalos[i]);
        
    }
    for (let i = 0; i < intervalos.length; i++) {
        intervalos.pop();
    }
    parado = true;
    clearInterval(inter);
    // let element = document.querySelector('.contenedor');
    // element.style.display = 'none';
    // let ele = document.createElement('div');
    // var alineacion = document.querySelector('.alineacion');
    // alineacion.appendChild(ele);
    // ele.className = 'contenedor';

}

function reiniciar() {
    if (parado == true) {
        for (let i = 0; i < latas.length; i++) {
           
            // var newIntervalo = setInterval(crearIntervalos, 1500, latas[i]);
            // intervalos.push(newIntervalo);
            

            if (latas[i].firstChild.id == 'lata2') {
                var newIntervalo = setInterval(crearIntervalos, 1500, latas[i]);
                intervalos.push(newIntervalo);
            } else if (latas[i].firstChild.id == 'lata1') {
                var newIntervalo = setInterval(crearIntervalos, 850, latas[i]);
                intervalos.push(newIntervalo);
            } else if (latas[i].firstChild.id == 'lata3'){
                var newIntervalo = setInterval(crearIntervalos, 1250, latas[i]);
                intervalos.push(newIntervalo);
            }
        }
        parado = false;
        inter = setInterval(() => {
            if (seg == 0) {
                clearInterval(inter);
                alert("Has perdido!!");
                location.reload();
            } else {
                --seg;
            }
            timer.innerHTML = 'TIME: ' + seg;
        }, 1000);
    }

}

function reset() {
    location.reload();
}

function marcador() {
    marca = document.createElement("div");
    var botones = document.querySelector('.botones');
    botones.appendChild(marca);
    marca.className = 'contador';
    marca.innerHTML = "Marcador: " + score;
    var timer = document.createElement("div");
    botones.appendChild(timer);
    timer.id = "timer";
    timer.className='contador';
    seg = 51;
    inter = setInterval(() => {
        if (seg == 0) {
            clearInterval(inter);
            alert("Has perdido!!");
            location.reload();
        } else {
            --seg;
        }
        timer.innerHTML = 'TIME: ' + seg;
    }, 1000);
    
}


function aleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo + 1 - minimo) + minimo);
}

window.onload = iniciar;
