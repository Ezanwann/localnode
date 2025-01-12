const Proxy = require('http-mitm-proxy').Proxy;
// or using import/module (package.json -> "type": "module")
// import { Proxy } from "http-mitm-proxy";
const proxy = new Proxy();
const fs=require("fs");
var stream=null;

var tres=false;
var ww=false;
var ll=false;

var LOG=null;

function dummy(s){}

function cLog(){
return function(r){console.log(r);}}

function wLog(s){
	return function(r){
		s.write(r);
	}
}

function wcLog(s){
	return function(r){
		console.log(r);
		s.write(r);
	}
}

let ag=process.argv;
/*process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if(index==4 && val=="y") tres=true;
  if(index==3 && val=="y") ww=true;
  if(index==2 && val=="y")ll= true;
});*/
let ags=ag[2]||"nnn";
for(let i=0;i<ags.length;++i){
	let val=ags[i];
	  if(i==2&& val=="y") tres=true;
  if(i==1&& val=="y") ww=true;
  if(i==0&& val=="y")ll= true;
}

var lls=ll?"TRUE":"FALSE";
var wws=ww?"TRUE":"FALSE";
var tress=tres?"TRUE":"FALSE";

console.log("LOGGING "+lls+", WRITING "+wws+", RESPONSE "+tress);
if(ww){
      stream = fs.createWriteStream("append.txt", {flags:'a'});
          if(ll) LOG=wcLog(stream);
          else LOG=wLog(stream);
  //    LOG=stream.write.bind(stream);
      } else {
      	if(ll)LOG=cLog();
          else LOG=dummy;
      }


proxy.onError(function(ctx, err) {
//  console.error('proxy error:', err);

 proxy.onError(function(ctx, err, errorKind) {
  // ctx may be null
  var url = (ctx && ctx.clientToProxyRequest) ? ctx.clientToProxyRequest.url : "";
  console.error("ERROR:"+errorKind + ' on ' + url + ':', err);
});
});
proxy.use(Proxy.gunzip);
proxy.onRequestData(function(ctx, chunk, callback) {

  console.log("[REQ]body exist");
 
  
  
  let vv=ctx.clientToProxyRequest; 
    let ss=vv.rawHeaders;
//  if(vv.method!="POST")return;
  console.log("Received");
  let rmethod=vv.method;
  let rurl=vv.url;
  let rchunk=chunk;  
 
  if(!!vv.complete)return;
  ctx.use(Proxy.gunzip);
  ctx.onResponseData(function(ctx, chunk, callback) {
  	
      LOG("[REQ]@@@@@#START  REQRES(has body)@@@@@@\n");
      LOG("[REQ]#####START PAYLOAD#####\n");
      LOG("[REQ]Method: "+rmethod+"\n");
      LOG("[REQ]Path: "+rurl+"\n");
      LOG("[REQ]-----START HEADERS-----\n"); 
  for(let j=0;j<ss.length;j+=2){
  	LOG("[REQ]"+ss[j]+" : "+ss[j+1]+"\n");
  }
  
  LOG("[REQ]--------END HEADERS -------\n");
  LOG("[REQ]++++++START BODY++++++\n");
  LOG('[REQ]BODY:\n'+ rchunk.toString());
  LOG("[REQ]\n+++++++END BODY++++++\n");
  LOG("[REQ]########END PAYLOAD#########\n");
  LOG("[RES]++++++START RESPONSE++++++\n");
  let ww=ctx.serverToProxyResponse.rawHeaders;
  for(let j=0;j<ww.length;j+=2){
  	LOG("[RES]"+ww[j]+" : "+ww[j+1]+"\n");
  }
  if(tres){
//       LOG("[RES]++++++START RESPONSE++++++\n");
     LOG('[RES]RESPONSE BODY:'+ chunk.toString());
 //    LOG("[RES]\n+++++++END RESPONSE++++++\n");
     }

LOG("[RES]\n+++++++END RESPONSE++++++\n");
     LOG("[REQ]@@@@@END  REQRES@@@@@@\n");
     
      return callback(null, chunk);
    });
 
  
  
  return callback(null, chunk);
});

proxy.onRequest(function(ctx, callback) {
/*  if (ctx.clientToProxyRequest.headers.host == 'www.google.com'
    && ctx.clientToProxyRequest.url.indexOf('/search') == 0) {
    ctx.use(Proxy.gunzip);

    ctx.onResponseData(function(ctx, chunk, callback) {
      chunk = Buffer.from(chunk.toString().replace(/<h3.*?<\/h3>/g, '<h3>Pwned!</h3>'));
      return callback(null, chunk);
    });
  }*/
  let vv=ctx.clientToProxyRequest; 
    let ss=vv.rawHeaders;
  if(vv.method=="POST")return callback();
  console.log("Received");
  let rmethod=vv.method;
  let rurl=vv.url;
  
 
  if(!!vv.complete)return;
  ctx.use(Proxy.gunzip);
  ctx.onResponseData(function(ctx, chunk, callback) {
  	
      LOG("[REQ]@@@@@#START  REQRES@@@@@@\n");
      LOG("[REQ]#####START PAYLOAD#####\n");
  LOG("[REQ]Method: "+rmethod+"\n");
  LOG("[REQ]Path: "+rurl+"\n");
  LOG("[REQ]-----START HEADERS-----\n"); 
  for(let j=0;j<ss.length;j+=2){
  	LOG("[REQ]"+ss[j]+" : "+ss[j+1]+"\n");
  }
  
  LOG("[REQ]--------END HEADERS -------\n");
  LOG("[REQ]########END PAYLOAD#########\n");
  LOG("[RES]++++++START RESPONSE++++++\n");
  let ww=ctx.serverToProxyResponse.rawHeaders;
  for(let j=0;j<ww.length;j+=2){
  	LOG("[RES]"+ww[j]+" : "+ww[j+1]+"\n");
  }
  if(tres){
       
     LOG('[RES]RESPONSE BODY:'+ chunk.toString());
     
     }
     LOG("[RES]\n+++++++END RESPONSE++++++\n");
     LOG("[REQ]@@@@@END  REQRES@@@@@@\n");
     
      return callback(null, chunk);
    });
 
  
  

  return callback();
});

/*

proxy.onResponseData(function(ctx, chunk, callback) {
  if(!tres)return callback(null,chunk);
  console.log("[RES]body exist");
  ctx.use(Proxy.gunzip);
   stream = fs.createWriteStream("append.txt", {flags:"a"});
  stream.write("[RES]++++++Body start++++++\n");
  stream.write('[RES]REQUEST DATA:'+ chunk.toString());
  stream.write("[RES]\n+++++++Body end++++++\n");
  return callback(null, chunk);
});
*/
/*
proxy.onResponse(function(ctx, callback) {

  let vv=ctx.serverToProxyRequest; 
//  console.log('REQUEST:', ctx.clientToProxyRequest.url);
  if(!!vv.complete)return;
  
  // console.log("########Start Request#######");
 // console.log("method: "+vv.method); 
//  console.log("path: "+vv.url);
  let ss=vv.rawHeaders;
  console.log("Received");
  stream = fs.createWriteStream("append.txt", {flags:'a'});
  stream.write("[RES]#####START PAYLOAD#####\n");
  stream.write("[RES]Method: "+vv.method+"\n");
  stream.write("[RES]Path: "+vv.url+"\n");
  stream.write("[RES]-----START HEADERS-----\n"); 

  for(let j=0;j<ss.length;j+=2){
  	stream.write("[RES]"+ss[j]+" : "+ss[j+1]+"\n");
  }
  
  stream.write("[RES]-------- END HEADERS -------\n");
  stream.write("[RES]########END PAYLOAD#########\n");
  return callback();
});
*/
if(tres) console.log("Response viewed");
  else console.log("Response not viewed");
console.log('begin listening on 1081')
proxy.listen({port: 1081});


