const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
var searchQuery, pageToken = '';

$('form').submit(function(event){
	event.preventDefault();
	if(searchQuery !== $('input').val()+' puppies'){
		pageToken = '';
	}
	searchQuery = $('input').val()+' puppies';
	getDataFromApi(searchQuery, renderResults);
});

$('.js-results').on('click', 'button', function(){
	$('form').submit();
});

function getDataFromApi(searchTerm, callback){
  var query = {
  	part: 'snippet',
  	key: 'AIzaSyAesluMeXQRiHMHR-B0Ud_35mPBHAmuAMg',
  	q: searchTerm,
  	pageToken: pageToken
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResults(data){
	pageToken = data.nextPageToken;
	$('.js-results').find('button').remove();
	$('h2').html(`
		${searchQuery}
	`);
	for(i=0; i<data.items.length; i++){
		$('.js-results').append(`
			<div class="result-container">
				<a class="result" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}">
					<img src="${data.items[i].snippet.thumbnails.medium.url}" class="thumbnail"/>
					<p class="title">${data.items[i].snippet.title}</p>
				</a>
			</div>
		`);
	}
	$('.js-results').append(`
		<button class="button">More ${searchQuery}, please!</button>
	`);
}