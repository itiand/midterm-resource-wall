
$( document ).ready(()=> {

$('#profile-signup-btn').on('click', (event) => {
  event.preventDefault();
  console.log("clicked")
  const newUser = {
    name: $("#signup-fullname").val(),
    username: $("#signup-username").val(),
    email: $("#signup-email").val(),
    password: $("#signup-password").val()
  }
  console.log("DATA", newUser)
  $.ajax({
    method: 'POST',
    url: '/signup',
    data: newUser
  })
  .done(function(response) {
    // if success, redirect to the desired page
    console.log(response);
    window.location.href = '/home';
  })
  .fail(function(error) {
    // responds with an error? display the error message on the page
    const errorMessage = error.responseJSON && error.responseJSON.error ? error.responseJSON.error : 'An error occurred';
    alert(errorMessage);
  });
//redirect to my resources?

});

})
