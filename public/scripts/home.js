const getFilteredQuery = function(category) {
  // Make an AJAX request to the server to get the filtered resources
  $.get(`/home/category/${category}`, function(data) {

    // Loop through the resources and append them to the container
    const resourceContainer = $('.resource-container');
    addResourceOnUI(data.resources, resourceContainer);

    const currentBadge = `<span class="badge badge-${category} resource-category"><i class="fa-solid fa-square-xmark"></i> ${category}</span>`;
    $('#filter-group').next().remove();
    $('#filter-group').after(currentBadge);
  })
    .fail(function(err) {
      console.log('AJAX Error:', err);
    });
};

const getMyResources = function(id) {
  $.get(`/api/user/${id}/my-resources`, function(data) {

    // Loop through the resources and append them to the container
    const resourceContainer = $('.resource-container');
    addResourceOnUI(data.resources, resourceContainer);

    const currentBadge = `<span class="badge badge-my-resource resource-category"><i class="fa-solid fa-square-xmark"></i> Your resources</span>`;
    $('#filter-group').next().remove();
    $('#filter-group').after(currentBadge);
  })
    .fail(function(err) {
      console.log('AJAX Error:', err);
    });
};



const addResourceOnUI = function(resources, container) {
  container.empty();
  for (let resource of resources) {
    if (!resource.rating) {
      resource.rating = '-';
    }
    const card = `<div class="col">
      <div class="card" data-id="${resource.id}">
        <img src="${resource.photo_url}" class="card-img-top resource-photoURL resource-photoURL" alt="...">
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

    container.append(card);
  }
};

const getAllResources = function() {
  $.get(`/api/resources/all`, function(data) {
    addResourceOnUI(data.resources, $('.resource-container'));

    const currentBadge = `<span class="badge resource-category d-none"><i class="fa-solid fa-square-xmark"></i> TEST</span>`;
    $('#filter-group').next().remove();
    $('#filter-group').after(currentBadge);
  })};

  $(document).ready(function() {

    //FILTER LISTENERS
    $('.filter-html').on('click', function(e) {
      e.preventDefault();
      getFilteredQuery('HTML');
    });
    $('.filter-css').on('click', function(e) {
      e.preventDefault();
      getFilteredQuery('CSS');
    });
    $('.filter-javascript').on('click', function(e) {
      e.preventDefault();
      getFilteredQuery('Javascript');
    });
    $('.filter-version-management').on('click', function(e) {
      e.preventDefault();
      getFilteredQuery('Version Management');
    });
    $('.filter-databases').on('click', function(e) {
      e.preventDefault();
      getFilteredQuery('Databases');
    });
    $('.filter-testing').on('click', function(e) {
      e.preventDefault();
      getFilteredQuery('Testing');
    });
    $('.filter-other').on('click', function(e) {
      e.preventDefault();
      getFilteredQuery('Other');
    });

    //filter for my resources
    $('.filter-my-resource').on('click', function(e) {
      e.preventDefault();
      getMyResources(3);
    });

    //remove filter
    $(document).on('click', '.fa-square-xmark', function(e) {
      e.preventDefault();
      $(this).addClass('d-none');
      $(this).parent().addClass('d-none');

      //render back all resources
      getAllResources();
    });

    $(document).on('click', '.resource-photoURL', function(e) {
      e.preventDefault();
      console.log(this);
      $.get(`/resources/`)
      // $(this).addClass('d-none');
      // $(this).parent().addClass('d-none');

      // //render back all resources
      // getAllResources();
    });

    $('.resource-container').on('click', '.card-img-top, .card-title', function() {
      const resourceId = $(this).closest('.card').data('id');
      const url = `/resource/${resourceId}`; // Replace with the actual URL of your EJS page

      window.location.href = url;
    });


  });
