$(document).ready(function() {
  $(document).on('click', '.logout', function(e) {
    e.preventDefault();

    $.post('/logout', function() {
      // Redirect to the login page
      window.location.href = '/login';
    });
  });
});
