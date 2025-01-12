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
  console.log("body exist");
  stream = fs.createWriteStream("append.txt", {flags:"a"});
  stream.write("++++++Body start++++++\n");
  stream.write('REQUEST DATA:'+ chunk.toString());
  stream.write("\n+++++++Body end++++++\n");
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
  stream.write("#####Start Req#####\n");
  stream.write("Method: "+vv.method+"\n");
  stream.write("Path: "+vv.url+"\n");
  stream.write("-----Start Headers-----\n"); 
 for(let s of ss){
    stream.write(s+"\n");
  }
  stream.write("-------- End header -------\n");
  stream.write("######## End Request#########\n");
  return callback();
});

console.log('begin listening on 8081')
proxy.listen({port: 1081});
