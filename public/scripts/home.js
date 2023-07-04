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
        if (!resource.rating) {
          resource.rating = 'No rating'
        }
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
        const currentBadge = `<span class="badge badge-${resource.category_id.toString() } text-bg-primary resource-category">${resource.category_name}</span>`
        $('#filter-group').next().remove()
        $('#filter-group').after(currentBadge);
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
    getFilteredQuery('HTML');
  })

  $('.filter-css').on('click', function(e) {
    e.preventDefault();
    getFilteredQuery('CSS');
  })

  $('.filter-javascript').on('click', function(e) {
    e.preventDefault();
    getFilteredQuery('Javascript');
  })

  $('.filter-version-management').on('click', function(e) {
    e.preventDefault();
    getFilteredQuery('Version Management');
  })

  $('.filter-databases').on('click', function(e) {
    e.preventDefault();
    getFilteredQuery('Databases');
  })

  $('.filter-testing').on('click', function(e) {
    e.preventDefault();
    getFilteredQuery('Testing');
  })

  $('.filter-other').on('click', function(e) {
    e.preventDefault();
    getFilteredQuery('Other');
  })



})
