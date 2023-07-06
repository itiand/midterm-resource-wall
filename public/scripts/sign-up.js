
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
//redirect to my resources?
});

})
