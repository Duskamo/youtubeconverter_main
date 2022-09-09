$(document).ready(function() {
	const convertVideoButton = $('#convert-video');
	const downloadVideoButton = $("#download-video");
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

	downloadVideoButton.on("click", function() {
		$.ajax
                ({
                  type: "GET",
                  url: "/send-video",
                  success: function(html)
                  {
                    alert(html);
                  }
                });

	});
});
