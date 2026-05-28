export default class User {
 
    private firstname:string;
    private lastname:string;
    private email:string;
    private password:string;
    private accesstoken!: string;
  static getaccesstoken: any;
     //private userID:string;

  constructor(firstname:string , lastname:string, email:string , password:string){
    this.firstname= firstname;
    this.lastname= lastname;
    this.email= email;
    this.password= password;
}
getfirstname(){
    return this.firstname;
}
getlastname(){
    return this.lastname;
}
getemail(){
    return this.email;
}
getpassword(){
    return this.password;
}
getaccesstoken(){
    return this.accesstoken;
}
setaccesstoken(access_token:string){
  this.accesstoken=access_token;
}
}