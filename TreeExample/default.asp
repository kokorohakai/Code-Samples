<!--#include file="../JOEheader.asp"-->
<style type="text/css">
	#tree
	{
		font-weight:bold;
		font-size:18px;
		font-family:'Arial',sans-serif;
	}
	#tree div.tree
	{
		font-size:14px;
		font-family:'Arial',sans-serif;	
		padding-left:20px;
		line-height:20px;
	}
	#tree img.treetoggle
	{
		cursor:pointer;
	}
</style>
<script language="JavaScript" type="text/javascript" src="maketree.js"></script>
<script language="JavaScript" type="text/javascript" src="makeimageswap.js"></script>
<script language="JavaScript" type="text/javascript" src="scrollthis.js"></script>
This is Joe's sandbox area, for testing new technologies and newly designed applications.<br><br>
<div id="tree">
	Tree Example
	<div>
		<a href="http://www.google.com">cat 1</a>
		<div>
			Item 1
			<div><a href="www.google.com">subitem 1</a></div>
			<div>subitem 1</div>
		</div>
		<div>Item 2
			<div>test</div>
		</div>
		<div>
			<a href="www.google.com">Item 3</a>
			<div>subitem 2</div>
			<div>subitem 3</div>
			<div>
				subitem 4
				<div>subitem 5</div>
				<div>subitem 6</div>
				<div>subitem 7</div>
				<div>subitem 8</div>
			</div>
			<div>subitem 9</div>
			<div>subitem 10</div>
		</div>
	</div>
	<div>cat 2</div>
	<div>
		cat 3
		<div>
			Item 4
			<div>subitem 11</div>
			<div>subitem 12</div>
		</div>
		<div>Item 5</div>
		<div>
			Item 6
			<div>subitem 13</div>
			<div>subitem 14</div>
		</div>
	</div>
</div>
<hr>
<iframe src="alt/" style="width:100%;border:0px;height:300px;"></iframe>
<hr>
<b style="font-size:20px;">Image swapper</b><br><br>
<!-- The outer div with id="imageswap" is required, each inner div must contain an img to be used in the background.
	 Any HTML without a src= can be used within each inner div.-->
<div id="imageswap">
	<div>
		<img src="images/pic1.jpg">
		<div style="color:white;font-weight:bold;padding:20px;width:360px;text-align:right;">
			<a href="http://ecm-prod-cs.etn.com/Vehicle/index.htm" style="color:white;">&gt; Read the Full Story</a>
		</div>
	</div>
	<div>
		<img src="images/pic2.gif">
		<div style="color:white;font-weight:bold;padding:20px;width:100px;text-align:left;">
			<a href="http://ecm-prod-cs.etn.com/Vehicle/index.htm">&gt; Read the Full Story</a>
		</div>
	</div>
	<div>
		<img src="images/pic3.jpg">
		<div style="color:white;font-weight:bold;padding:20px;width:360px;text-align:left;">
			<a href="http://ecm-prod-cs.etn.com/Vehicle/index.htm">&gt; Read the Full Story</a>
		</div>
	</div>
</div>
<script type="text/javascript" language="JavaScript">
	maketree($('tree'));
	makeimageswap($('imageswap'),3000,400,400);//id, time in milliseconds, width, height.
</script>
<hr>
<b style="font-size:20px;">Text Scroller.</b><br><br>
<div id="scrollme" style="background:blue;color:white;font-weight:bold;padding:4px;width:100%;">
This is my really long string of Text.  If we wanted something that was really long, but not very important to scroll, this is something we may want to consider.  This is something that is possible with this application by simply calling, "scrollThis($('nameofdiv'), width, TimeInMilliseconds&lt;optional&gt;, PixelsStepped&lt;optional&gt;)" in a javascript area.  Then it's just a matter of letting it scroll away!  The scroller can be stylized by adding style to the containting div.
</div>
<script type="text/javascript" language="JavaScript">
	scrollThis($('scrollme'),640,16,1);
</script>
<!--#include file="../footer.asp"-->