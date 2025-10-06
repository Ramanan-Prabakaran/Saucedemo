# Saucedemo
This project automates the complete E-Commerce checkout flow on SauceDemo using Playwright with JavaScript. It follows a Page Object Model (POM) structure and implements data-driven testing, custom waits, HTML reporting, and error handling.

# Saucedemo Checkout Flow Automation (Playwright JS)
✅ Automates full checkout flow on [SauceDemo](https://www.saucedemo.com) using Playwright + POM + Data-Driven testing.

## 🏗 Setup
npm install
npx playwright install

**🏁 Objective**
Automate an end-to-end checkout flow including:
- Login with multiple user types
- Add the two most expensive products to the cart
- Validate cart details and totals
- Perform checkout and verify order completion
- Handle edge cases like locked-out users, missing images, and dynamic waits

**🧱 Framework Highlights**
Language	JavaScript (ES6)
Test Runner	Playwright Test
Design Pattern	Page Object Model (POM)
Data Source	CSV file (users.csv)
Reporting	Playwright HTML Reporter
Screenshots	Captured per test scenario
Wait Strategy	Custom wait utility for slow-loading elements

**Folder Structure**
saucedemo-checkout/
│
├── data/
│   └── users.json                     # Login credentials for multiple users
│
├── pages/                             # Page Object classes
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── OverviewPage.js
│
├── tests/
│   └── checkoutFlow.spec.js           # Main test covering the flow
│
├── utils/
│   ├── customWait.js                  # Custom wait strategy
│   ├── screenshotHelper.js            # Screenshot helper functions
│   └── reportGenerator.js             # Optional report extensions
│
├── playwright.config.js               # Test configuration and reporter setup
├── package.json                       # Project dependencies
└── README.md                          # Documentation (this file)

**Installation & Setup**
1️.Clone Repository
   git clone <your-repo-url>
   cd saucedemo-checkout
2️.Install Dependencies
   npm install
   npx playwright install
3️.Run Tests
   npx playwright test --headed
4️.View HTML Report
   npx playwright show-report

**Data-Driven Login (users.csv)**
username,password
standard_user,secret_sauce
problem_user,secret_sauce
locked_out_user,secret_sauce

The framework loops through all users and executes the checkout flow conditionally:

**✅ standard_user: completes flow successfully**
<img width="1280" height="720" alt="test-finished-1" src="https://github.com/user-attachments/assets/f280fbf1-309c-4b1b-ab6a-c63baffa23c7" />

**⚠️ problem_user: verifies broken image handling**
<img width="1280" height="720" alt="test-failed-1" src="https://github.com/user-attachments/assets/79ea883b-197c-4797-b195-edc414b148af" />

**🚫 locked_out_user: asserts error message handling**
<img width="1280" height="720" alt="test-finished-1" src="https://github.com/user-attachments/assets/2de245bf-581c-40de-8c9f-cd742b73f6f4" />

**Key Features**

✅ Dynamic Product Selection
• Sorts all products by price and adds the two most expensive.
• Verifies cart badge count updates correctly.
• Skips items if the Add to Cart button is not available.

✅ Cart & Checkout Validation
• Asserts correct product names and prices.
• Removes one item and re-verifies the cart.
• Calculates subtotal and compares with displayed value.

✅ Reporting & Logging
• HTML Report generated after every run.
• Screenshots captured for each major step.
• Console logging of calculated totals for verification.

✅ Error & Edge Case Handling
• Graceful handling of missing elements or network delays.
• Simulated slow-loading waits with retry logic.
• Locked-out user validation with error assertion.

**Bonus Implementations**
🕒 Custom Wait-Utility waits dynamically for slow selectors
📸 Screenshots	Captured at login, cart, and order completion
📑 HTML Report	Generated with Playwright’s built-in reporter
🧰 Reusability	Modular POM ensures test scalability

**Design Decisions**
1. Playwright over Selenium — faster, supports modern async JS, built-in reporting.
2. CSV data file — lightweight and easily extendable for multiple users.
3. POM — enhances readability, maintenance, and reusability.
4. Custom waits & screenshots — ensures resilience against dynamic delays.
5. Single spec loop — executes same test flow across user types for coverage.

**🏆 Evaluation Readiness**
Code Quality	Clean POM-based JS code with descriptive names
Framework Design	Clear separation between pages, tests, and data
Error Handling	Try/catch + assertions for negative cases
Test Coverage	Includes positive, negative, and dynamic obstacles
Reporting	HTML + screenshots for each major step

Submitted By: Ramanan Prabakaran- https://www.linkedin.com/in/ramanan-prabakaran/  Date: 06 October 2025
Challenge: E-Commerce Checkout Flow with Dynamic Obstacles (Naveen)
