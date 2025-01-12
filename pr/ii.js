const Proxy = require('http-mitm-proxy').Proxy;
// or using import/module (package.json -> "type": "module")
// import { Proxy } from "http-mitm-proxy";
const proxy = new Proxy();

proxy.onError(function(ctx, err) {
//  console.error('proxy error:', err);
});

proxy.onRequestData(function(ctx, chunk, callback) {
  console.log('REQUEST DATA:', chunk.toString());
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
   console.log("########Start Request#######");
  console.log("method: "+vv.method); 
  console.log("path: "+vv.url);
  let ss=vv.rawHeaders;
  console.log("-------Start header------");
  for(let s of ss){
    console.log(s);
  }
  console.log("-------- End header -------");
  console.log("######## End Request#########");
  return callback();
});

console.log('begin listening on 8081')
proxy.listen({port: 1081});
