$(function () {
  let flag = true;
  $('.switch-button').on('click', function (event) {
    event.preventDefault();

    if (flag) {
      flag = false;
      $('.register').show('slow');
      $('.login').hide();
    } else {
      flag = true;
      $('.login').show('slow');
      $('.register').hide();
    }
  });

  //clear
  $('input').on('focus', function() {
    $('p.error').remove();
    $('input').removeClass('error');
    $('p.success').remove();
    $('input').removeClass('success');
  });

  // register
  $('.register-button').on('click', function (event) {
    event.preventDefault();

    let data = {
      login: $('#register-login').val(),
      password: $('#register-password').val(),
      passwordConfirm: $('#register-password-confirm').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/register'
    }).done(function(data) {
      console.log(data.error);
      
      if(!data.ok) {
        $('.register h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('input[name=' + item + ']').addClass('error');
          });
        }
      } else {
        $('.register h2').after('<p class="success">Отлично!</p>');
      }
    });
  });
});