$(document).ready(function(){

    $('.login-btn').on('click', function() {
      console.log('works');
      location.href = "/login";
    });


    $('.sign-up-btn').on('click', function() {
      console.log('works');
      location.href = "/signup";
    });

})


