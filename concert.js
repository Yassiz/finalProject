

$(document).ready(function() {
	var url = "https://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=final";
	$.get(url, function(response) { 
    	console.log(response);
    	//$("h2").eq(0).text(response.photos.photo[0].secret);
    	for (var i=0; i < 5; i++) { 
    		//console.log(response.photos.photo[i].id);
    	}
	});
	


	
	//var arr = [{name : , time: }];
	$("#entry").submit(function(){
		var name1 = $("#name1").val().toUpperCase();
		var name2 = $("#name2").val().toUpperCase();

		if (name1 !== "") {
			$(".second").show("slow");
			$(".first").hide();
		}
		if (name2 !== "") {
			$("#display").hide();
			$("h3").show("slow");
			var marginPlayer1 = -30;
			var marginPlayer2 = -30;
			$(".main").show();
		}
		if (name1 !== "" && name2 != "") {
			$("body").keydown(function(e){
				if (win) {
					return false;
				}
				if (startTime === null) {
					startTime = new Date().getTime();
					console.log(new Date().getTime());
				}
				if (e.which === 65)  {
					//console.log("You Pressed A which is:" + e.which);
					marginPlayer1 = marginPlayer1+30;
					$('#player1').addClass('active');
					$('#player1').css("margin-left" , + marginPlayer1 + 'px');
					if (marginPlayer1 > 930) {
						endTime = new Date().getTime();
						var timeDiff = (endTime - startTime) / 1000;
						win = true;
						// Do a function for result and call it on win
						$("h1").text("Player 1 won in " + timeDiff + " seconds!");
						$("#result").text("****** Great Job "+ name1 + "!! ******").show();
						$("h3").hide();
						$(".info").animate({height: 300, width: 500}, 1000 );
						$(".name").text("Player Name: "+ name1);
						$(".score").text("Score: " + timeDiff);
						$("#play").delay(2000).show(0);
						$(".main").hide();
					}
				}
				else if (e.which === 76)  {
					//console.log("You Pressed L which is:" + e.which);
					marginPlayer2 = marginPlayer2+30;
					$('#player2').addClass('active2');
					$('#player2').css("margin-left" , + marginPlayer2 + 'px');
					if (marginPlayer2 > 930 ) {
						endTime = new Date().getTime();
						var timeDiff = (endTime - startTime) / 1000;
						console.log("player 2 won");
						win = true;
						$("h1").text("Player 2 won in " + timeDiff + " seconds!");
						$("#result").text("****** Great Job "+ name2 + "!! ******")
						$("h3").hide();
						$(".info").animate({height: 300, width: 500}, 1000 );
						$(".name").text("Player Name: "+ name2);
						$(".score").text("Score: " + timeDiff);
						$("#play").delay(2000).show(0);
						$(".main").hide();
					}
				}
			});
		}
		return false;
	});
});