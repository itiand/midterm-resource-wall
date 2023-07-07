// Client facing scripts here
// $(() => {
//   $('#fetch-users').on('click', () => {
//     $.ajax({
//       method: 'GET',
//       url: '/api/users'
//     })
//     .done((response) => {
//       const $usersList = $('#users');
//       $usersList.empty();

//       for(const user of response.users) {
//         $(`<li class="user">`).text(user.name).appendTo($usersList);
//       }
//     });
//   });
// });

$( document ).ready(()=> {

  $.ajax({
    method: 'GET',
    url: '/api/user'
  })
  .then((user) => {

    //console.log("what is this response", response)
    // for(const user of response.users) {
    //   if( user.id === Number(req.session.user_id)) {   ///cookie session need to update this
        console.log("user1", user.name)
        $("#input-fullname").val(user.name)
        $("#input-email").val(user.email)
        $("#input-username").val(user.username)
        $("#input-password").val(user.password)
    //   }
    // }
  });

  $('#profile-edit-btn').on('click', (event) => {
    event.preventDefault();
    console.log("clicked")
    const returnedEdit = {
      name: $("#input-fullname").val(),
      username: $("#input-username").val(),
      email: $("#input-email").val(),
      password: $("#input-password").val()
    }
    $.ajax({
      method: 'POST',
      url: '/api/user',
      data: returnedEdit
    })
    .done(function(response) {
      // if success, redirect to the desired page
      console.log(response);
      //window.location.href = '/home';   ////needs to
    })
    console.log("DATA", returnedEdit)

    alert(`You have sucessfully updated your profile! 👍 `);;

  });

})
