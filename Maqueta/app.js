
$(document).ready(function () {
    $('#edit-acercaDe').hide();
});


function login() {
    $('#loginPpl').modal('show');

}

function chequeoLogin() {
    let nombre = $('#nombreLogin').val();
    if (nombre == 'a') {
        $('#login').hide();
        $('#loginPpl').modal('toggle');
        $('#edit-acercaDe').show();
    }
    else alert('sos boludo');

}

function abrirModalDatosPersonales() {

    $('#exampleModal').modal('show');

} 