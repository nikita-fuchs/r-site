// Validate
function validate_form() {
    if($('#form_accept').is(':checked')){
        $('.form').removeClass('error');
        return true;
    }
    else{
        $('.form').addClass('error');
    }
}

$('#form_accept').change(function() {
    if ($(this).is(':checked')) {
        validate_form();
    }
});

$('#btn_proceed').click(function (e) {
    e.preventDefault();
    if(validate_form()){
        var href = $(this).attr('href');
        window.location.href = href;
    }
});