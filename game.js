var ele;
var latas = [];
var intervalos = [];
var audio = document.createElement("audio");
var score = 0;
var numGlobos = 20;
var parado = false;


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
    for (let i = 1; i < numGlobos; i++) {
        var lata = document.createElement("div");
        lata.id = "lata" + i;
        ele.appendChild(lata);
        lata.className = 'globos';
        lata.innerHTML = '<img src="./src/can2.png" />';
        lata.addEventListener("click", eliminar);
        var interval = setInterval(crearIntervalos, 1500, lata);
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
    score += 10;
    if (latas.length == 0) {
        setTimeout(() => {
            score += 10;
            alert("Has ganado!!");
        }, 250);
    } else {
        var suma = (document.getElementById("marcador").innerHTML =
            "Marcador: " + score);
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
            for (let i = 0; i < latas.length; i++) {
                clearInterval(intervalos[i]);
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
    var marca = document.createElement("div");
    var alineacion = document.querySelector('.botones');
    alineacion.appendChild(marca);
    marca.innerHTML = "Marcador: " + score;
}

function tiempo() {
    var seg = 60;
    var inter = setInterval(() => {
        if (seg == 0) {
            clearInterval(inter);
            alert("Has perdido!!");
        }
        seg--;
        timer.innerHTML = seg;
    }, 1000);

    var timer = document.createElement("div");
    var alineacion = document.querySelector('.botones');
    alineacion.appendChild(timer);
    timer.id = "timer";
    timer.style.height = "25px";
    timer.style.width = "50px";
    timer.style.display = "flex";
    timer.style.alignItems = "center";
    timer.style.justifyContent = "center";
    timer.style.margin = "10px";
    timer.style.cssFloat = "left";
}

function aleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo + 1 - minimo) + minimo);
}

window.onload = iniciar;
