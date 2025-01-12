const Proxy = require('http-mitm-proxy').Proxy;
// or using import/module (package.json -> "type": "module")
// import { Proxy } from "http-mitm-proxy";
const proxy = new Proxy();
const fs=require("fs");
var stream=null;
proxy.onError(function(ctx, err) {
//  console.error('proxy error:', err);
});

proxy.onRequestData(function(ctx, chunk, callback) {
  console.log("[REQ]body exist");
  stream = fs.createWriteStream("append.txt", {flags:"a"});
  stream.write("[REQ]++++++BODY START++++++\n");
  stream.write('[REQ]REQUEST DATA:'+ chunk.toString());
  stream.write("[REQ]\n+++++++BODY END++++++\n");
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
//  console.log('REQUEST:', ctx.clientToProxyRequest.url);
  if(!!vv.complete)return;
  
  // console.log("########Start Request#######");
 // console.log("method: "+vv.method); 
//  console.log("path: "+vv.url);
  let ss=vv.rawHeaders;
  console.log("Received");
  stream = fs.createWriteStream("append.txt", {flags:'a'});
  stream.write("[REQ]#####START PAYLOAD#####\n");
  stream.write("[REQ]Method: "+vv.method+"\n");
  stream.write("[REQ]Path: "+vv.url+"\n");
  stream.write("[REQ]-----START HEADERS-----\n"); 
 /*for(let s of ss){
    stream.write(s+"\n");
  }*/
  for(let j=0;j<ss.length;j+=2){
  	stream.write("[REQ]"+ss[j]+" : "+ss[j+1]+"\n");
  }
  
  stream.write("[REQ]--------END HEADERS -------\n");
  stream.write("[REQ]########END PAYLOAD#########\n");
  return callback();
});



proxy.onResponseData(function(ctx, chunk, callback) {
  console.log("[RES]body exist");
  stream = fs.createWriteStream("append.txt", {flags:"a"});
  stream.write("[RES]++++++Body start++++++\n");
  stream.write('[RES]REQUEST DATA:'+ chunk.toString());
  stream.write("[RES]\n+++++++Body end++++++\n");
  return callback(null, chunk);
});
/*
proxy.onResponse(function(ctx, callback) {

  let vv=ctx.serverToProxyRequest; 
//  console.log('REQUEST:', ctx.clientToProxyRequest.url);
//  if(!!vv.complete)return;
  
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
console.log('begin listening on 1081')
proxy.listen({port: 1081});
