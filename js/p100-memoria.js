var ampladaCarta, alcadaCarta;
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

$(function(){
    var f, c, carta;
    f=1;
    c=1;

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
   
    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });
});