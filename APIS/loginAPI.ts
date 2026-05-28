import { APIRequestContext } from "@playwright/test";

export default class loginAPI{

  private request:APIRequestContext ;
  constructor(request:APIRequestContext){
    this.request=request;
  }
  async login(email:string, password:string){
    return await this.request.post('https://todo.qacart.com/api/v1/users/login',{ data:{
         email:email,
         password:password
    }
  });
  }
}