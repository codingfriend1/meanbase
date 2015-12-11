// Custom Google Map Embed

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);
        
function init() {
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	var mapOptions = {
		// How zoomed in you want the map to start at (always required)
		zoom: 12,
		scrollwheel:true,
		disableDefaultUI:false,

		// The latitude and longitude to center the map (always required)
		center: new google.maps.LatLng(53.767735, -0.368377), // Hull, England

		// How you would like to style the map. 
		// This is where you would paste any style found on Snazzy Maps.
		styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"},{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]}]

	};

	// Get the HTML DOM element that will contain your map 
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('map');

	// Create the Google Map using our element and options defined above
	var map = new google.maps.Map(mapElement, mapOptions);

	// Let's also add a marker while we're at it
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(40.6700, -73.9400),
		map: map,
		title: 'Snazzy!'
	});
}