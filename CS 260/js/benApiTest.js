<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
 <p id="userFullName"></p>
 <script>// <![CDATA[
 $.ajax( '/d2l/api/lp/1.0/users/whoami', {
 dataType: 'json',
 headers: { 'X-Csrf-Token': localStorage['XSRF.Token'] }
 }).done(function(data) {
 var elem = document.getElementById('userFullName');
 elem.textContent = data.FirstName + ' ' + data.LastName;
 });
 // ]]></script>