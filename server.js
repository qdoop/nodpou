/**
 * Created by Administrator on 9/10/14.
 */

// --NOTES-------------
//
// nodemon -e js,coffee --ignore out/ --ignore src/  server.js
//
// coffee -o _out -c chathub.coffee
//


console.log('+02+++++++++++++++++++++++++++');

var qVERSION=require('./version.js');
console.log(qVERSION);
var zversion=qVERSION.vname+'-q00';

if(!process.env.PORT){
	process.env.LEBANTAX=true;
	//process.env.LEBANTAX=false;
}

var coffee 	=require('coffee-script/register');
var myapp	=require('./main.coffee');

myapp.chathub.qVERSION=qVERSION;
myapp.chathub.hubvn=zversion;


var fs=require('fs');
var http=require('http');
fs.writeFile('_appid.json', JSON.stringify({appid:myapp.appid}), function(err){ if(err)console.log(err); });
console.log('appid='+myapp.appid);

try{ fs.mkdirSync(__dirname+'/__temp__/'); } catch(e){ console.log(e.message); }
try{ fs.mkdirSync(__dirname+'/__save__/'); } catch(e){ console.log(e.message); }
try{ fs.mkdirSync(__dirname+'/__sign__/'); } catch(e){ console.log(e.message); }


if(process.env.PORT){

	function timedHandler(){
		console.log(zversion + ' : '+ (myapp.appid%1000000) + ' - '+ (Date.now()-myapp.appid)/1000);
		//setTimeout(timedHandler, 60000);
	}
	timedHandler();
	setInterval(timedHandler, 60000);

	// setTimeout(function(){
	// 	console.log('['+myapp.appid+']'+' =exit======================================')
	// 	process.exit();
	// 	},50000*1000);

	function checkHub(){

		if(process.env.PORT){
			http.get("http://vatrahoi.azurewebsites.net/appid", function(res) {
				//console.log("Got response: " + res.statusCode);
				res.on('data',function(data){
					//console.log("Got appid: " + data);
				});
			}).on('error', function(e) {
				console.log("Got error: " + e.message);
			});
		}

		fs.readFile('_appid.json', 'utf8', function(err, data){
			//console.log('checkHub:'+data);
			if(err){
				console.log(err);
				return;
			}
			if(JSON.parse(data).appid==myapp.appid){
				setTimeout( checkHub ,  30*1000 );
				return;
			}

			myapp.chathub.cleanup();
		});
	}
	setTimeout( checkHub ,  10*1000 );

	function wakeupBot(){
		http.get("http://quaxbot.azurewebsites.net/appid.json", function(res) {
			//console.log("Got response: " + res.statusCode);
			res.on('data',function(data){
				console.log("Got from Bot: " + (''+data).substring(0,256));
			});
		}).on('error', function(e) {
			console.log("Got Bot error: " + e.message);
		});
		setTimeout( wakeupBot ,  10*60*1000 );
	}
	setTimeout( wakeupBot ,  5*1000 );
}