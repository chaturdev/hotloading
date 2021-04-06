const fs=require('fs');
const path = require('path');
const async=require('async');
//joining path of directory 
const directoryPath = path.join(__dirname, 'plugin');
//to keep existing file in json
var __existingFiles=[];


let i=0;


setInterval(async()=>{
    ifFirstTime=false;
    console.log(ifFirstTime);
    await checkIfFileInPath(); 
    try{
      
        doSomething();
        async.eachSeries(__existingFiles,(fileName,cb)=>{
            var cls=require(`./plugin/${fileName}`);
            var output=cls.callFunction();
            console.log(output);
           
            return cb();
        })
    }catch(ex){
        console.log(ex);
    }

},20*1000)


function doSomething () {
    console.log("here i m doing something");
}


/**
 * check if new file exist in path
 */
function checkIfFileInPath(){
    return new Promise((resolve,reject)=>{
        try{

            fs.readdir(directoryPath, function (err, files) {
                //handling error
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                } 
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    __existingFiles.push(file); 
                });
                resolve();
            });
            
        }catch(ex){
            console.log(ex);
            reject();
        }
    })
    
}


//passsing directoryPath and callback function
