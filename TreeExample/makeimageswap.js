var ISTimeOut=1000;
var theImages = new Array();
var theBodies = new Array();
var currentIS = 0;
var totalIS = 0;
var TOObject = false;
var ispaused = "&nbsp;||&nbsp;";

function makeimageswap( res, setISTimeOut, width, height )
{
	var minwidth = typeof(width) != 'undefined' ? width : 0;
	var minheight = typeof(width) != 'undefined' ? height : 0;
	ISTimeOut = typeof(setISTimeOut) != 'undefined' ? setISTimeOut : 1000;
	var n = 0;
	if (res.childNodes)
	{
		var bodies = res.childNodes;
		for (var a=0; a < bodies.length; a ++ )
		{
			if (bodies[a].innerHTML)
			{
				var images = bodies[a].childNodes;
				for (var b=0; b < images.length; b ++ )
				{
					if (images[b].src)
					{
						if ( images[b].width > minwidth ) minwidth = images[b].width;
						if ( images[b].height > minheight ) minheight = images[b].height;
						theImages[n]=images[b].src;
						bodies[a].removeChild(images[b]);
					}
				}
				theBodies[n] = bodies[a].innerHTML;
				n++;
			}
		}
		for (var a = bodies.length-1; a >= 0; a-- )
		{
			res.removeChild(bodies[a]);
		}
	}
	totalIS = n;
	
	var theSwapper = "";
	var pagger = '<div style="position:relative;z-index:300;background:#0067c6;color:white;padding:2px;font-size:12px;line-height:14px;top:'+(minheight-18)+'px;" id="ISpagger">';
	for (var a = 0; a < theBodies.length; a++ )
	{
		theSwapper += '<img src="' + theImages[a] + '" style="position:absolute;z-index:' + (100+a) + ';width:'+minwidth+'px;height:'+minheight+'px;" id="ISimg'+a+'">';
		theSwapper += '<div style="position:absolute;z-index:' + (200+a) + ';" id="ISbod'+a+'">'+theBodies[a]+'</div>';
		pagger += '<b id="pagger'+a+'" onclick="ISSelect('+a+')" style="cursor:pointer;">&nbsp;' + ( a + 1 )+ "&nbsp;</b>";
	}
	pagger += '<b id="isplaypause" onclick="ISPP()" style="cursor:pointer;">'+ispaused+'</b>';
	pagger += "</div>";
	theSwapper += pagger;
	res.innerHTML = theSwapper;
	
	$('pagger0').style.border="1px solid white"
	res.style.width = minwidth+"px";
	res.style.height = minheight+"px";
	var myFx = null;
	for (var a = 0; a < theBodies.length; a++ )
	{
		myFx = new Fx.Style('ISimg'+a, 'opacity').set(0);
		myFx = new Fx.Style('ISbod'+a, 'opacity').set(0);
	}
	myFx = new Fx.Style('ISpagger', 'opacity').set(.75);
	myFx = new Fx.Style('ISimg0', 'opacity').start(0,1);
	myFx = new Fx.Style('ISbod0', 'opacity').start(0,1);
	TOObject = setTimeout("ISNext()",ISTimeOut);
}

function hidecurrent()
{
	$('pagger'+currentIS).style.border="0px none"
	var myFx = new Fx.Style('ISimg'+currentIS, 'opacity').start(1,0);
	var myFx = new Fx.Style('ISbod'+currentIS, 'opacity').start(1,0);
}

function showcurrent()
{
	$('pagger'+currentIS).style.border="1px solid white"
	var myFx = new Fx.Style('ISimg'+currentIS, 'opacity').start(0,1);
	var myFx = new Fx.Style('ISbod'+currentIS, 'opacity').start(0,1);
}

function ISNext()
{
	hidecurrent();
	currentIS++;
	if (currentIS >= totalIS) currentIS = 0;
	showcurrent();
	TOObject = setTimeout("ISNext()",ISTimeOut);
}

function ISSelect( a )
{
	clearTimeout(TOObject);
	hidecurrent();
	currentIS=a;
	showcurrent();
	$('isplaypause').innerHTML="&nbsp;&gt;&nbsp;";
}
function ISPP()
{
	var bleh = $('isplaypause').innerHTML;
	if (bleh == ispaused)
	{
		clearTimeout(TOObject);
		$('isplaypause').innerHTML="&nbsp;&gt;&nbsp;";
	}
	else
	{
		TOObject = setTimeout("ISNext()",ISTimeOut);
		$('isplaypause').innerHTML=ispaused;
	}
}