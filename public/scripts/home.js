const getFilteredQuery = function(category) {
  // Make an AJAX request to the server to get the filtered resources
  $.ajax({
    url: `/home/category/${category}`, // Replace with the actual route on the server that handles the filtering
    method: 'GET',
    success: function(data) {
      const resources = data.resources;
      const resourceContainer = $('.resource-container');
      resourceContainer.empty();

      // Loop through the resources and append them to the container
      for (let resource of resources) {
        const card = `<div class="col">
          <div class="card">
            <img src="${resource.photo_url}" class="card-img-top resource-photoURL" alt="...">
            <div class="card-body">
              <h5 class="card-title resource-title">${resource.title}</h5>
              <p class="card-text resource-description">${resource.description}</p>
            </div>
            <div class="card-footer text-body-secondary d-flex justify-content-between">
              <div class="flex-left">
                <p class="mb-0 resource-userId">${resource.username}'s resource</p>
              </div>
              <div class="flex-right">
                <span class="badge badge-${resource.category_id.toString()} text-bg-primary resource-category">${resource.category_name}</span>
                <span class="badge rating-badge">${resource.rating}</span>
              </div>
            </div>
          </div>
        </div>`;
        resourceContainer.append(card);
      }
    },
    error: function(err) {
      console.log('AJAX Error:', err);
    }
  });
}

$(document).ready(function(){

  $('.filter-html').on('click', function(e) {
    e.preventDefault();
    //populate
    getFilteredQuery('HTML');
  })

  $('.filter-css').on('click', function(e) {
    e.preventDefault();
    //populate
    getFilteredQuery('CSS');
  })

  // $('.filter-javascript').on('click', function(e) {
  //   e.preventDefault();
  //   //populate
  //   getFilteredQuery('');
  // })



})
