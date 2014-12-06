var api_data;
var api_dataAll;
var api_data_recommend;
var loc;

function make_bandsintown_api_request_loc(artist_name,loc) {
	//var url = "https://api.bandsintown.com/artists/" + artist_name+"/events.json?&app_id=final";
	//var url = "http://api.bandsintown.com/events/search?artists[]=" + artist_name+"&location=" + loc +"&format=json&app_id=final";
	var url = "http://api.bandsintown.com/artists/" + artist_name+"/events/search.json?api_version=2.0&app_id=final&location=" + loc +"";
	//var url = "https://api.songkick.com/api/3.0/events.json?apikey=LXoF4HO8eDe4vyNK&artist_name=" + artist_name+"&min_date=2009-10-01&max_date=2009-10-30";
	$.ajax({
		url: url,
		dataType: "jsonp", // JSONP
		success: renderData
	})

}

function renderData(response) {
	api_data = response;
	//console.log(response);
	if (response.length != 0) {
		$("#display").hide();
		$("#result").show();
		$("#photo").attr("src", response[0].artists[0].image_url);
		for(var i = 0; i < response.length; i++) {
	      $("table.events tbody").append(
	        "<tr>" +
	          "<td>" + 
	            "<a href='" +  response[i].url + "'>" +
	              response[i].title + 
	            "</a>" +
	          "</td>" + 
	          "<td>" + response[i].formatted_datetime + "</td>" + 
	          "<td>" + response[i].formatted_location + "</td>" + 
	          "<td><a class='ticket'>Tickets</a></td>" +
	        "</tr>"
	      );
	    }
	}
	else {
		$("#display").hide();
		$(".txt").hide();
		$(".events").hide();
		$("#result").before("<div class='res'>No events found in your area.</div>");
	}
}

function make_bandsintown_api_request(artist_name) {
	//var url = "https://api.bandsintown.com/artists/" + artist_name+"/events.json?&app_id=final";
	//var url = "http://api.bandsintown.com/events/search?artists[]=" + artist_name+"&location=" + loc +"&format=json&app_id=final";
	var url = "http://api.bandsintown.com/artists/" + artist_name+"/events.json?api_version=2.0&app_id=final";
	//var url = "https://api.songkick.com/api/3.0/events.json?apikey=LXoF4HO8eDe4vyNK&artist_name=" + artist_name+"&min_date=2009-10-01&max_date=2009-10-30";
	$.ajax({
		url: url,
		dataType: "jsonp", // JSONP
		success: renderDataAll
	})

}

function renderDataAll(responseAll) {
	api_dataAll = responseAll;
	//console.log(responseAll);
	if (responseAll.length > 0) {
		$("#display").hide();
		$("#result").show();
		$("#photo").attr("src", responseAll[0].artists[0].image_url);
		for(var i = 0; i < responseAll.length; i++) {
	      $("table.eventsAll tbody").append(
	        "<tr>" +
	          "<td>" + 
	            "<a href='" +  responseAll[i].url + "'>" +
	              responseAll[i].title + 
	            "</a>" +
	          "</td>" + 
	          "<td>" + responseAll[i].formatted_datetime + "</td>" + 
	          "<td>" + responseAll[i].formatted_location + "</td>" + 
	          "<td><a class='ticket'>Tickets</a></td>" + 
	        "</tr>"
	      );
	    }
	}
}

function make_spotify_api_request(artist_name) {
	
	var geoUrl = 'http://ipinfo.io/json';
  	$.get(geoUrl, function(geo) {
  		console.log(geo.country);
  	
		var spotifyUrl = 'https://api.spotify.com/v1/search?q='+ artist_name+'&type=artist';
	  	$.get(spotifyUrl, function(responseSpotify) {
	  		//console.log(responseSpotify.artists.items[0].id);
	  		var topTracksUrl = 'https://api.spotify.com/v1/artists/'+ responseSpotify.artists.items[0].id +'/top-tracks?country='+geo.country+'';
		  	$.get(topTracksUrl, function(responseTrack) {
		  		for(var i = 0; i < responseTrack.tracks.length; i++) {
		  			//console.log(responseTrack.tracks[i].id);
		  			$("#spotify").append('<iframe src="https://embed.spotify.com/?uri=spotify:track:'+responseTrack.tracks[i].id+'" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>');
		  		}
		  	});
  		});
  	});
}

function recommended(artist_name,loc) {
	console.log(loc);
	var url = "http://api.bandsintown.com/artists/" + artist_name+"/events/recommended?api_version=2.0&app_id=final&location=" + loc +"&radius=10";
		$.ajax({
		url: url,
		dataType: "jsonp", // JSONP
		success: renderDataRecommend
	})

}
function renderDataRecommend(responseRecommend) {
	api_data_recommend = responseRecommend;
	console.log(responseRecommend);
	if (responseRecommend.length > 0) {
		for(var i = 0; i < responseRecommend.length; i++) {
			$("#content").append(
				responseRecommend[i].title + "<br><small><b>" + responseRecommend[i].formatted_datetime + "</b><small><br><hr>"
			);
		}
	}
	else {
		$("#content").text("Nothing Found!");
	}

}
$(document).ready(function() {
	


	
	//var arr = [{name : , time: }];
	$("#entry").submit(function(){
		var artistName = $("#artistName").val();
		var loc = $("#location").val();
		
		make_bandsintown_api_request_loc(artistName,loc);
		make_bandsintown_api_request(artistName,"");
		make_spotify_api_request(artistName);
		recommended(artistName,loc);
		return false;
	});
	var easing = 1 //enable or disable easing | 0 or 1
	var easing_effect = 'easeOutBounce';
	var animation_speed = 500 //ms
	      
	var slider_width = $('#content').width();//get width automaticly
	$('#btn').click(function() {
	    //check if slider is collapsed
	    var is_collapsed = $(this).css("margin-right") == slider_width+"px" && !$(this).is(':animated');
	      
	    //minus margin or positive margin
	    var sign = (is_collapsed) ? '-' : '+'; 
	    
	      if(!$(this).is(':animated')) //prevent double margin on double click
	      {
	        if(easing) $('.willSlide').animate({"margin-right": sign+'='+slider_width},animation_speed,easing_effect);
	        else $('.willSlide').animate({"margin-right": sign+'='+slider_width},animation_speed);
	      }
	     //if you need you can add class when expanded
	      (is_collapsed) ? $('.willSlide').removeClass('expanded') : $('.willSlide').addClass('expanded');
	  });
});