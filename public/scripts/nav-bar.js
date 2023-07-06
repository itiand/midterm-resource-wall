
$(() => {
  $('#search').on('click', () => {
    console.log("click")
    console.log("searchtext", $('#search-text'))
    // const data = {
    //     name: event.target.title.value,
    //     description: event.target.description.value,
    //     url: event.target.url.value,
    //     photo_url: event.target.photo_url.value,
    //     category_id: event.target.category_id.value
    //   }

    $.ajax({
      method: 'GET',
      url: '/api/resources',
      dataType: 'json',
      data: {
        text: $('#search-text').val()
      }
    })
    .done((response) => {
      console.log(response)
    });
  });
});
