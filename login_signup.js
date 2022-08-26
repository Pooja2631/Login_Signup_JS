const readlinesync=require("readline-sync")
var passwordValidator = require('password-validator');
const fs = require('fs');

var main_dict={}
var list=[]
var dic_out={}
var newDict={}
var list1=[]

const user=readlinesync.question("Enter what you want 1. for Signup\n 2. for Login=")

if (user==1){

    const username=readlinesync.question("Enter name:----")
    const password=readlinesync.question("Enter your password (password should conatain Upper,Small Letter, Special Character and number):----")
    var schema = new passwordValidator();
    schema.is().min(8).is().max(15).has().uppercase().has().lowercase().has().digits(1).has().symbols(1)
    var stronPassword=(schema.validate(password));
    console.log(stronPassword)

    const confirmpassword=readlinesync.question("Confirm your password:----")

    if(password==confirmpassword){
        console.log("Both password are equal");
        
    }else{
        console.log("Both password are not equal");

    }if (stronPassword==true){
        dic_out["Username"]=username
        dic_out["Password"]=password

        list.push(dic_out)

        main_dict["user"]=list
        const path = "userdetails.json"
        
        fs.exists(path, function(exists) {

            if (exists) {

                const result1=fs.readFile("userdetails.json","utf8",(err,result1)=>{
                    if(err) throw err;
                    var obj=JSON.parse(result1)
                    // console.log(obj,"********")
                    

                    var list1=(obj["user"]);
                    // console.log(list1,"******");
                
                   
                    for (index in list1){
                        var fileData = list1[index]["Username"]
                        if (fileData==username){
                            break
                        }
                    }
                    if(fileData==username) {
                        console.log('already exists');
                    }else{
                        dic_out["Username"]=username
                        dic_out["Password"]=password
                        main_dict["user"]=list1
                    
                        console.log(`Congrats${username}you are signed up successfully!!!`);

                        const Description=readlinesync.question("Write something about You:--")
                        const BirthDate=readlinesync.question("Enter your date of birth:--")
                        const Hobbies=readlinesync.question("Enter your Hobbies:--")
                        const Gender=readlinesync.question("Enter your gender:--")

                        newDict["description"]=Description
                        newDict["dob"]=BirthDate
                        newDict["hobbies"]=Hobbies
                        newDict["gender"]=Gender
                        dic_out["profile"]=newDict
                        list1.push(dic_out)
                        main_dict["user"]=list1

                        const promise1 = new Promise((resolve,rejects)=>{
                            fs.writeFile("userdetails.json", JSON.stringify(main_dict,null,4), err => {
    

                                resolve("Data has added successfully in json!!!");
                            })  
                        })
                        promise1.then((data1)=>{
                            console.log(data1);
                        })
                    }
        
                })
            }
            else{
                console.log(`Congrats${username}you are signed up successfully!!!`);

                const Description=readlinesync.question("Wite saomething about You:--")
                const BirthDate=readlinesync.question("Enter your date of birth:--")
                const Hobbies=readlinesync.question("Write your Hobbies:--")
                const Gender=readlinesync.question("enter your gender:--")

                newDict["description"]=Description
                newDict["dob"]=BirthDate
                newDict["hobbies"]=Hobbies
                newDict["gender"]=Gender
                dic_out["profile"]=newDict
                list1.push(dic_out)
                main_dict["user"]=list1

                
                const promise2 = new Promise((resolve,rejects)=>{
                    fs.writeFile("userdetails.json", JSON.stringify(main_dict,null,4), err => {
        
                        if (err) throw err; 
                        resolve("data wrote...");
                    })
                })
                promise2.then((writeData)=>{
                    console.log(writeData);
                })
                
            }
        })
    }else{
        console.log(" Both password are not same")
    }
}else{
    const username=readlinesync.question("Enter name:----")
    const password=readlinesync.question("Enter password:----")

    const promise3 = new Promise((resolve,rejects)=>{
        const data=fs.readFile("userdetails.json","utf8",(err,data)=>{
            if(err) throw err;
            var fileData=JSON.parse(data)
            var list2=(fileData["user"])
    
            for (i in list2){
    
                var name = list2[i]["Username"]
                var pswd = list2[i]["Password"]
                var gen  =  list2[i]["profile"]["gender"]
                var bio  =  list2[i]["profile"]["description"]
                var hobbys =list2[i]["profile"]["hobbies"]
                var dob=list2[i]["profile"]["dob"]
    
                if (name==username && pswd==password){
                    break
                }
            }
            if(name==username &&pswd==password) {
                console.log(`${username} you are logged in successfully`)
            
                console.log("&&&&& PROFILE &&&&&");
                console.log(`Username:-${username}`);
                console.log(`Gender:-${gen}`);
                console.log(`Bio:-${bio}`);
                console.log(`Hobbies:-${hobbys}`);
                console.log(`DOB:-${dob}`);
                resolve("Login Done");
            }else{
                
                rejects("Invalid username and password!"); 
                
            }
        })
                    
    })
    promise3.then((getData)=>{
        console.log(getData);
    }).catch((err)=>{
        console.log(err);
    })

}