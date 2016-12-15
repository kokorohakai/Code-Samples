var treeitem = 0;
var treespos = 0;
var treesto = 0;
var treesfrom = 0;
var treesel = "";
function subtree( res )
{
	var newtree="";
	var part = "";
	treeitem++;
	var thisitem = treeitem;
	var foundstuff=false;
	if (res.childNodes)
	{
		var ls = res.childNodes;
		for (var a=0; a < ls.length; a ++ )
		{
			if (ls[a].innerHTML)
			{
				if (!ls[a].href)
				{
					part += subtree( ls[a] );
					foundstuff=true;
				}
			}
		}
	}
	if (foundstuff)
	{
		newtree+='<div class="tree" id="treeitemopen'+thisitem+'" style="display:none;">';
		newtree+='<span class="label">';
		newtree+='<img src="open.gif" onclick="closetree('+thisitem+');" class="treetoggle"> ';
		newtree+=res.innerHTML;
		newtree+='</span>';
		newtree+=part;
		newtree+='</div>\n';
		newtree+='<div class="tree" id="treeitemclose'+thisitem+'" style="display:block;"> ';
		newtree+='<span class="label">';
		newtree+='<img src="close.gif" onclick="opentree('+thisitem+');" class="treetoggle"> ';
		newtree+=res.innerHTML
		newtree+='</span>';
		newtree+='</div>\n';
	}
	else
	{
		newtree+='<div class="tree" style="display:block;">';
		newtree+='<span class="label">'
		newtree+='<img src="blank.gif" class="treenotoggle"> ';
		newtree+=res.innerHTML
		newtree+='</span>';	
		newtree+='</div>\n';
	}
	if (res.childNodes)
	{
		for (var a=ls.length-1; a>-1; a--)
		{
			res.removeChild(ls[a]);
		}
	}
	return newtree;
}
function maketree( res )
{
	var newtree='';
	var part='';
	if (res.childNodes)
	{
		var ls = res.childNodes;
		for (var a=0; a < ls.length; a ++ )
		{
			if (ls[a].innerHTML)
			{
				part+=subtree( ls[a] );
			}
		}
	}
	newtree+=res.innerHTML;
	newtree+=part;
	newtree+='';
	res.innerHTML = newtree;
}
function opentree( a )
{
	treespos = $('treeitemclose'+a).offsetHeight;
	treesfrom = treespos;
	$('treeitemclose'+a).style.display="none";
	$('treeitemopen'+a).style.display="block";
	treesto = $('treeitemopen'+a).offsetHeight;
	$('treeitemopen'+a).style.height = treespos+"px";
	$('treeitemopen'+a).style.overflow = "hidden";
	treesel = a;
	setTimeout("treescrollout()",16);
}
function treescrollout()
{
	treespos+=(treesto-treesfrom)/10;
	if (treespos < treesto)
	{
		$('treeitemopen'+treesel).style.height = treespos+"px";
		setTimeout("treescrollout()",16);
	}
	else
	{
		$('treeitemopen'+treesel).style.height = "";
	}
}
function closetree( a )
{
	$('treeitemclose'+a).style.display="block";
	treesto = $('treeitemclose'+a).offsetHeight;
	$('treeitemclose'+a).style.display="none";
	treespos = $('treeitemopen'+a).offsetHeight;
	treesfrom = treespos;
	treesel = a;
	setTimeout("treescrollin()",16);
}
function treescrollin()
{
	treespos-=(treesfrom-treesto)/10;
	if (treespos > treesto)
	{
		$('treeitemopen'+treesel).style.height = treespos+"px";
		setTimeout("treescrollin()",16);
	}
	else
	{
		$('treeitemclose'+treesel).style.display="block";
		$('treeitemopen'+treesel).style.display="none";
		$('treeitemopen'+treesel).style.height = "";
	}
}