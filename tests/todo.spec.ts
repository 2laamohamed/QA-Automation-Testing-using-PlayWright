import { test, expect } from '@playwright/test';
import User from '../Models/user';
import registerPage from '../pages/registerPage';
import NewToDoPage from '../pages/NewTodoPage'; // تأكدي إن الاسم كابيتال هنا وفوق

test("login & add todo", async ({ page, request, context }) => {
    
    const RegisterPage = new registerPage(page, request, context);
    const loggedInUser = new User("", "", "Abcd@123.com", "Abcd@123");
    
    // 1. تسجيل الدخول بالـ API وجلب التوكن
    const AccessToken = await RegisterPage.registerusingAPI(loggedInUser);

    // 2. الذهاب لصفحة الـ todo والتأكد من رسالة الترحيب
    await page.goto('https://todo.qacart.com/todo');
    const Welcomemessage = page.locator('[data-testid="welcome"]');
    await expect(Welcomemessage).toBeVisible();

    // 3. إنشاء الـ Instance الخاص بصفحة الـ NewToDo (مرة واحدة فقط وبترتيب صح: page ثم request)
    const newTodoPageInstance = new NewToDoPage(page, request);
    await newTodoPageInstance.load();

    // 4. إضافة التاسك بالـ API عن طريق البيدج (هنا بنمرر الـ AccessToken النصي عشان يمسح الإيرور)
    await newTodoPageInstance.addnewtaskusingAPI(AccessToken as any);

    // 5. العودة لصفحة الـ todo لرؤية العنصر
    await page.goto('/todo');

    // 6. تحديد العنصر والـ Check عليه
    const newItem = page.locator('[data-testid="todo-item"]').nth(0);
    await expect(newItem).toBeVisible();  
    
    // 7. الحذف والتأكد من الاختفاء
    await page.locator('[data-testid="delete"]').click();
    await expect(newItem).toBeHidden();
    
    const deletedITEM = page.locator('[data-testid="no-todos"]');
    await expect(deletedITEM).toBeVisible();
});