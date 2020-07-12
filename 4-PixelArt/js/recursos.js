// No modifiques estas funciones a menos que sepas MUY BIEN lo que estas haciendo!


// Abre una ventana para guardar nuestro arte en un archivo pixel-art.png
function guardarPixelArt() {
    html2canvas($("#grilla-pixeles"), {
        onrendered: function(canvas) {
            theCanvas = canvas;
            canvas.toBlob(function(blob) {
                saveAs(blob, "pixel-art.png");
            });
        }
    });
}

// Carga a un superheroe predefinido
function cargarSuperheroe(superheroe) {
    var $pixeles = $("#grilla-pixeles div");
    for (var i = 0; i < superheroe.length; i++) {
        $pixeles[i].style.backgroundColor = superheroe[i];
    }
}

//Implementamos la carga de un superheroe predefinido.
$(".imgs li img").click(function() {
    switch (this.id) {
        case "batman":
            cargarSuperheroe(batman); //Carga a Batman
            break;
        case "wonder":
            cargarSuperheroe(wonder); //Carga a Wonderwoman
            break;
        case "flash":
            cargarSuperheroe(flash); //Carga a Flash
            break;
        case "invisible":
            cargarSuperheroe(invisible); //Carga a Invisible
            break;
    }
});

//Implementamos el boton Guardar.
$("#guardar").click(guardarPixelArt);