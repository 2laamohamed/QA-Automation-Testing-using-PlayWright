import { APIRequestContext, request } from "@playwright/test";
import User from "../Models/user";

export default class todoAPI{
  private request:APIRequestContext;
  constructor(request:APIRequestContext){
    this.request=request;
  }
 async addtodo(token:string){
   return await this.request.post('https://todo.qacart.com/api/v1/tasks',{data:
      {  item: "playwright",
         isCompleted: false},
      headers:{
        authorization:`Bearer ${token}`
      }
    });
}}