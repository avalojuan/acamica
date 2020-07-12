var nombreColores = ['White', 'LightYellow',
    'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
    'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
    'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
    'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
    'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
    'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
    'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
    'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
    'LightGreen', 'PaleGreen', 'PaleTurquoise',
    'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
    'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
    'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
    'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
    'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
    'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
    'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
    'BlueViolet', 'DarkViolet', 'DarkOrchid',
    'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
    'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

//Variables auxiliares
var estado_mouse;

//Declaro elementos seleccionados
var $indicador_color = $("#indicador-de-color");
var paleta = document.getElementById("paleta");
var grilla_pixeles = document.getElementById("grilla-pixeles");
var $pixeles = $("#grilla-pixeles");


colorPersonalizado.addEventListener('change',
    (function() {
        // Se guarda el color de la rueda en colorActual
        colorActual = colorPersonalizado.value;
        // Completar para que cambie el indicador-de-color al colorActual
        $indicador_color.css("background-color", colorActual);

    })
);

//Genermos la Paleta con los colores del arreglo nombreColores.
function generarPaletaColores() {

    for (i in nombreColores) {
        var div = document.createElement("div");
        div.className = "color-paleta";
        div.style.backgroundColor = nombreColores[i];
        paleta.appendChild(div);
    }
}

//Generamos la grilla con los 1750 pixeles.
function generarGrillaPixeles() {
    for (i = 0; i < 1750; i++) {
        var div = document.createElement("div");
        grilla_pixeles.appendChild(div);
    }
}

//Función que selecciona un color de la paleta.
function seleccionarColor() {
    $("div.color-paleta").click(function() {
        var color = this.style.backgroundColor;
        $indicador_color.css("background-color", color);
    });
}

//Función que pinta el pixel con click/desplazamiento.
function pintarPixel() {
    var $pixel = $("#grilla-pixeles div");

    $pixel.click(function() { //Pintar al hacer click
        this.style.backgroundColor = $indicador_color.css("background-color");
    });

    $pixel.hover(function() { //Pintar en movimiento
        if (estado_mouse) this.style.backgroundColor = $indicador_color.css("background-color");
    });
}

//Función que detecta si el mouse esta apretado.
function estadoMouse() {

    addEventListener("mousedown", function() {
        estado_mouse = true;
    });
    addEventListener("mouseup", function() {
        estado_mouse = false;
    });
}

//Implementamos el boton "Borrar Todo".
$("#borrar").click(function() {
    $pixeles.find("div").animate({ backgroundColor: "white" }, 1000);
})


//Ejecución de funciones
generarPaletaColores();
generarGrillaPixeles();
seleccionarColor();
pintarPixel();
estadoMouse();