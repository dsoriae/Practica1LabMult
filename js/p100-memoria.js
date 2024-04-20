var separacioH=20, separacioV=20;
var nFiles, nColumnes;
var arrayCartes = [];
var cartasJuego = [];

$(function(){

    $('#tauler').hide();
    cargarArrayCartas();
    pedirMedidasTablero();
    
});

function cargarArrayCartas() {
    for (let i = 1; i <= 33; i++) {
        arrayCartes[i] = 'carta'+i;
    }
}

function pedirMedidasTablero() {
    $('.btnMedida').click(function (e) {
        e.preventDefault();
        mostrarTablero(e.target.id);
    });
}

function mostrarTablero(medida) {
    let width, height;
    if (medida == 2) {
        nFiles = 2; nColumnes = 2;
        width = "220px"; height = "300px";

    } else if(medida == 4 ){
        nFiles = 4; nColumnes = 4;
        width = "420px"; height = "580px";

    } else{
        nFiles = 6; nColumnes = 6;
        width = "620px"; height = "860px";

    }
    $("#tauler").css({
        "width" : width,
        "height": height
    });

    $('#tauler').show();
    $('#inici').hide();

    mostrarCartas();
}

function mostrarCartas() {
    var f, c, carta, totalCartas, divCartas;
    f=1; //fila
    c=1; //columna
    totalCartas = nFiles*nColumnes; //numero de cartas totales
    divCartas = totalCartas/2; //numero de cartas/2

    barajarCartas(arrayCartes);
    
    for (f; f <= nFiles; f++) {
        c=1;
        for (c; c <= nColumnes; c++) {
            
            //guardem la fila i la columna de la carta en una variable que utilitzarem com a id de les cartes.
            let filacolumna = 'f'+f+'c'+c;

            //creem els div corresponents amb cada carta (crear les cartes del tauler).
            $('#tauler').append('<div class="carta" id="'+filacolumna+'"><div class="cara darrera"></div><div class="cara davant"></div></div>');
            
            //carreguem la carta a una variable per poder treballar millor sense haber d'accedir amb el selector.
            carta=$("#"+filacolumna);

            //màrges de les cartes
            carta.css({
                "left" :  ((c-1)*($(carta).width()+separacioH)+separacioH)+"px",
                "top"  :  ((f-1)*($(carta).height()+separacioV) +separacioV)+"px"
            });

            random(carta, divCartas);
        }
    }
    
    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });
}

function barajarCartas() { //Barreja les cartes per tenir un ordre aleatori
    let index = arrayCartes.length;
    while (index != 0) {
        let rnd = Math.floor(Math.random() * index);
        index--;

        [arrayCartes[index], arrayCartes[rnd]] = [arrayCartes[rnd], arrayCartes[index]];
    }
}

function random(carta, divCartas) {
    //agafem un numero aleatori de l'array ja barrejada.
    let rnd = Math.floor((Math.random() * divCartas) + 1);
    //mirem si aquest número ja està en l'array definitiu del joc.
    let valores = cartasJuego.filter(value=>value===rnd);
    //Volem que cada número estigui repetit dues vegades.
    if (valores.length<2) {
        cartasJuego.push(rnd);
        carta.find(".davant").addClass(arrayCartes[rnd]);
    } else{  //Si ja està dos vegades no el tornem a posar. I tornem a cridar la funció aplicant recursivitat
        random(carta, divCartas);
    }
}