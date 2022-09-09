$(document).ready(function() {
	const convertVideoButton = $('#convert-video');
	const youtubeUrlText = $('#youtube-url');

	convertVideoButton.on('click', function() {
		var dataString = youtubeUrlText.val();

		$.ajax
		({
  		  type: "POST",
  		  url: "/download",
		  contentType: "application/json",
		  data: JSON.stringify({"data":dataString}),
  		  success: function(html)
  		  {
     		    alert(html);
  		  }
		});
	});
});
