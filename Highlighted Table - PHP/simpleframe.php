<?
class simpleframe
{
	private $frameid = "";
	private $r = 0;
	private $g = 0;
	private $b = 0;
	private $htext = false;
	
	//can also use __contruct here. However, this appears to have been deprecated.
	function simpleframe( $hastext=false )
	{
		$this->htext=$hastext;
		$this->frameid = uniqid();		
		$this->r = $_SESSION['color'][0].$_SESSION['color'][1];
		$this->g = $_SESSION['color'][2].$_SESSION['color'][3];
		$this->b = $_SESSION['color'][4].$_SESSION['color'][5];
		
	}
	
	public function top()
	{
		$wtf =	'<table class="simpleframe" style="background:#DDDDDD" id="'.$this->frameid.'">'.
				'<tr class="rowa">'.
					'<td class="cella"></td>'.
					'<td class="cellb"></td>'.
					'<td class="cellc"></td>'.
				'</tr>'.
				'<tr class="rowb">'.
					'<td class="celld"></td>'.
					'<td class="celle">';
		if ($this->htext)
		{
			$wtf.='<div class="celltext"><br>';
		}
		echo $wtf;
	}
	public function bottom()
	{
		if ($this->htext)
		{
			$wtf.='<br></div>';
		}
		$wtf .=						'</td>'.
									'<td class="cellf"></td>'.
								'</tr>'.
								'<tr class="rowc">'.
									'<td class="cellg"></td>'.
									'<td class="cellh"></td>'.
									'<td class="celli"></td>'.
								'</tr>'.
							'</table><script language="javascript" type="text/javascript">highlight(\''.$this->frameid.'\',0x'.$this->r.',0x'.$this->g.',0x'.$this->b.',0xDD)</script>';
		echo $wtf;
	}
}
?>

<html>
	<head>
		<style type="text/css">
			table.simpleframe
			{
				table-layout:fixed;
				border-collapse:collapse;
				padding:0px;
				margin:0px;
				height:auto;
				width:auto;
			}
			table.simpleframe td
			{
				
			}
			table.simpleframe td.cella
			{
				background:url('../img/simpleframe/a.png') no-repeat;
				width:7px;
				height:7px;
				padding:0px;
				margin:0px;
			}
			table.simpleframe td.cellb
			{
				background:url('../img/simpleframe/b.png') repeat-x;
				width:auto;
				height:7px;
				padding:0px;
				margin:0px;
			}
			table.simpleframe td.cellc
			{
				background:url('../img/simpleframe/c.png') no-repeat;
				width:7px;
				height:7px;
				padding:0px;
				margin:0px;
			}
			table.simpleframe td.celld
			{
				background:url('../img/simpleframe/d.png') repeat-y;
				width:7px;
				height:auto;
				padding:0px;
				margin:0px;
			}
			table.simpleframe td.celle
			{
				width:auto;
				height:auto;
				padding:0px;
				margin:0px;
			}
			table.simpleframe td.cellf
			{
				background:url('../img/simpleframe/f.png') repeat-y;
				width:7px;
				height:auto;
				padding:0px;
				margin:0px;
			}
			table.simpleframe td.cellg
			{
				background:url('../img/simpleframe/g.png') no-repeat;	
				width:7px;
				height:7px;
				padding:0px;
				margin:0px;
			}
			table.simpleframe td.cellh
			{
				background:url('../img/simpleframe/h.png') repeat-x;
				width:auto;
				height:7px;
				padding:0px;
				margin:0px;
			}
			table.simpleframe td.celli
			{
				background:url('../img/simpleframe/i.png') no-repeat;
				width:7px;
				height:7px;
				padding:0px;
				margin:0px;
			}
			table.simpleframe div.celltext
			{
				background:white;
				width:100%;
				height:100%;
			}
			/* List in a table */
			table.list
			{
			}
			table.list td
			{
				padding: 3px;
				font-family: "Franklin Gothic Medium","Helvetica","Arial",sans-serif;
				font-size: 12px;
			}
			table.list .head
			{
				font-weight: bold;
				color: white;
				background: #306;
			}
			table.list .odd
			{
				background: #F0FFF0;
			}
			table.list .even
			{
				background:white;
			}
		</style>
	</head>
	<body>
		Example Usage:
		<?
		$pf = new pictureframe();
		$pf -> top(); 
		?>
			<a href="http://www.seijinohki.net/"><img src="wd/01.png"><br><br>
			Seijinohki</a>
		<?
		$pf -> bottom();
		?>
	</body>
</html>