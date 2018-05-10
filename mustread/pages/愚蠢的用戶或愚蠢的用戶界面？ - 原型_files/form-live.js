jQuery(function($){
    var form = $('#form_signup'),
        isPremium,
        showFields,
        showFirstName,
        showLastName,
        slug = (typeof window.formSlug == 'undefined')?false:formSlug;

    // Prohibit scrolling for embeds
    if (
        $('body').is('.as_embed') &&
        !$('body').is('.no-args')
    ) {
        $(window).on('touchmove scroll', function(e){
            e.preventDefault();
            window.scrollTo(0,0);
        });
    }

    $('.list-page-title').unbind('flowtype');
    $('.list-page-title').flowtype({
        maximum: 725,
        minFont: 14,
        maxFont: 27,
        fontRatio: 18
    });

  $(form).find('#submit').unbind('click');
  $(form).find('#submit').click(saveSubscriber);

  $(form).find('.multi-field > input').unbind('focus');
  $(form).find('.multi-field > input').focus(function(e){
    if ($(this).parent().hasClass('current'))
        return true;

    $('.multi-field.current > input').focus();
  });

  $(form).find('.multi-field > input').unbind('keydown');
  $(form).find('.multi-field > input').keydown(function(e){
    var key = e.keyCode || e.which;
    if (key === 13) saveSubscriber();
    if (key === 38) resetFields();
  });

  $(form).unbind('submit');
  $(form).submit(function(){ return false; });

  new Clipboard('.form-link-click');

  if (
    !slug &&
    $('body').hasClass('page-template-template-app') &&
    $('.list-page').length &&
    $('.list-page').attr('id')
  ) slug = $('.list-page').attr('id').replace('view_', '');

  if (!slug)
      return false;

  $.ajax({
    type: 'POST',
    url: (typeof ajaxUrl === 'undefined') ? '/wp-admin/admin-ajax.php' : ajaxUrl,
    data: {
        action: 'up_get_form_data',
        slug: slug
    },
    success: function(response) {
        response = $.parseJSON(response);
        if (response.success != 1)
            return false;

        isPremium = (response.isPremiumAuthor == 1);

        if (!isPremium)
            $('.powered-by').attr('style', '');
        else
            $('.powered-by').remove();

        //if (isPremium && response.prefillForm)
          // prefillForm(response.prefillForm);
      }
  });
});

var formValidateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || email.trim() == '')
        return false;

    return re.test(email);
}

var formInputFloatLabel = function() {
    var $ = jQuery,
        input = this,
        label = ($(input).attr('placeholder'))?$(input).attr('placeholder'):false,
        label = ($(input).attr('data-label'))?$(input).attr('data-label'):label,
        type = $(input).attr('type'),
        value = $(input).val();

    if (!label)
        return true;

    if (value.length <= 0) {
        if ($(input).hasClass('float-label'))
            $(input).removeClass('float-label');

        $(input).siblings('.float-label-text').remove();

        return true;
    }

    if ($(input).hasClass('float-label'))
        return true;

    $('<label class="float-label-text">' + label + '</label>').insertBefore(input);

    $(input).addClass('float-label');
}

var nextField = function(e) {
    var $ = jQuery,
        current = $('.multi-field.current'),
        hasNext = ($(current).next('.multi-field').length > 0),
        next = $(current).next('.multi-field'),
        nextIsLast = ($(next).next('.multi-field').length <= 0);

    if (e) e.preventDefault();

    if (!hasNext) {
        return false;
    }

    $(current).removeClass('current');
    $(current).addClass('previous');
    $(next).addClass('current');
    $(next).addClass('seen');

    // Has been edited
    if (!$(next).hasClass('seen'))
        $(next).addClass('seen');

    return false;
}

var nextInvalidField = function(e) {
    var $ = jQuery,
        form = $('#form_signup'),
        fields = $(form).find('.multi-field > input'),
        fieldCount = $(form).find('.multi-field').length,
        fieldSeenCount = $(form).find('.multi-field').not('.seen').length,
        current = $(form).find('.multi-field.current'),
        prev = $(form).find('.multi-field.previous'),
        invalidField = false;

    if (e) e.preventDefault();

    $.each(fields, function(index){
        var field = $(this),
            value = $(field).val(),
            holder = $(field).parent();

        if (invalidField !== false)
            return false;

        if ($(field).attr('id') == 'email' && !value.length)
            invalidField = holder;

        if (
            !invalidField &&
            $(field).attr('type') == 'email' &&
            !formValidateEmail(value)
        ) invalidField = holder;

        // Mark as invalid
        $(invalidField).addClass('invalid');
        $(invalidField).find('input').on('keydown', function(){
            $(invalidField).removeClass('invalid');
        });
    });

    if (
        !invalidField &&
        fieldCount > 1 &&
        fieldSeenCount > 0
    ) invalidField = $(current).next('.multi-field').not('.seen');

    if (!invalidField)
        return false;

    if ($(invalidField).hasClass('current'))
        return true;

    $(prev).removeClass('previous');
    $(current).addClass('previous');
    $(current).removeClass('current');
    $(invalidField).addClass('current');
    $(invalidField).addClass('seen');
    $(invalidField).find('input').focus();

    if ($(invalidField).is(':last-child')) {
        $(form).find('#submit > .text').text(formData.submitText);
        $(form).find('#submit > .icon').html(formData.submitIcon);
    }

    return true;
}

var prevField = function(e) {
    var $ = jQuery,
        current = $('.multi-field.current'),
        prev = $(current).prev('.multi-field'),
        hasPrev = ($(prev).length > 0);

    if (e) e.preventDefault();

    if (!hasPrev) {
        return false;
    }

    $(current).removeClass('current');
    $(current).addClass('previous');
    $('.multi-field.previous').removeClass('previous');
    $(prev).addClass('current');
    $(prev).find('input').focus();

    // Has been edited
    if (!$(prev).hasClass('seen'))
        $(prev).addClass('seen')

    return false;
}

var goToField = function(selector) {
    var $ = jQuery,
        form = $('#form_signup'),
        current = $(form).find('.multi-field.current'),
        prev = $(form).find('.multi-field.previous'),
        next = $(form).find('.multi-field' + selector);

    $(prev).removeClass('previous');
    $(current).addClass('previous');
    $(current).removeClass('current');
    $(next).addClass('current');
    $(next).addClass('seen');
    $(next).find('input').focus();

    return true;
}

var resetFields = function() {
    var $ = jQuery,
        form = $('#form_signup'),
        buttonText = formData.submitText,
        buttonIcon = formData.submitIcon;

    // Enable all inputs
    $(form).find('input').each(function(){
        $(this).prop('disabled', false);
    });

    // Reset seen settings
    $(form).find('.seen').removeClass('seen');

    if ($('.multi-field').length > 1) {
        buttonText = formData.nextText;
        buttonIcon = formData.nextIcon;
    }

    $(form).find('#submit > .text').show();
    $(form).find('#submit > .icon').hide();

    $(form).find('#submit > .text').text(buttonText);
    $(form).find('#submit > .icon').html(buttonIcon);

    // Go to first field
    goToField('#email_holder');
}

var saveSubscriber = function(){
  var $ = jQuery,
          form = $('#form_signup'),
          email = $(form).find('#email').val(),
          buttonText = $(form).find('#submit > .text'),
          buttonIcon = $(form).find('#submit > .icon'),
          errorMessage = 'Oops! Please try again.',
          currentField = $(form).find('.multi-field.current > input').attr('id'),
          hasAdditionalFields = (
            $(form).find('#first_name_holder').length ||
            $(form).find('#last_name_holder').length ||
            $(form).find('#full_name_holder').length
          ),
          sentField,
          data = {
            action:     'add_list_signup',
            post_id:    ($(form).find('#form').val() || ''),
            signup_id:  ($(form).find('#signup').val() || ''),
            email:      email,
            first_name: ($(form).find('#first_name').val() || ''),
            last_name:  ($(form).find('#last_name').val() || ''),
            full_name:  ($(form).find('#full_name').val() || ''),
            source:     window.location.href
          };

  if (typeof refData !== 'undefined') {
    data.referrer = refData.referrer;
  }

  // Save email if present and valid
  // OR if form is filled out
  if (nextInvalidField())
    return false;

  $(buttonText).hide();
  $(buttonText).text(formData.loadingText);
  $(buttonIcon).html(formData.loadingIcon);
  $(buttonIcon).show();

  $.ajax({
    type: 'POST',
    url: (typeof ajaxUrl === 'undefined') ? '/wp-admin/admin-ajax.php' : ajaxUrl,
    data: data,
    success: function(response) {
      response = $.parseJSON(response);

      console.log(response);

      // Reset button icon and text
      $(buttonIcon).hide();
      $(buttonText).show();

      // Uh oh! Fail...error and die
      if (response && response.success != '1') {
        if (response.message)
          errorMessage = response.message;

        alertMsgForm(errorMessage);

        return false;
      }

      // If current field is email then continue with form
      if (
        currentField == "email" &&
        hasAdditionalFields
      ) {
        nextInvalidField();
        return false;
      }

      // Save GA event
      if (typeof ga === "function" && response.signupId)
        ga('send', 'event', 'Forms', 'New Subscriber', response.signupId, '1');

      if (true)
        $('.kabuki').fadeOut(300, function(){
          $(form).hide();
          $('.list-desc').hide();
          $('.list-signups-count').hide();
          $('.list-page-title').text($('.list-page-title').attr('data-confirmation'));
          $('.list-share').show();
          $('.kabuki').fadeIn(300);
        });

      return true;
    },
    error: function(data){
      console.log("error updating signup");
      console.log(data);
    }
  });

  return false;
}

var alertMsgForm = function(message) {
    var $ = jQuery,
        form = $('#form_signup'),
        buttonText = $(form).find('#submit > .text'),
        buttonIcon = $(form).find('#submit > .icon'),
        currentFieldHolder = $(form).find('.multi-field.current');

    $(currentFieldHolder).removeClass('current');
    $('<div class="multi-field current invalid alert-message-field">' +
      '<input class="form-control" style="color: red;" type="text" disabled="disabled" value="' + message + '"/>' +
      '</div>').insertAfter($(currentFieldHolder));

    // Reset after one second
    setTimeout(function(){
        $('.alert-message-field').remove();

        // Reset fields
        resetFields();
    }, 1000);

    $(buttonText).text(formData.errorText);
    $(buttonIcon).html(formData.errorIcon);
}

var prefillForm = function(args) {
    var $ = jQuery,
        form = $('#form_signup'),
        email = args.email || false,
        firstName = args.first_name || false,
        lastName = args.last_name || false;

    if (email && !$('#email').is(':focus'))
        $(form).find('#email').val(email);
    if (firstName && !$('#first_name').is(':focus'))
        $(form).find('#first_name').val(firstName);
    if (lastName && !$('#last_name').is(':focus'))
        $(form).find('#last_name').val(lastName);

    return true;
}