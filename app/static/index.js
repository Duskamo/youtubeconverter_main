$(document).ready(function() {
	const convertVideoButton = $('#convert-video');
	const downloadVideoButton = $("button");
	const youtubeUrlText = $('#youtube-url');
	const videoButton = $('#video-button');
	const audioButton = $('#audio-button');
	const videoCard = $('#video-card');

	const videoThumbnail = $('#video-thumbnail');
	const videoTitle = $('#video-title');
	const videoDuration = $('#video-duration');
	const videoTable = $('#video-table');

	videoCard.hide();

	$(document).on({
		ajaxStart: function() {
			$('#loading').show();
		},
		ajaxStop: function() {
			$('#loading').hide();
		}
	});

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
				          '<td><button type="button" class="btn btn-primary" id="download-button" data-type="video" data-id="' + i + '"><i class="fa-solid fa-video"></i> Download</button></td>' +
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
				          '<td><button type="button" class="btn btn-primary" id="download-button" data-type="audio" data-id="' + i + '"><i class="fa-solid fa-headphones"></i> Download</button></td>' +
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
				          '<td><button type="button" class="btn btn-primary" id="download-button" data-type="video" data-id="' + i + '"><i class="fa-solid fa-video"></i> Download</button></td>' +
				        "</tr>"
				        );
	     		    }
	  		  }
			});
	});

	$('tbody').on("click", "button", function() {
		var dataString = youtubeUrlText.val();

		$.ajax
                ({
                  type: "POST",
                  url: "/send-video",
                  contentType: "application/json",
							  	dataType: "json",
								  data: JSON.stringify({"url":dataString, "type":$(this).attr('data-type'), "id":$(this).attr('data-id')}),
                  success: function(html)
                  {
                    alert(html);
                  }
                });

	});
});
