$(document).ready(function(){
	$("#submit").click(function(){
		if($("#name").val().length<1)
		{
			alert("Please enter a value");
			return false;
		}
		var initUrl="https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+$("#name").val()+"&count=100&truncated=false";
		var consumerKey="sJt5Fyl8blFGg2vDW0y4yPn6S";
		var consumerSecret="ovqGq302AGrBrpEpMw9G2VMv4WYXeQ3Pq87tWGRD7E4hN06NPv";
		var accessToken="1376148354-wyl1vNGCkfvOeWzQ5JGndpof3b6K9k8OBwunfCh";
		var accessTokenSecret="qLDCbRL0JhZF3RQWZnrPO4lSF25lfbnGwupPIdi7xfwwo";
		var nonce=exports.nonce(32);
		var ts=Math.floor(new Date().getTime()/1000);
		var timestamp=ts.toString();
		var accessor={
			"consumerSecret":consumerSecret,
			"tokenSecret":accessTokenSecret
		};

		var params={
			"oauth_version": "1.0",
        	"oauth_consumer_key": consumerKey,
        	"oauth_token": accessToken,
        	"oauth_timestamp": timestamp,
        	"oauth_nonce": nonce,
        	"oauth_signature_method": "HMAC-SHA1"
		};
		var message={
			"method":"GET",
			"action":initUrl,
			"parameters":params
		};
		exports.SignatureMethod.sign(message,accessor);
		var normPar=exports.SignatureMethod.normalizeParameters(message.parameters);
		console.log("Normalized parameters : "+normPar);
		var baseString=exports.SignatureMethod.getBaseString(message);
		console.log("Base String dude : "+baseString);
		var sig=exports.getParameter(message.parameters,"oauth_signature")+"=";
		console.log("Non-Encoded signature : "+sig);
		var encodedSig=exports.percentEncode(sig);
		console.log("Finally Yo Yo honey sigggggggggggg : "+encodedSig);
		//console.log("Value "+ts);
		var content="<div id='content'>";
		$.ajax({
			url : initUrl,
			type : 'GET',
			crossDomain: true,
			headers: {
            	"Authorization": 'OAuth oauth_consumer_key="'+consumerKey+'", oauth_nonce=' + nonce + ', oauth_signature=' + encodedSig + ', oauth_signature_method="HMAC-SHA1", oauth_timestamp=' + timestamp + ',oauth_token="'+accessToken+'", oauth_version="1.0"'
        	},
        	success:function(data){
        		//console.log("Success Dude "+data);
        		$.each(data,function(){
        			content=content+"<p>"+this['text']+"</p>";
        			//console.log(" "+content);
        			console.log("processing... Please wait");
        		});
        		content=content+"</div>";
        		$("#content").replaceWith(content);
        	},
        	error:function(){
        		console.log("Error executed at ajax");
        	}
		});

	});
});
























