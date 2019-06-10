$(function () {
  //remove errors
  function removeErrors(){
    $('form.login p.error, form.register p.error').remove();
    $('form.login input, form.register input').removeClass('error');
  }
  // toggle
  let flag = true;
  $('.switch-button').on('click', function (event) {
    event.preventDefault();

    $('input').val('');
    $('p.error').remove();
    $('input').removeClass('error');

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
  $('form.login input, form.register input').on('focus', function () {
   removeErrors();
  });

  // register
  $('.register-button').on('click', function (event) {
    event.preventDefault();
   removeErrors();    

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
    }).done(function (data) {
      console.log(data.error);

      if (!data.ok) {
        $('.register h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function (item) {
            $('input[name=' + item + ']').addClass('error');
          });
        }
      } else {
        // $('.register h2').after('<p class="success">Отлично!</p>');
        $(location).attr('href', '/')

      }
    });
  });

  // login
  $('.login-button').on('click', function (event) {
    event.preventDefault();
    removeErrors();

    let data = {
      login: $('#login-login').val(),
      password: $('#login-password').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/login'
    }).done(function (data) {
      console.log(data.error);

      if (!data.ok) {
        $('.login h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function (item) {
            $('input[name=' + item + ']').addClass('error');
          });
        }
      } else {
        // $('.login h2').after('<p class="success">Отлично!</p>');
        $(location).attr('href', '/')
      }
    });
  });
});

//Add Post medium-editor
$(function () {
  // let editor = new MediumEditor('#post-body', {
  //   placeholder: {
  //     text: '',
  //     hideOnClick: true
  //   }
  // });

    //remove errors
    function removeErrorsPost(){
      $('.post-form p.error').remove();
      $('.post-form input, #post-body').removeClass('error');
    }

  //clear
  $('post-form input, #post-body').on('focus', function () {
    removeErrorsPost();
  });

  // publish
  $('.publish-button').on('click', function (e) {
    e.preventDefault();
    removeErrorsPost();
    
    var data = {
      title: $('#post-title').val(),
      body: $('#post-body').val()
    };

    console.log(JSON.stringify(data));
    
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/post/add'
    }).done(function (data) {
      console.log(data);
      if (!data.ok) {
        $('.post-form h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function (item) {
            $('#post-' + item).addClass('error');
          });
        }
      } else {
        $(location).attr('href', '/');
      }
    });
  });
}); 