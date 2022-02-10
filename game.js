var ele;
var latas = [];
var intervalos = [];
var audio = document.createElement("audio");
var score = 0;
var marca;
var numLatas = 20;
var parado = false;
var seg = 0;


function iniciar() {
    document.body.appendChild(audio);
    audio.src = "../src/disparo.mp3";
    var element = document.createElement("div");
    document.body.appendChild(element);
    crearContenedor();
    crearLata();
    parar();
    reiniciar();
    reset();
    marcador();
    tiempo();
}

function crearContenedor() {
    ele = document.createElement("div");
    var alineacion = document.querySelector('.alineacion');
    alineacion.appendChild(ele);
    ele.className = 'contenedor';
}

function crearLata() {
    for (let i = 1; i < numLatas; i++) {
        var lata = document.createElement("div");
        lata.id = "lata" + i;
        ele.appendChild(lata);
        lata.className = 'latas';
        switch (aleatorio(1,6)) {
            case 1:
                //lata negra
                lata.innerHTML = '<img id="lata1" src="./src/can1.png" />';
                var interval = setInterval(crearIntervalos, 750, lata);
                break;
            case 2:
                //lata azul
                lata.innerHTML = '<img id="lata2" src="./src/can2.png" />';
                var interval = setInterval(crearIntervalos, 1250, lata);
                break;
            case 3:
                // lata roja
                lata.innerHTML = '<img id="lata3" src="./src/can3.png" />';
                var interval = setInterval(crearIntervalos, 1750, lata);
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


function crearIntervalos(lata) {
    var top = aleatorio(100, 700);
    var left = aleatorio(300, 1500);
    lata.style.top = top + "px";
    lata.style.left = left + "px";
}

function eliminar() {
    this.parentNode.removeChild(this);
    audio.play();
    latas.pop();
    if (this.firstChild.id == 'lata2') {
        score += 10;
    } else if (this.firstChild.id == 'lata1') {
        score += 50;
    } else if (this.firstChild.id == 'lata3'){
        score += 25;
    }
    console.log(score);
    marca.innerHTML = 'Marcador: ' + score;
    if (latas.length == 0) {
        setTimeout(() => {
            score += 10;
            alert("Has ganado!!");
            location.reload();
        }, 250);
    } else {
        //  var suma = (document.getElementById("marcador").innerHTML = "Marcador: " + score);
    }
}

function parar() {
    if (parado == false) {
        var element = document.createElement("div");
        var alineacion = document.querySelector('.botones');
        alineacion.appendChild(element);
        element.className = 'parar';
        element.innerHTML = "PARAR";
        element.addEventListener("click", () => {
            for (let i = 0; i < intervalos.length; i++) {
                clearInterval(intervalos[i]);
            }
            // console.log(intervalos.length);
            for (let i = 0; i < intervalos.length; i++) {
                intervalos.pop();
            }
        });
        parado = true;
    } 
}

function reiniciar() {
    if (parado == true) {
        var element = document.createElement("div");
        var alineacion = document.querySelector('.botones');
        alineacion.appendChild(element);
        element.className='reiniciar';
        element.innerHTML = "REINICIAR";
        element.addEventListener("click", () => {
            for (let i = 0; i < latas.length; i++) {
                var newIntervalo = setInterval(crearIntervalos, 1500, latas[i]);
                intervalos.push(newIntervalo);
            }
        });
        parado = false;
    }
}

function reset() {
    var element = document.createElement("div");
    var alineacion = document.querySelector('.botones');
    alineacion.appendChild(element);
    element.className = 'reset';
    element.innerHTML = "RESET";
    element.addEventListener("click", () => {
        location.reload();
    });
}

function marcador() {
    marca = document.createElement("div");
    var alineacion = document.querySelector('.botones');
    alineacion.appendChild(marca);
    marca.className = 'contador';
    marca.innerHTML = "Marcador: " + score;
    console.log(score, marca.innerHTML)
}

function tiempo() {
    seg = 51;
    var inter = setInterval(() => {
        if (seg == 0) {
            clearInterval(inter);
            alert("Has perdido!!");
            location.reload();
        }
        --seg;
        timer.innerHTML = 'TIME: ' + seg;
    }, 1000);

    var timer = document.createElement("div");
    var alineacion = document.querySelector('.botones');
    alineacion.appendChild(timer);
    timer.id = "timer";
    timer.className='contador';
}

function aleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo + 1 - minimo) + minimo);
}

window.onload = iniciar;
