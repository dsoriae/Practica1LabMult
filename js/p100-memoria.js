var separacioH=20, separacioV=20;
var nFiles, nColumnes;
var arrayCartes = [];
var cartasJuego = [];

$(function(){

    $('#tauler').hide();
    mostrarInicio();
    cargarArrayCartas();
    pedirMedidasTablero();
    
});

function mostrarInicio() {
    $('#inici').append(
        '<h3>Escull la dificultat del joc per començar:</h3>'+
        '<button id="2" class="btnMedida button-1-pushable">'+
            '<span id="2" class="button-1-shadow"></span>'+
            '<span id="2" class="button-1-edge"></span>'+
            '<span id="2" class="button-1-front text">'+
                'Fàcil'+
            '</span>'+
        '</button>'+
        '<br> <br>'+
        '<button id="4" class="btnMedida button-2-pushable">'+
            '<span id="4" class="button-2-shadow"></span>'+
            '<span id="4" class="button-2-edge"></span>'+
            '<span id="4" class="button-2-front text">'+
                'Normal'+
            '</span>'+
        '</button>'+
        '<br> <br>'+
        '<button id="6" class="btnMedida button-3-pushable">'+
            '<span id="6" class="button-3-shadow"></span>'+
            '<span id="6" class="button-3-edge"></span>'+
            '<span id="6" class="button-3-front text">'+
                'Difícil'+
            '</span>'+
        '</button>'
    );
}

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

function timer() {
    $('#timer').html('');
    $('#timer').append('<h3>00:00</h3>');
}

function mostrarCartas() {
    var f = 1, c = 1, carta, totalCartas = 0, divCartas = 0, cartasGiradas;
    f=1; //fila
    c=1; //columna
    totalCartas = nFiles*nColumnes; //numero de cartas totales
    divCartas = totalCartas/2; //numero de cartas/2
    cartasGiradas = [];

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
    console.log(cartasJuego)

    //Afegim la funció click a les cartes del joc per per-les funcionar
    funcionOnClick(cartasGiradas);
    //Quan tenim totes les cartes en el tauler, mostrem el timer i el posem en marxa.
    timer();
}

function funcionOnClick(cartasGiradas) {
    $(".carta").on("click",function(){
        //contador();
        let idCarta = $(this).find(".davant").attr("id")
        if (!$(this).hasClass("carta-girada") && cartasGiradas.length < 2) {
            $(this).toggleClass("carta-girada");
            cartasGiradas.push(idCarta);
        }

        if (cartasGiradas.length == 2) {
            if (cartasGiradas[0] == cartasGiradas[1]) {
                setTimeout(function() {
                    $(".carta-girada").fadeOut(function(){
                        $(this).hide();
                    });
                    
                }, 500);

                vaciarCartasDeArray(idCarta);
                
            } else{
                setTimeout(function() {
                    $(".carta-girada").removeClass("carta-girada");
                }, 500);
            }
            cartasGiradas = [];
        }
    });
}

function vaciarCartasDeArray(idCarta) {
    for (let i = 0; i < cartasJuego.length; i++) {
        if (cartasJuego[i] == idCarta) {
            cartasJuego[i] = null;
        }
    }

    cartasJuego = cartasJuego.filter(value=>value!=null);

    if (cartasJuego.length === 0) {
        finalPartida();     
    }
}

function finalPartida() {
    setTimeout(function() {
        $('footer').append('<h4>El Joc ha acabat! Vols tornar a jugar?</h4><button class="volverAJugar">Tornar a jugar!</button>');
        $('.volverAJugar').click(function (e) {
            e.preventDefault();
            location.reload();
        });
    }, 1000);
}

function barajarCartas() { //Barreja les cartes per tenir un ordre aleatori
    let index = arrayCartes.length;
    while (index != 0) {
        let rnd = Math.floor(Math.random() * index + 1);
        index--;
        [arrayCartes[index], arrayCartes[rnd]] = [arrayCartes[rnd], arrayCartes[index]];
    }
    arrayCartes = arrayCartes.filter(value=>value!=undefined);
}

function random(carta, divCartas) {
    //agafem un numero aleatori de l'array ja barrejada.
    let rnd = Math.floor((Math.random() * divCartas) + 1);
    //mirem si aquest número ja està en l'array definitiu del joc.
    let valores = cartasJuego.filter(value=>value===arrayCartes[rnd]);
    //Volem que cada número estigui repetit dues vegades.
    if (valores.length<2) {
        cartasJuego.push(arrayCartes[rnd]);
        carta.find(".davant").addClass(arrayCartes[rnd]);
        carta.find(".davant").attr('id',arrayCartes[rnd]);
    } else{  //Si ja està dos vegades no el tornem a posar. I tornem a cridar la funció aplicant recursivitat
        random(carta, divCartas);
    }
}