var separacioH=20, separacioV=20;
var nFiles, nColumnes;
var jocCartes = [];
var cartasJuego = [];

$(function(){

    $('#tauler').hide();
    cargarArrayCartas();
    pedirMedidasTablero();

});

function cargarArrayCartas() {
    for (let i = 1; i <= 33; i++) {
        jocCartes[i] = 'carta'+i;
    }
}

function pedirMedidasTablero() {
    $('.btnMedida').click(function (e) { 
        e.preventDefault();
        mostrarTablero(e.target.id);
    });
    
}

function mostrarTablero(medida) {
    if (medida == 2) {
        nFiles = 2; nColumnes = 2;
        $("#tauler").css({
            //2x2
            "width" : "220px",
            "height": "300px"
        });
    } else if(medida == 4 ){
        nFiles = 4; nColumnes = 4;
        $("#tauler").css({
            //4x4
            "width" : "420px",
            "height": "580px"
        });
    } else{
        nFiles = 6; nColumnes = 6;
        $("#tauler").css({
            //6x6
            "width" : "620px",
            "height": "860px"
        });
    }

    $('#tauler').show();
    $('#inici').hide();
    mostrarCartas();
}

function mostrarCartas() {
    var f, c, carta, totalCartas;
    f=1; //fila
    c=1; //columna
    totalCartas = nFiles*nColumnes;
    
    random(totalCartas);;

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

            for (let i = 0; i < totalCartas; i++) {
                randomCarta(carta, i);
                
            }

        }
    }
    
    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });
}

function randomCarta(carta, cont) {

    let valores = cartasJuego.filter(value=>value===cartasJuego[cont]);

    if (valores.length<2) {
        carta.find(".davant").addClass(cartasJuego[cont]);
    } else{
        randomCarta(carta);
    }
    
}

function random(cartas) {
    let rnd;
    for (let i = 0; i < (cartas/2); i++) {
        rnd = Math.floor((Math.random()*33) + 1);
        cartasJuego.push(rnd);
    }
}