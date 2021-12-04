# Team Profile Generator

</br>
<p align="center">
    <img src="https://img.shields.io/github/languages/count/kqarlos/team-profile-generator?style=for-the-badge" alt="Languages" />
    <img src="https://img.shields.io/github/languages/top/kqarlos/team-profile-generator?style=for-the-badge" alt="Top Language" />
    <img src="https://img.shields.io/github/languages/code-size/kqarlos/team-profile-generator?style=for-the-badge" alt="Code Size" />
    <img src="https://img.shields.io/github/repo-size/kqarlos/team-profile-generator?style=for-the-badge" alt="Repo Size" />   
    <img src="https://img.shields.io/tokei/lines/github/kqarlos/team-profile-generator?style=for-the-badge" alt="Total Lines" />
    <img src="https://img.shields.io/github/package-json/dependency-version/kqarlos/team-profile-generator/inquirer?style=for-the-badge" alt="Inquirer Version" />
    <img src="https://img.shields.io/github/last-commit/kqarlos/team-profile-generator?style=for-the-badge" alt="Last Commit" />  
    <img src="https://img.shields.io/github/issues/kqarlos/team-profile-generator?style=for-the-badge" alt="Issues" />  
    <img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed/kqarlos/team-profile-generator?style=for-the-badge">
    <img src="https://img.shields.io/github/followers/kqarlos?style=social" alt="Followers" />  
</p>


## Description

Create an HTML profile for your whole developer team by answering questions on the command line.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
    * [Screenshots](#screenshots)
    * [Snippets](#snippets)
* [Credits](#credits)
* [License](#license)

## Installation

Steps to install application:
1. Clone repository.
2. In the directory with server.js run npm install
3. Start server and answer prompts
4. HTML Generated

```
git clone git@github.com:kqarlos/team-profile-generator.git
npm instal
node server.js

```

<p align="center">
    <a href="https://kqarlos.github.io/team-profile-generator/output/index.html"><img src="https://img.shields.io/badge/-👉 Sample Profile-success?style=for-the-badge"  alt="Sample Site" /></a>
</p>

## Usage
### Screenshots

1. Working app

![Image Site](assets/live.gif)

2. Example of a team profile generated

![Site](assets/team-profile.png)

### Snippets


1. nextEmployee();

```javascript

nextEmployee() {
    this.promptRole().then((role) => {
        if (role === "Exit") {
            this.renderHTML();
            this.end();
            }
        else {
            this.promptInfo(role).then((data) => {
                switch (role) {
                    case "Manager":
                        var employee = new Manager(data.name data.id, data.email, data.officeN);
                        break;
                    case "Engineer":
                        var employee = new Engineer(data.name, data.id, data.email, data.github);
                        break;
                    case "Intern":
                        var employee = new Intern(data.name, data.id, data.email, data.school);
                        break;
                }
                this.employees.push(employee);
                this.nextEmployee();
            });
        }
    });
}
    
```
* This function uses recursion to keep gathering employee information from the user until the user quits the program. It calls on a function that will prompt the user to select to either add an employee or to exit the application. If the user decides to exit, the application will call to generate the team profile HTML and end the appliciaton. Otherwise, it will ask user for further information on the employee and create a new _Employee_ object based on that information. Next, it will call itself to prompt the user again whether to add another employee or exit the application.


2. promptInfo(role)

```javascript

    //prompt user for employee information and return it
    promptInfo(role) {
        switch (role) {
            case "Manager":
                return inquirer.prompt(this.managerPrompt).then(function (data) {
                    return data;
                });
                break;
            case "Engineer":
                return inquirer.prompt(this.engineerPrompt).then(function (data) {
                    return data;
                });
                break;
            case "Intern":
                return inquirer.prompt(this.internPrompt).then(function (data) {
                    return data;
                });
                break;
        }
    }

```
* This function will return a function that will prompt the user to input information according to the type of employee they've chosen. This function comes with a promise that returns the data collected by _inquirer.prompt()_

## Credits

### Author

- 💼 Carlos Toledo: [portfolio](https://kqarlos.github.io/)
- :octocat: Github: [kqarlos](https://www.github.com/kqarlos)
- LinkedIn: [carlos-toledo415](https://www.linkedin.com/in/carlos-toledo415/)


### Built With

</br>
<p align="center">
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/-HTML-orange?style=for-the-badge"  alt="HMTL" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS-blue?style=for-the-badge" alt="CSS" /></a>
    <a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/-Javascript-yellow?style=for-the-badge" alt="Javascript" /></a>
    <a href="https://getbootstrap.com/"><img src="https://img.shields.io/badge/-Bootstrap-blueviolet?style=for-the-badge" alt="Bootstrap" /></a>
    <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/-Node-orange?style=for-the-badge" alt="Node" /></a>
    <a href="https://www.npmjs.com/package/inquirer"><img src="https://img.shields.io/badge/-Inquirer-blue?style=for-the-badge" alt="Inquirer" /></a>
    <a href="https://www.npmjs.com/package/jest"><img src="https://img.shields.io/badge/-Jest-blue?style=for-the-badge" alt="Jest" /></a>
</p>

## License

</br>
<p align="center">
    <img align="center" src="https://img.shields.io/github/license/kqarlos/team-profile-generator?style=for-the-badge" alt="MIT license" />
</p>
