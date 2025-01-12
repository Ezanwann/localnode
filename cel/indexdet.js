const fetch=require("node-fetch");
const fs=require("fs");
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
let cCookie2=`_gcl_au=1.1.1010072098.1729510240; _ga=GA1.1.1414971575.1729510241; _ga_H2X9G4BXKX=GS1.1.1729510241.1.1.1729510423.0.0.0; aam_uuid=69346929310756564681351503450856011996; ocsdata=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRpbWVzdGFtcCI6IjIwMjQtMTItMjhUMTU6MTk6NDIuMDQ3WiIsImN1c3RvbWVySWQiOiI3MjA1MTQxMjU3NTVfMDEzODMyMTU5MiJ9LCJpYXQiOjE3MzUzOTkxODIsImV4cCI6MTczNTQwMDk4Mn0.LPn6xD011YuGufuY0rhFZvGygTdWhQEe6mtFBkB3kTY; subscriptionPlan=Prepaid; billingStatus=Billable; msisdn=30313338333231353932; planType=Single; isPrepaid=true; servicesCount=1; accountType=Parent; rbzsessionid=bed06f5c8c7d55f0e085e4513889d3f4; AMCVS_58753DE059BA49BF0A495E64%40AdobeOrg=1; AMCV_58753DE059BA49BF0A495E64%40AdobeOrg=-845006675%7CMCIDTS%7C20086%7CMCMID%7C69844818563222239651301723355659816085%7CMCAAMLH-1736004717%7C3%7CMCAAMB-1736004717%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1735407117s%7CNONE%7CMCAID%7C3239AFA2F6FDB0DB-40001192F3CB9C7C%7CMCCIDH%7C421440905%7CvVersion%7C5.1.1; s_cc=true; s_previous_page=life-hub%3Ausage%3Adetails; rbzid=/y1Vn2Up4ZUTNIGmeu1MgyKblopr8BCgBRoTod3xRJKIqaCiIJz8JoMKQ2/pkP0LVW8/gpo83S01v5clo997HcPa4/AYbqj+G2LKy7uXjWo926ndIB9Jf2vYwbjXapymvu1w0Sk50spDH1+t5UB5IZLXM/2jKfJDNfZlrjiRdpfTQeGP9r67HARfP178PtMMe35YYnLb37m06TLZX1V+4zlVXtWdM6qU5RqYI0kMKuqAMU55ND8tMRf1z3txiHkWfh8vasHd96Xsm+9YW1jOT3o7T3j++dMjLCpWsz50Jl6/kHL9dOgwduwia8HDxuSG`;
let cCookie3=`_gcl_au=1.1.1010072098.1729510240; _ga=GA1.1.1414971575.1729510241; _ga_H2X9G4BXKX=GS1.1.1729510241.1.1.1729510423.0.0.0; aam_uuid=69346929310756564681351503450856011996; rbzsessionid=965aa819af26ede213c74a2c3f02c085; AMCVS_58753DE059BA49BF0A495E64%40AdobeOrg=1; AMCV_58753DE059BA49BF0A495E64%40AdobeOrg=-845006675%7CMCIDTS%7C20084%7CMCMID%7C69844818563222239651301723355659816085%7CMCAAMLH-1735810149%7C3%7CMCAAMB-1735810149%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1735212549s%7CNONE%7CMCAID%7C3239AFA2F6FDB0DB-40001192F3CB9C7C%7CMCCIDH%7C421440905%7CvVersion%7C5.1.1; s_cc=true; rbzid=5j0xXz6pcN/PBz6RcEA8hPe5Z9X7YHA/PH4WLMrmwxJCRqPlgd+AKrR4WXwAodslofkJcEYYenwkHANgvDXgjDVycSufEacxmZbUdy2sLt2/cPLcvFuUZzwHo1zsmXNatbLoJUSnGsTuP2NynsbMNymjSAO60b8j7SdjcEXjpeXAoKVchs9AomdYyfJWa1W6Jk4V7dql0wCSSRIExWQzQihamhiIWBZ5kdQqcjn62huEgcBv7MsCbwy3kxiUNpjU31kZ4E9AdaTGzc/XKw2SAqgO5ZG1AKVOJrHSeMfIis2iA470gZ/yKyjRY9de2BqO; ocsdata=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRpbWVzdGFtcCI6IjIwMjQtMTItMjZUMDk6MzA6MDAuMjE2WiIsImN1c3RvbWVySWQiOiI3MjA1MTQxMjU3NTVfMDEzODMyMTU5MiJ9LCJpYXQiOjE3MzUyMDU0MDAsImV4cCI6MTczNTIwNzIwMH0.XNLSmf9wJTb7Tnmv-7XuQSapoUiDJDHcrgf1TqP3Sd4; subscriptionPlan=Prepaid; billingStatus=Billable; msisdn=30313338333231353932; planType=Single; isPrepaid=true; servicesCount=1; accountType=Parent; s_sq=%5B%5BB%5D%5D; s_previous_page=life-hub%3Ausage%3Adetails`;

let cCookiea=`_gcl_au=1.1.1010072098.1729510240; _ga=GA1.1.1414971575.1729510241; _ga_H2X9G4BXKX=GS1.1.1729510241.1.1.1729510423.0.0.0; aam_uuid=69346929310756564681351503450856011996; rbzsessionid=965aa819af26ede213c74a2c3f02c085; AMCVS_58753DE059BA49BF0A495E64%40AdobeOrg=1; AMCV_58753DE059BA49BF0A495E64%40AdobeOrg=-845006675%7CMCIDTS%7C20084%7CMCMID%7C69844818563222239651301723355659816085%7CMCAAMLH-1735810149%7C3%7CMCAAMB-1735810149%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1735212549s%7CNONE%7CMCAID%7C3239AFA2F6FDB0DB-40001192F3CB9C7C%7CMCCIDH%7C421440905%7CvVersion%7C5.1.1; s_cc=true; rbzid=5j0xXz6pcN/PBz6RcEA8hPe5Z9X7YHA/PH4WLMrmwxJCRqPlgd+AKrR4WXwAodslofkJcEYYenwkHANgvDXgjDVycSufEacxmZbUdy2sLt2/cPLcvFuUZzwHo1zsmXNatbLoJUSnGsTuP2NynsbMNymjSAO60b8j7SdjcEXjpeXAoKVchs9AomdYyfJWa1W6Jk4V7dql0wCSSRIExWQzQihamhiIWBZ5kdQqcjn62huEgcBv7MsCbwy3kxiUNpjU31kZ4E9AdaTGzc/XKw2SAqgO5ZG1AKVOJrHSeMfIis2iA470gZ/yKyjRY9de2BqO; ocsdata=`;
let cCookieb=`subscriptionPlan=Prepaid; billingStatus=Billable; msisdn=30313338333231353932; planType=Single; isPrepaid=true; servicesCount=1; accountType=Parent; s_sq=%5B%5BB%5D%5D; s_previous_page=life-hub%3Ausage%3Adetails`;

const cHost="https://www.celcom.com.my";

let cCookieOtpGen=`_gcl_au=1.1.1010072098.1729510240; _ga=GA1.1.1414971575.1729510241; _ga_H2X9G4BXKX=GS1.1.1729510241.1.1.1729510423.0.0.0; aam_uuid=69346929310756564681351503450856011996; AMCVS_58753DE059BA49BF0A495E64%40AdobeOrg=1; AMCV_58753DE059BA49BF0A495E64%40AdobeOrg=-845006675%7CMCIDTS%7C20086%7CMCMID%7C69844818563222239651301723355659816085%7CMCAAMLH-1736063788%7C3%7CMCAAMB-1736063788%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1735466188s%7CNONE%7CMCAID%7C3239AFA2F6FDB0DB-40001192F3CB9C7C%7CMCCIDH%7C421440905%7CvVersion%7C5.1.1; rbzid=8nXul5NAuDwgUwVFtvBbEO6SaUETceqDVZRG+mMDDtYd7gD8C6+EDZBZnywoAq+Km1J6d2fGWd62jmQxyGl5zDqFeoL2DRKRp+2XlOdeSwwMulsR45gMdY+kF8yAtxi7FSgz2POO48wlqCgFb+uZm5wZjecprt7p2tf/ukjyt7py6/8WVVYbkxyD0EQcTwcxdRZ8Je61Y+9fIOyAE0oKlFQs2moC4iVI0A76Wl+hie0X8TGqT8MV/AeLlXpRfIKe; rbzsessionid=35d51abe40bc878477125e54c2e7c09a; s_previous_page=life-hub%3Alogin; s_cc=true; s_sq=celcomnewproduction%3D%2526c.%2526a.%2526activitymap.%2526page%253Dlife-hub%25253Alogin%2526link%253DContinue%2526region%253Dplatform-life-hub%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dlife-hub%25253Alogin%2526pidt%253D1%2526oid%253DContinue%2526oidt%253D3%2526ot%253DSUBMIT`;

let cCookie=`_gcl_au=1.1.1010072098.1729510240; _ga=GA1.1.1414971575.1729510241; _ga_H2X9G4BXKX=GS1.1.1729510241.1.1.1729510423.0.0.0; aam_uuid=69346929310756564681351503450856011996; ocsdata=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRpbWVzdGFtcCI6IjIwMjQtMTItMjhUMTU6MTk6NDIuMDQ3WiIsImN1c3RvbWVySWQiOiI3MjA1MTQxMjU3NTVfMDEzODMyMTU5MiJ9LCJpYXQiOjE3MzUzOTkxODIsImV4cCI6MTczNTQwMDk4Mn0.LPn6xD011YuGufuY0rhFZvGygTdWhQEe6mtFBkB3kTY; subscriptionPlan=Prepaid; billingStatus=Billable; msisdn=30313338333231353932; planType=Single; isPrepaid=true; servicesCount=1; accountType=Parent; rbzsessionid=bed06f5c8c7d55f0e085e4513889d3f4; AMCVS_58753DE059BA49BF0A495E64%40AdobeOrg=1; AMCV_58753DE059BA49BF0A495E64%40AdobeOrg=-845006675%7CMCIDTS%7C20086%7CMCMID%7C69844818563222239651301723355659816085%7CMCAAMLH-1736004717%7C3%7CMCAAMB-1736004717%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1735407117s%7CNONE%7CMCAID%7C3239AFA2F6FDB0DB-40001192F3CB9C7C%7CMCCIDH%7C421440905%7CvVersion%7C5.1.1; s_cc=true; s_previous_page=life-hub%3Ausage%3Adetails; rbzid=/y1Vn2Up4ZUTNIGmeu1MgyKblopr8BCgBRoTod3xRJKIqaCiIJz8JoMKQ2/pkP0LVW8/gpo83S01v5clo997HcPa4/AYbqj+G2LKy7uXjWo926ndIB9Jf2vYwbjXapymvu1w0Sk50spDH1+t5UB5IZLXM/2jKfJDNfZlrjiRdpfTQeGP9r67HARfP178PtMMe35YYnLb37m06TLZX1V+4zlVXtWdM6qU5RqYI0kMKuqAMU55ND8tMRf1z3txiHkWfh8vasHd96Xsm+9YW1jOT3o7T3j++dMjLCpWsz50Jl6/kHL9dOgwduwia8HDxuSG`;
let cUa=`Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36`;

let msisdn="0138321592";

async function getDetails(num,token){
	let path="/life-hub/api/v1/usage/getDetails";
	let url=cHost+path;
        let postCookie=cCookiea+token+";"+cCookieb;
	let postBody={"msisdn":""+num};
	let postHead={"Cookie":postCookie,"Authorization":token,"user-agent":cUa,"accept":"application/json, text/plain, */*"};
	let postSet={method:"POST",headers:postHead,body:JSON.stringify(postBody)};
	let res=await fetch(url,postSet);
//     let resJson=await res.text();
        let resJson=await res.json();
        console.log(resJson);       
	//console.log("Res\n"+resJson);
     fs.appendFileSync("resdetail.txt","Res\n"+resJson+"\n");
	return ;
}

async function otpVal(num,otp,sId){
	let path="/life-hub/api/v1/otp/validate";
	let postBody={"otp":otp,"msisdn":""+num,"securityCode":sId};
	let postHead={"content-type":"application/json","user-agent":cUa,"cookie":cCookieOtpGen};
	let postSet={method:"POST",headers:postHead,body:JSON.stringify(postBody)};
	let url=cHost+path;
	let res=await fetch(url,postSet);
	let resJson=await res.json();
	let token=resJson.data.token;
	console.log(token);
      //fs.writeFileSync("token.txt","token======\n"+token+"\n");
	return getDetails(num,token);
}

async function otpGen(num){
	let path="/life-hub/api/v1/otp/generate";
	let postBody={"deliveryMethod":"SMS","msisdn":""+num,"isResend":false}
        let postHead={"content-type":"application/json","cookie":cCookieOtpGen,"user-agent":cUa};
        let url=cHost+path;
	let postSet={method:"POST",headers:postHead,body:JSON.stringify(postBody)};
	let res=await fetch(url,postSet);
	let resJson=await res.json();
        console.log(resJson);
	let sId=resJson.data.securityCode;
        console.log(" id: "+sId);
	readline.question("Done requesting otp,enter below\n",e=>{
		return otpVal(num,e,sId);
		readline.close();
	});
}

if(process.argv.length>2)msisdn=process.argv[2];
//fs.writeFileSync("token.txt",otpGen(msisdn));
otpGen(msisdn);
