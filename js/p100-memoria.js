var separacioH=20, separacioV=20;
var nFiles=2, nColumnes=2;

/* var jocCartes = [
    'carta14',
    'carta10',
    'carta2',
    'carta5'
]; */

var jocCartes = [];

$(function(){
    var f, c, carta;
    //fila
    f=1;
    //columna
    c=1;


    for (let i = 1; i <= 33; i++) {
        jocCartes[i] = 'carta'+i;
    }

    // mida del tauler
    $("#tauler").css({
        //Per ajustar el tauler 2x2, 4x4, etc. Multiplicar les dimensions.
        
        //1x1
        /*
        "width" : "120px",
        "height": "160px" 
        */

        //2x2
        "width" : "240px",
        "height": "320px"

        //4x4
        /* "width" : "480px",
        "height": "640px" */
    });

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

            let num = Math.floor((Math.random()*33) + 1);

            carta.find(".davant").addClass(jocCartes[num]);
        }
    }

    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });
});