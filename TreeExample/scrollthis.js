var STxpos = 0;
var STtheSpeed = 32;
var STwidth = 640;
var STscrollWidth = 0;
var STStep = 1;
var STTimeOut = false;
var STmousex = 0;
var STstartx = -1;
function scrollThis( el, width, speed, step )
{
	STwidth = typeof(width) != 'undefined' ? width : 640;
	STtheSpeed = typeof(speed) != 'undefined' ? speed : 32;
	STStep = typeof(step) != 'undefined' ? step : 1;
	var scrolldata = el.innerHTML;
	el.style.width = STwidth + "px";
	el.style.whiteSpace = "nowrap";
	el.style.overflow = "hidden";
	el.style.position = "relative";
	
	el.innerHTML = '<span id="scrolldata" style="position:relative;cursor:move;" onmousedown="manualScroll(event);" onMouseMove="moveScroll(event);" onmouseup="releaseScroll()">'+scrolldata+'</span>';
	
	STTimeOut = setTimeout("scrollNext()",STtheSpeed);
}
function scrollNext()
{
	STxpos-=STStep;
	if ($('scrolldata').offsetWidth > STscrollWidth )
	{
		STscrollWidth = $('scrolldata').offsetWidth;
		$('scrolldata').innerHTML;
		$('scrolldata').style.overflow="hidden";
		$('scrolldata').style.whiteSpace="nowrap";
	}
	if (STxpos < 0-STscrollWidth)
	{
		STxpos = STwidth;
	}
	$('scrolldata').style.left=STxpos+"px";
	STTimeOut = setTimeout("scrollNext()",STtheSpeed);
}

function GetMouseX(event)
{
	var MouseX = 0;
	MouseX = (document.all)?event.offsetX:event.clientX;
	return MouseX;
}
function manualScroll(event)
{
	clearTimeout(STTimeOut);
	STstartx = GetMouseX(event);
}
function releaseScroll()
{
	STstartx=-1;
	STTimeOut = setTimeout("scrollNext()",STtheSpeed);
}
function moveScroll(event)
{
	if (STstartx > -1)
	{
		newx = GetMouseX(event);
		STxpos = STxpos - (STstartx - newx);
		$('scrolldata').style.left=STxpos+"px";
		STstartx = newx;
		clearTimeout(STTimeOut);
	}
	return false;
}