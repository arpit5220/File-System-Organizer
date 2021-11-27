                             /****ARPIT KATIYAR */

//1. First Activity with Node.js

// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders

// we will be using built in node modules like fs and path to  create this project

//array ke from mein input jaata hai command line pein
// let input=process.argv[4]  //process.argv is a array by this we take input in terminal
// console.log(input)
//node js treats command line input as array is your process array

// const { log } = require('console');
const fs=require('fs')
const path=require('path')




let inputArr=process.argv.slice(2)
// slice is used to extract the commands and path we have passed
//console.log(inputArr)

let command=inputArr[0]

let types = {
    javascipt: ['js','c++','java','c','py','R','net','C#'],
    media: ["mp4", "mkv","mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    image:['png','jpg']
}




switch(command){
    case 'tree':
        treeFn()
        break;


    case 'organize':
        organizeFn(inputArr[1])
        break;

    case 'help':
        helpFn()
        break;

    default:
       console.log("invaid")
        
            break;
        }
                
function treeFn(){


    console.log('tree function implemented')
}

function organizeFn(dirpath){
    let destpath;
//input of a directory path
if(dirpath==undefined){
    console.log("please enter a directory path")
    return;

}
else{
   let doesExist=fs.existsSync(dirpath)
   //console.log(doesExist)
   if(doesExist==true){
       //2. create a organized files Directory
         destpath=path.join(dirpath,'organized_files')
         if(fs.existsSync(destpath)==false){
             fs.mkdirSync(destpath)
         }
         else{
           console.log("the files Already exists")
        }
   }
   else{
      console.log(" please enter valid path") 
}
   
}    

organizeHElper(dirpath)
    
}



function organizeHElper(src,dest){
   let childNames=fs.readdirSync(src)
   //console.log(childNames)

    for(let i=0;i<childNames.length;i++){
        let childAddress =path.join(src,childNames[i])
        let isFile=fs.lstatSync(childAddress).isFile()



        if(isFile==true){
            let filecategory=getcategory(childNames[i])
            console.log(childNames[i]+'   belongs  to   '+filecategory)
        }
    }
}

function getcategory(name){
    let ext=path.extname(name)
    //console.log(ext)

    ext=ext.slice(1)
   // console.log(ext)
    for(let type in types){
        let cTypeArr=types[type]
        //console.log(cTypeArr)

        for(let i=0;i<cTypeArr.length;i++){
            if(ext==cTypeArr[i]){
                return type
            }

        }
    }

}




function helpFn(){
    console.log(`List of all the commands-
                1) Tree command -node FO.js tree <dirname>
                2) organize command-node FO.js organize <dirname>
                3)Help-node FO.js help`)
}





