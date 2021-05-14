/**
 * PHP Email Form Validation - v2.3
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
!(function ($) {
  'use strict';

  $('form.php-email-form').submit(function (e) {
    e.preventDefault();

    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate')
          .html(
            ierror
              ? i.attr('data-msg') !== undefined
                ? i.attr('data-msg')
                : 'wrong Input'
              : ''
          )
          .show('blind');
      }
    });
    f.children('textarea').each(function () {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate')
          .html(
            ierror
              ? i.attr('data-msg') != undefined
                ? i.attr('data-msg')
                : 'wrong Input'
              : ''
          )
          .show('blind');
      }

      if (!ferror) {
        // var submit = document.querySelector("#submit")
        var inputs = document.querySelectorAll('input');
        var message = document.querySelector('textarea');
        var this_form = $(document);

        //submit = document.querySelector("#submit")

        this_form.find('.loading').slideDown();
        var name = inputs[0].value;
        var email = inputs[1].value;
        var subject = inputs[2].value;
        var user_message = message.value;
        send(name, email, subject, user_message);
      }
    });
    if (ferror) return false;

    var this_form = $(this);
    var action = $(this).attr('action');

    // if (!action) {
    //   this_form.find('.loading').slideUp();
    //   this_form
    //     .find('.error-message')
    //     .slideDown()
    //     .html('The form action property is not set!');
    //   return false;
    // }

    this_form.find('.sent-message').slideUp();
    // this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();

    if ($(this).data('recaptcha-site-key')) {
      var recaptcha_site_key = $(this).data('recaptcha-site-key');
      grecaptcha.ready(function () {
        grecaptcha
          .execute(recaptcha_site_key, { action: 'php_email_form_submit' })
          .then(function (token) {
            php_email_form_submit(
              this_form,
              action,
              this_form.serialize() + '&recaptcha-response=' + token
            );
          });
      });
    }

    return true;
  });
})(jQuery);
