# unit-testing-challenge

This repository contains coding challenges for the unit testing exercise of coding academy 2024.

## Assignment
The src folder contains different JavaScript containing classes. Each file is a separate challenge, that is not connected to any classes in other files.

For each file:
- Create a test for the class inside the tests folder (ClassName.spec.js)
- Analyze the class and try to understand the code
- Find all relevant test cases for the specific class
- Implement these tests and strive for the best test coverage you can achieve
- Test for boundary conditions (follow the C.O.R.R.E.C.T. acronym)
- Focus on good structure in your test class and each test cas
  - Use good names for test cases
  - Follow the AAA structure in your test cases
  - Use correct assertions (Check Jest documentation for more assertion types)
  - Use setup and teardown functions if applicable
  - Use parameterized tests if applicable
- BONUS: extend the business logic of the class if you see fit, using TDD

If a file contains other helper classes, you will only need to the test the main class, that the .js File is named after (i.e. ShoppingCart).


## Installation
To get started, run the following command to install JEST

```
npm install
```

If you are using VS Code, it is highly advised to also install the following [JEST extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest):

```
Name: Jest
Id: Orta.vscode-jest
Description: Use Facebook's Jest With Pleasure.
Publisher: Orta
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest
```

## Running tests

To run your tests, simply use the following command

```
npm test
```

OR use the installed VS Code extension