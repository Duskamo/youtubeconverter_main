$(document).ready(function() {
	const convertVideoButton = $('#convert-video');
	const downloadVideoButton = $("#download-video");
	const youtubeUrlText = $('#youtube-url');
	const videoButton = $('#video-button');
	const audioButton = $('#audio-button');
	const videoCard = $('#video-card');

	const videoThumbnail = $('#video-thumbnail');
	const videoTitle = $('#video-title');
	const videoDuration = $('#video-duration');
	const videoTable = $('#video-table');

	videoCard.hide();

	videoButton.on('click', function() {
		// Set button styling
		videoButton.addClass("active");
		videoButton.attr("aria-pressed","true");
		audioButton.removeClass("active");
		audioButton.attr("aria-pressed","false");

		// Update table
		var dataString = youtubeUrlText.val();
		$.ajax
		({
  		  type: "POST",
  		  url: "/download",
		  	contentType: "application/json",
		  	dataType: "json",
			  data: JSON.stringify({"url":dataString, "type":"video"}),
	  		  success: function(html)
	  		  {
	     		    videoTable.html("");
	     		    for (let i = 0; i < html.videos.length; i++) {
	     		    	videoTable.append(
		     		    	"<tr>" +
				          "<td>" + html.videos[i].resolution + "</td>" +
				          "<td>" + html.videos[i].size + "mb</td>" +
				          '<td><button type="button" class="btn btn-primary"><i class="fa-solid fa-video"></i> Download</button></td>' +
				        "</tr>"
				        );
	     		    }
	  		  }
			});
	});

	audioButton.on('click', function() {
		// Set button styling
		audioButton.addClass("active");
		audioButton.attr("aria-pressed","true");
		videoButton.removeClass("active");
		videoButton.attr("aria-pressed","false");

		// Update table
		var dataString = youtubeUrlText.val();
		$.ajax
		({
  		  type: "POST",
  		  url: "/download",
		  	contentType: "application/json",
		  	dataType: "json",
			  data: JSON.stringify({"url":dataString, "type":"audio"}),
	  		  success: function(html)
	  		  {
	     		    videoTable.html("");
	     		    for (let i = 0; i < html.videos.length; i++) {
	     		    	videoTable.append(
		     		    	"<tr>" +
				          "<td>" + html.videos[i].resolution + "</td>" +
				          "<td>" + html.videos[i].size + "mb</td>" +
				          '<td><button type="button" class="btn btn-primary"><i class="fa-solid fa-headphones"></i> Download</button></td>' +
				        "</tr>"
				        );
	     		    }
	  		  }
			});
	});

	convertVideoButton.on('click', function() {
		videoCard.show();

		var dataString = youtubeUrlText.val();

		$.ajax
		({
  		  type: "POST",
  		  url: "/download",
		  	contentType: "application/json",
		  	dataType: "json",
			  data: JSON.stringify({"url":dataString, "type":"video"}),
	  		  success: function(html)
	  		  {
	  		  		videoThumbnail.attr("src",html.thumbnail_url);
	     		    videoTitle.html(html.title);
	     		    videoDuration.html(html.length);

	     		    videoTable.html("");
	     		    for (let i = 0; i < html.videos.length; i++) {
	     		    	videoTable.append(
		     		    	"<tr>" +
				          "<td>" + html.videos[i].resolution + "</td>" +
				          "<td>" + html.videos[i].size + "mb</td>" +
				          '<td><button type="button" class="btn btn-primary"><i class="fa-solid fa-video"></i> Download</button></td>' +
				        "</tr>"
				        );
	     		    }
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
