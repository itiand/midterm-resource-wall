$(() => {
  console.log("we're here", $('#resource-form'))

  $('#resource-form').submit(function(event) {
    console.log("event", event)
    event.preventDefault()
    const data = $(this).serialize();
    // const data = {
    //   title: event.target.title.value,
    //   description: event.target.description.value,
    //   url: event.target.url.value,
    //   photo_url: event.target.photo_url.value,
    //   category_id: event.target.category_id.value
    // }

    $.ajax({
      method: 'POST',
      url: '/add',
      data
    })

    .then((response) => {
      console.log("response", response)
      // window.location.href
      // const $usersList = $('#users');
      // $usersList.empty();

      // for(const user of response.users) {
      //   $(`<li class="user">`).text(user.name).appendTo($usersList);
      // }
    });
  });
});
