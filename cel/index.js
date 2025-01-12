const fetch=require("node-fetch");
const fs=require("fs");
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});



const cHost="https://apicl3.celcom.com.my";

let msisdn="0138321592";

async function secureToken(token){
	let url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyAY_xgPxtljMmsFPn8NFDyN7S-eeqzI4Io";
	let postBody={"token":token,"returnSecureToken":true};
	let postHead={"content-type":"application/json"};
	let postSet={method:"POST",headers:postHead,body:JSON.stringify(postBody)};
	let res=await fetch(url,postSet);
        let resJson=await res.json();
       
	console.log("TOKEN IS :\n"+resJson.idToken);
        fs.appendFileSync("token.txt","secure token=======\n"+resJson.idToken+"\n");
        fs.writeFileSync("puretoken.txt",""+resJson.idToken);
 	return resJson.idToken;
}

async function otpVal(num,otp,sId){
	let path="/auth/token-create";
	let postBody={"otp":otp,"type":"msisdn","sessionId":sId,"loginChannel":"otp","pushToken":"","networkType":"cellular","adId":"e12d7a5f-adf8-4f4b-8964-e8fa51e1a8c3","appVersion":"3.0.67","deviceModel":"CPH2387","deviceVersion":"14","deviceId":"889fa5074a7ab067","os":"android","referralCode":"","networkSpeed":"5"};
	let postHead={"content-type":"application/json"};
	let postSet={method:"POST",headers:postHead,body:JSON.stringify(postBody)};
	let url=cHost+path;
	let res=await fetch(url,postSet);
	let resJson=await res.json();
	let token=resJson.token;
        fs.writeFileSync("token.txt","token======\n"+token+"\n");
	return secureToken(token);
}

async function otpGen(num){
	let path="/auth/otp-generate";
	let postBody={"msisdn":"6"+num};
        let postHead={"content-type":"application/json"};
        let url=cHost+path;
	let postSet={method:"POST",headers:postHead,body:JSON.stringify(postBody)};
	let res=await fetch(url,postSet);
	let resJson=await res.json();
        console.log(resJson);
	let sId=resJson.sessionId;
        console.log("Session id: "+sId);
	readline.question("Done requesting otp,enter below\n",e=>{
		return otpVal(num,e,sId);
		readline.close();
	});
}

if(process.argv.length>2)msisdn=process.argv[2];
//fs.writeFileSync("token.txt",otpGen(msisdn));
otpGen(msisdn);
