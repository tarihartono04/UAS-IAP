
function searchMovies() {
    $('#Movie-List').html('');

  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': '66c27b0',
      's': $('#search-input').val()
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $('#Movie-List').append(`
            <div class="col-md-4">
              <div class="card ">
                <img src="` + data.Poster + `" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">` + data.Title + `</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">` + data.Year + `</h6>
                  <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=" `+ data.imdbID +`">See Detail</a>
                </div>
              </div>
            </div>
          `);
        });
        

        $('#search-input').val('');

      } else {
        $('#Movie-List').html(`
          <div class="col">
            <h1 class="text-center">` + result.Error + `</h1>
          </div>
        `)
      }
    }
  });
}

$('#search-button').on('click', function () {
  searchMovies();
});

$('#search-input').on('keyup', function (e) {
  if (e.keyCode === 13) {
    searchMovies();
  }
});


$('#Movie-List').on('click', '.see-detail', function(){
    
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '66c27b0',
            'i': $(this).data('id')
        },
        success: function(movie){
            if(movie.Response ==="True"){
          const poster = movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
          $('#exampleModalLabel').text(movie.Title);
          $('.modal-body').html(`
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-4">
                  <img src="${poster}" class="img-fluid" />
                  `);

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                    <li class="list-group-item">Released: `+ movie.Released +`</li>
                                    <li class="list-group-item">Genre: `+ movie.Genre +`</li>
                                    <li class="list-group-item">Director: `+ movie.Director +`</li>
                                    <li class="list-group-item">Actors: `+ movie.Actors +`</li>


                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }

        }
    })
});
