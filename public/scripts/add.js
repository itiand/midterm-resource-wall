$(() => {
  $('#resource-form').on('submit', (event) => {
    event.preventDefault()
    const data = {
      title: event.target.title.value,
      description: event.target.description.value,
      url: event.target.url.value,
      photo_url: event.target.photo_url.value,
      category_id: 1 // add dynamic selected category id
    }

    $.ajax({
      method: 'POST',
      url: '/add',
      data
    })
    .done((response) => {
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
