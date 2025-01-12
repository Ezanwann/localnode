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


let payloads={"rm1":"VyAGoVKqQd3eggDo0cvfEbQSG9c2pairwJ81ujbh0wh5HVSiA+TPxF3CP7PIj7s6bMHREjK0LJ2sVgTY4BDEk6UXWywrjxCKno9+zJp\/sFDuDl5nPIMTQmCbMtZDgff5LWar1P93rygEayyZ4mYLfoHIKzP1kNlNJIDMne4dIeI="};



const cHost="https://mydigiapp.digi.com.my";

let msisdn="0163160240";

async function sub1(num,coo){
	let path="/api/cmp/v2/subscribe";
	let url=cHost+path;
	let postBody={"payload":payloads["rm1"],"encode":true};
	let postHead={"content-type":"application/json","cookie":coo};
	let postSet={method:"POST",headers:postHead,body:JSON.stringify(postBody)};
	let res=await fetch(url,postSet);
        let resJson=await res.json();
       
	//console.log("TOKEN IS :\n"+resJson.idToken);
       // fs.appendFileSync("token.txt","secure token=======\n"+resJson.idToken+"\n");
	//return resJson.idToken;
       console.log(resJson);
      return;
}

async function otpVal(num,otp){
	let path="/auth/login";
	let postBody={"msisdn":"6"+num,"tac":otp}
	let postHead={"content-type":"application/json"};
	let postSet={method:"POST",headers:postHead,body:JSON.stringify(postBody)};
	let url=cHost+path;
	let res=await fetch(url,postSet);
        let resJson=await res.json();
        console.log(resJson);
 	let coo=res.headers.get("set-cookie");
        console.log(res.headers);
       for (let i of res.headers){console.log(i);}
	console.log("cookie \n"+coo);
	return sub1(num,coo);
	
}

async function otpGen(num){
	let path="/auth/requestTac?msisdn=6"+num;
       // let postHead={"content-type":"application/json"};
        let url=cHost+path;
	let getSet={method:"GET"};
	let res=await fetch(url,getSet);
	let resJson=await res.json();
        console.log(resJson);
	let otp=await askQuestion("Done requesting otp,enter below\n");
   return otpVal(num,otp);
}


let gc=1;

if(process.argv.length>2)msisdn=process.argv[2];
//fs.writeFileSync("token.txt",otpGen(msisdn));
otpGen(msisdn);
//testCp(gc);
