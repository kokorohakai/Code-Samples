<%
for each x in Request.ServerVariables
	response.write(x & " : " & Request.ServerVariables(x) & "<br>")
next
response.write("<hr>")
for each x in Application.Contents
	response.write(x & " : " & Application.Contents(x) & "<br>")
next
response.write("<hr>")
For Each item in Session.Contents
  If IsArray(Session(item)) then
    For itemloop = LBound(Session(item)) to UBound(Session(item))
%>
<% =item %>  <% =itemloop %> <font color=blue><% =Session(item)(itemloop) %></font><BR>
<%
    Next
  Else
%>
<% =item %> <font color=blue><% =Session.Contents(item) %></font><BR>
<%
  End If
Next
%>