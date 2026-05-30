import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 *  السطر ده هو "السر" عشان الـ process.env يشتغل
 * لو عندك ملف .env في الـ root، السطر ده هيسحبه فوراً
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  
  // لو في سيرفر CI هيمنع الـ .only عشان الـ Pipeline ميفشلش
  forbidOnly: !!process.env.CI,
  
  // لو CI هيعيد الاختبار مرتين، لو عندك على الجهاز 0 (عشان الإنجاز)
  retries: process.env.CI ? 2 : 0,
  
  // لو CI بيستخدم worker واحد، لو عندك بيستخدم نص قوة الجهاز (عشان السرعة)
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    // بياخد الـ URL من الـ env، ولو مش موجود بيستخدم الافتراضي
    baseURL: process.env.BASE_URL || "https://todo.qacart.com/",

    trace: 'on-first-retry',
   
    
    // لو CI شغال مخفي (true)، لو عندك بيفتح المتصفح (false) عشان تشوف اللي بيحصل
   // headless: !!process.env.CI , 
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
       timeout: 1000000,
    },
  ],
});