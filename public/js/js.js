//
function Valida(formulario) {
    /* Validación de campos NO VACÍOS */
    if ((formulario.name.value.length == 0) || (formulario.encrypted_password.value.length ==0)) {
        alert('Campos Vacios');
        return false;
    }
    // if (isNaN(parseInt(formulario.name.value))) {
    //     alert('Usuario No Registrado');
    //     return false;
    // }
    /* si no hemos detectado fallo devolvemos TRUE */
    return true;

}
// $("#login-button").click(function(event){
//     event.preventDefault();
//     $('form').fadeOut(500);
//     $('.wrapper').addClass('form-success');
// });
