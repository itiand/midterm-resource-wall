const showErrorBanner = function(message) {
  $('#errorMessage').text(message);
  $('#errorMessage').slideDown();
  setTimeout(() => {
    $('#errorMessage').slideUp();
  }, 5000);
};

$(document).ready(function() {
  $('#loginForm').submit(function(e) {
    e.preventDefault();

    const formData = $(this).serialize();

    //  AJAX request to validate the login
    $.post('/login', formData)
      .done(function(response) {
        // if success, redirect to the desired page
        console.log(response);
        window.location.href = '/home';
      })
      .fail(function(error) {
        // responds with an error? display the error message on the page
        const errorMessage = error.responseJSON && error.responseJSON.error ? error.responseJSON.error : 'An error occurred';
        showErrorBanner(errorMessage);
      });
  });
});
