
$(() => {
  $('#search').on('click', () => {
    console.log("click")
    console.log("searchtext", $('#search-text'))
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
