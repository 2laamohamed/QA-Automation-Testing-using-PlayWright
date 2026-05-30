import { faker } from '@faker-js/faker';
import { test, expect , request} from '@playwright/test';
import User from '../Models/user';
//import { url } from 'node:inspector';
import userAPI from '../APIS/userAPI';
import registerPage from '../pages/registerPage';

// signUP from UI
 test("signup using the UI", async ({page})=>{
        const user= new User( faker.person.firstName(), faker.person.lastName() , faker.internet.email() , "Abcd@123")
     

        const RegisterPage= new registerPage(page);
         await RegisterPage.load (page);
         await RegisterPage.register(user);


     

    const Welcomemessage= await page.locator('[data-testid="welcome"]');
    await expect(Welcomemessage).toBeVisible();
 });


// sign up using API's
test(" signup using API's ", async ({page , request, context})=>{
     const user= new User (faker.person.firstName(),faker.person.lastName(), faker.internet.email(), 'Abcd@123');

     const Response= await new userAPI(request).register(user);


    const responseBody= await Response.json();
    const accesstoken= await responseBody.access_token;
    const userid = await responseBody.userID;
    const firstName= await responseBody.firstName;
   console.log("accesstoken is:"+ accesstoken );
   console.log("userID is:"+ userid );  firstName
   console.log("firstName is:"+ firstName );
  
    await context.addCookies([{
      name:'access_token',
      value: accesstoken,
      url:'https://todo.qacart.com'

    },
    {name:'userID',
      value: userid,
      url:'https://todo.qacart.com'} ,

    {name:'firstName',
      value: firstName,
      url:'https://todo.qacart.com'
    },
   ]);
  

});