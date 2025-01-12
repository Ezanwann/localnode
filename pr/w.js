const fs = require('fs');

// Function to extract words next to "Path:" and "Host:"
function extractWords(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        // Regular expressions to match "Path:" and "Host:"
        const pathRegex = /Path:\s*(\S+)/g;
        const hostRegex = /Host :\s*(\S+)/g;
        const methodRegex =/Method:\s*(\S+)/g;
        const paths = [];
        const methods=[];
        const hosts = [];

        let match;
       let oo="oo.txt";
        fs.writeFileSync(oo,"");
//       fs.appendFileSync(oo,"=======METHOD======\n");
       while ((match = methodRegex.exec(data))!==null) {
           methods.push(match[1]);
          // fs.appendFileSync(oo,match[1]+"\n");
        }
      // fs.appendFileSync(oo,"=======PATH=======\n");

        // Extract words for "Path:"
        while ((match = pathRegex.exec(data)) !== null) {
           paths.push(match[1]);
        //   fs.appendFileSync(oo,match[1]+"\n");
        }

       // fs.appendFileSync(oo,"=======HOST=======\n");

        // Extract words for "Host:"
        while ((match = hostRegex.exec(data)) !== null) {
            hosts.push(match[1]);
         // fs.appendFileSync(oo,match[1]+"\n");
        }
       fs.appendFileSync(oo,""+paths.length+"\n");
       for(let i=0;i<paths.length;++i){
         let ss=""+i+" > "+methods[i]+" : "+hosts[i]+" : "+paths[i]+"\n";
        fs.appendFileSync(oo,ss);
       }
console.log("Done");
        //console.log("Paths:", paths);
        //console.log("Hosts:", hosts);
    });
}
let t="example.txt";
t=process.argv[2]||t;
// Replace 'example.txt' with your text file's path
extractWords(t);
