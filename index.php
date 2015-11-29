<!DOCTYPE html>
<html>
  <head>
    <script src="jquery-2.1.4.min.js"></script>
  </head>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player" style="display: none;"></div>

	<script type = "text/javascript" language = "javascript">

		var videoID = null;
		var videoArray = new Array();

		function selectNextVideoID(videoArray) {
			do {
				newVideoID = this.videoArray[ Math.floor((Math.random() * this.videoArray.length)) ];
			} while (newVideoID == videoID);
			return newVideoID;
		}

		function changeImageToOver() {
			$('#playimage').attr('src', 'images/baszasd.png');
		}

		function changeImageToOut() {
			$('#playimage').attr('src', 'images/baszatas.png');
		}

		function changeImageToClick() {
			$('#playimage').attr('onmouseout', '');
			$('#playimage').attr('src', 'images/fasza_csavo_vagy.png');
			window.setTimeout(restoreOnHoverImageChange, 2500);
		}
		
		function restoreOnHoverImageChange(){
			changeImageToOut();
			$('#playimage').attr('onmouseout', 'changeImageToOut()');
		}

         $(document).ready(function() {

            $("#playimage").click(function(event){
                $.getJSON('list.json', function(data) {
					videoArray = new Array();
					$.each(data, function(i, d){
//            			console.log(d.id);
						videoArray.push(d.id);
        			});
					videoID = selectNextVideoID(videoArray);
//					videoID = newVideoID;
					console.log(videoID);
					play(videoID);
               });
            });

         });
 
        var player;
		var id;

        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
            height: '390',
            width: '640',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      function onPlayerStateChange(event) {
		  if (event.data == YT.PlayerState.ENDED) {
			console.log("belep");
			play(selectNextVideoID());
		  }
      }

      function play(id) {
		player.stopVideo();

//selectID();

		player.loadVideoById(id);
		$('#player').css('display', 'inline');
		player.playVideo();
	  }

    </script>
	<img src="images/baszatas.png" id="playimage" onmouseover=changeImageToOver() onmouseout=changeImageToOut() onclick=changeImageToClick() />
  </body>
</html>