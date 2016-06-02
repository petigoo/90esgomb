




/*
     FILE ARCHIVED ON 1:20:35 dec. 19, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:05:48 jún. 2, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
//jobb klikk
document.addEventListener("contextmenu", function(e){
	alert('Midnen jog fenntartva, éhbérért fejlesztve! ©Amúgy vidéken CD-írásból megélő informatikus apukájának cége KFT.');
	//e.preventDefault(); //ez a sor már nem vicces
}, false);

//címsor
var rev = "fwd";
var title_msg_default="INSTNAT 90-ES ÉVEK GONB!!4";
var title_msg=title_msg_default;

function titlebar(val)
{
	var msg  = " "+title_msg+" ";
	var res = " ";
	var speed = 100;
	var pos = val;

	var le = msg.length;
	if(rev == "fwd"){
		if(pos < le){
		pos = pos+1;
		scroll = msg.substr(0,pos);
		if (scroll.length>0){
			document.title = scroll;
			}else{
			document.title = ' ';
			}
		timer = window.setTimeout("titlebar("+pos+")",speed);
		}
		else{
		rev = "bwd";
		timer = window.setTimeout("titlebar("+pos+")",speed);
		}
	}
	else{
		if(pos > 0){
		pos = pos-1;
		var ale = le-pos;
		scroll = msg.substr(ale,le);
		if (scroll.length>0){
			document.title = scroll;
			}else{
			document.title = ' ';
			}
		timer = window.setTimeout("titlebar("+pos+")",speed);
		}
		else{
		rev = "fwd";
		timer = window.setTimeout("titlebar("+pos+")",speed);
		}	
	}
}

titlebar(0);

//száj
var nyitva=false;
var timeout;
var player;
   
var videok=new Object();
function korongNyergeles(kezeketamagasba){
	videok=kezeketamagasba;
}
   
function csapjad(e) {
	if (!nyitva && !e){
	newVideo();
	document.getElementById('szaj').style.backgroundPosition = '50% 75%';
	document.getElementById('szaj').style.backgroundSize = '100% 50%';
	document.getElementById('video').style.height='240px';
	}else{
	document.getElementById('szaj').style.backgroundPosition = '50% 55%';
	document.getElementById('szaj').style.backgroundSize = '100% 30%';
	document.getElementById('video').style.height='0px';
	timeout=window.setTimeout(csapjad,1600);
	}
	nyitva=!nyitva;
}

function newVideo(){
	//RANDOM VIDEÓK
	document.getElementById('video').innerHTML='<div id="placeholder"><div id="player"></div></div>';
	var veletlen=videok[(Math.floor((Math.random()*videok.length)))];
	//title_msg=unescape(encodeURIComponent(veletlen.title));
	title_msg=veletlen.title;
	if (title_msg.length<1)title_msg=title_msg_default;
	
	player = new YT.Player('player', {
	  height: '200',
	  width: '300',
	  videoId: veletlen.hash,
	  events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
	  }
	});
}	

//youtube api buherálás	

//automatikus létrehozás
//function onYouTubePlayerAPIReady() {
//	newVideo();
//}
	
//autoplay
function onPlayerReady(event) {
	event.target.playVideo();
}
//video vége
function onPlayerStateChange(event) {        
	if(event.data === 0) {            
		csapjad(true);
	}
}
