var separacioH=20, separacioV=20;
var nFiles=2, nColumnes=2;
var indiceCarta = 0;

/* BUCLE CARTAS PRUEBA */


/*
var jocCartes = [
    'carta14',
    'carta10',
    'carta2',
    'carta5'
];*/

var jocCartes = [];

for (var i = 1; i <= 33; i++) {
    jocCartes.push('carta' + i);
}
var nFiles, nColumnes;
var arrayCartes = [];
var cartasJuego = [];

$(function(){

    ampladaCarta=$(".carta").width(); 
    alcadaCarta=$(".carta").height();
    // mida del tauler
    $("#tauler").css({
        /* "width" : "120px",
        "height": "160px" */

        //Para ajustar el tablero 2x2, 4x4, etc. Multiplicar las dimensiones.
        "width" : "240px",
        "height": "312px"
    });

    for (f; f <= nFiles; f++) {
        c=1;
        for (c; c <= nFiles; c++) {
            
            carta=$("#f"+f+"c"+c);

            console.log("#f"+f+"c"+c);

            carta.css({
                "left" :  ((c-1)*(ampladaCarta+separacioH)+separacioH)+"px",
                "top"  :  ((f-1)*(alcadaCarta+separacioV) +separacioV)+"px"
                
            });

            var cartaSeleccionada = jocCartes[indiceCarta];
            carta.find(".davant").addClass(cartaSeleccionada);

            // Incrementar el índice para seleccionar la próxima carta en el siguiente ciclo
            indiceCarta++;
            if (indiceCarta >= jocCartes.length) {
                indiceCarta = 0; // Reiniciar el índice si llega al final del array
            }
            console.log(indiceCarta);
            
            //carta.find(".davant").addClass(jocCartes.pop());
        }
    }

    /* carta=$("#f"+f+"c"+c);
    carta.css({
        "left" :  ((c-1)*(ampladaCarta+separacioH)+separacioH)+"px",
        "top"  :  ((f-1)*(alcadaCarta+separacioV) +separacioV)+"px"
    });
    carta.find(".davant").addClass(jocCartes.pop()); */
   
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
    var f, c, carta, totalCartas, divCartas;
    f=1; //fila
    c=1; //columna
    totalCartas = nFiles*nColumnes; //numero de cartas totales
    divCartas = totalCartas/2; //numero de cartas/2


    barajarCartas();
    

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

function barajarCartas() {
    let index = arrayCartes.length;
    while (index != 0) {
        let rnd = Math.floor(Math.random() * index);
        index--;

        [arrayCartes[index], arrayCartes[rnd]] = [arrayCartes[rnd], arrayCartes[index]];
    }
}


function random(carta, divCartas) {
    let rnd = Math.floor((Math.random() * divCartas) + 1);
    let valores = cartasJuego.filter(value=>value===rnd);
    if (valores.length<2) {
        cartasJuego.push(rnd);
        carta.find(".davant").addClass(arrayCartes[rnd]);
    } else{
        random(carta, divCartas);
    }
}