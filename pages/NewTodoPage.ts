import { APIRequestContext, Page } from "@playwright/test";
import todoAPI from "../APIS/todoAPI";
import User from "../Models/user";

export default class newToDoPage{
    private page:Page;
    private request?:APIRequestContext;
    
    constructor(page:Page , request?:APIRequestContext ){
        this.page=page;
        this.request=request;
        
    }
    private get newToDoItem(){
        return '[data-testid="new-todo"]';
    }
    private get newToDoSubmit(){
        return '[data-testid="submit-newTask"]';
    }
    private get ToDoItem(){
        return '[data-testid="todo-item"]';
    }
    async load(){
        await this.page.goto('/todo/new');
    }
    async gettodoitemByText(index: number){
        return this.page.locator(this.ToDoItem).nth(index);
    }
    async addnewtaskusingAPI(user:User){
        await new todoAPI(this.request!).addtodo(user as any);
    }
}