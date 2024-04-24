var separacioH=20, separacioV=20;
var nFiles, nColumnes;
var arrayCartes = [];
var cartasJuego = [];
var cartasGiradas = [];

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

    $(".carta").on("click", function() {
        //Comprovem si hi ha + de 2 cartes girades
        if (!$(this).hasClass("carta-girada") && cartasGiradas.length < 2) {
            $(this).toggleClass("carta-girada");
            // Afegim id de carta a una array
            cartasGiradas.push($(this).text());
    
            if (cartasGiradas.length == 2) {
                // Mirar si els ids son iguals
                if (cartasGiradas[0] == cartasGiradas[1]) {
                    // Eliminar les cartes 
                    setTimeout(function() {
                        $(".carta-girada").fadeOut(function() {
                            $(this).hide();
                        });
                    }, 1000);
                } else {
                    // Girar carta si no iguals
                    setTimeout(function() {
                        $(".carta-girada").removeClass("carta-girada");
                    }, 1000); 
                }
                // Netejar array
                cartasGiradas = [];
            }
        }

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