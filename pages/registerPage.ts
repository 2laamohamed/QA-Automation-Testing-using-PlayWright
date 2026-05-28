import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../Models/user";
import loginAPI from "../APIS/loginAPI";

export default class registerPage{
  
// constructor
private page:Page;
private request?:APIRequestContext ;
private context?: BrowserContext ;

constructor(page:Page, request?:APIRequestContext , context?: BrowserContext ){
    this.page=page;
    this.request=request;
    this.context=context;
}

// elements 
 private get firstnameinput(){
  return '[data-testid="first-name"]';
 }
 private get lastnameinput(){
  return '[data-testid="last-name"]';
}
private get emailInput(){
    return '[data-testid="email"]';
}
private get passwordInput(){
    return '[data-testid="password"]';
}
private get ConfirmPasswordInput(){
    return'[data-testid="confirm-password"]';
}
private get submitButton(){
    return '[data-testid="submit"]';
}
// steps
async load(page: Page){
 await page.goto("/signup");
}
async register(user: User){
     await this.page.locator(this.firstnameinput).fill(user.getfirstname());
     await this.page.locator(this.lastnameinput).fill(user.getlastname());
     await this.page.locator(this.emailInput).fill(user.getemail());
     await this.page.locator(this.passwordInput).fill("Abcd@123");
     await this.page.locator(this.ConfirmPasswordInput).fill("Abcd@123");
     await this.page.locator(this.submitButton).click();
}
async registerusingAPI(user: User){
    const loginInstance = await new loginAPI(this.request!);
    // const Response = await new loginAPI(this.request!)
        
       //const Response= await new userAPI(request).register(loggedinUser);
      const Response = await loginInstance.login(user.getemail(), "Abcd@123") as any;
       const responseBody= await Response.json();
       const AccessToken= await responseBody.access_token;
       const userID= await responseBody.userID;
       const firstName= await responseBody.firstName;
    
       console.log("accesstoken is:"+ AccessToken );
       console.log("userID is:"+ userID );  
       console.log("firstName is:"+ firstName );
       
    
       await this.context!.addCookies([
        { name:'access_token',
          value: AccessToken,
          url:'https://todo.qacart.com'
    
        },
        {name:'userID',
          value: userID,
          url:'https://todo.qacart.com'} ,
    
        {name:'firstName',
          value: firstName,
          url:'https://todo.qacart.com'
        },
       ]);
       return AccessToken;
}
}
