document.addEventListener('DOMContentLoaded', function() {
    $('#contactForm').validate({
        ignore: '[data-validation="ignore"]',
        validClass: "is-valid",
        errorClass: "is-error",
        errorClassField: "is-error-field",
        sendedClass: "sended-class",
        errorPlacement: function(error, element) {
            error.appendTo(element.closest('.wrap-form-field'))
        },
        highlight: function(element, errorClass, validClass) {
            $(element).closest('.form_field').addClass(this.settings.errorClassField).removeClass(validClass);
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).closest('.form_field').addClass(validClass).removeClass(this.settings.errorClassField);
        },
        messages: {
            email: {
                required: "",
                email: "Email address in not correct"
            }
        },
        submitHandler: function(form) {
            const email = $('#email').val();
            const emailData = {
                email
            };
            (async() => {
                try {
                    const response = await axios.post(
                        "https://gapi.onlizer.com/api/webhook/max.demydenko.contactatgmail.com-e80f3acf18394426b6be65166d060527/2ad6cb3dc789476ca70f71f73e73cb13/webhook",
                        emailData
                    );

                    $('.sended-text').show();
                    $('.error-message').hide();
                    $('.form_field').addClass('sended-class');
                } catch (error) {
                    console.error('Error:', error);
                    $('.error-message').show();
                    $('.sended-text').hide();
                }
            })();
        }
    });
    $('[type="email"]').on('input', function() {
        const $this = $(this);
        const form = $this.closest('form');
        const allFields = form.find('.form_field');

        $('.sended-text').hide();
        $('.form_field').removeClass('sended-class');

        if ($this.val()) {
            $this.closest('.form_field').addClass('is-filled');
        } else {
            $this.closest('.form_field').removeClass('is-filled');
        }
        if (allFields.filter('.is-filled').length > 0) {
            $('[data-submit]').removeAttr('disabled').css('pointer-events', 'auto');
        } else {
            $('[data-submit]').attr('disabled', 'disabled').css('pointer-events', 'none');
        }
    });
    $('.form_input-icon').on('click', function() {
        $(this).siblings('.form_input').focus();
    });
});