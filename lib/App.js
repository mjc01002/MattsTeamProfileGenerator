const inquirer = require("inquirer");
const fs = require('fs');

const Employee = require("./Employee");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");


class App {

    constructor() {

        //List of employees that get added as the user adds them
        this.employees = [];
        //Prompts for employee information
        this.employeePrompt = [
            {
                type: "list",
                message: "Enter your role",
                name: "role",
                choices: ["Manager", "Engineer", "Intern", "Finish Team"],
            },
            {
                type: "input",
                message: ({role}) => `Creating a new ${role}?. What is the ${role}'s name?`,
                name: "name",
                when: ({role}) => role != "Finish Team"
            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s employee ID?`,
                name: "id",
                when: ({role}) => role != "Finish Team"
              
            },
            {
                type: "input",
                message:  ({role}) =>  `What is the ${role}'s email?`,
                name: "email",
                when: (data) => data.role != "Finish Team"
            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s office number?`,
                name: "officeNumber",
                when: ({role}) => role === "Manager"          

            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s github?`,
                name: "github",
                when: ({role}) => role === "Engineer"

            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s school?`,
                name: "school",
                when: ({role}) => role === "Intern"
            }
        ];
    }


    start() {
        this.nextEmployee();
    }
    nextEmployee() {
        inquirer.prompt(this.employeePrompt).then(data => {
            switch (data.role) {
                case "Finish Team":
                    this.renderHTML();
                    console.log("Team file generated");
                    break;
                case "Manager":
                    this.employees.push(new Manager(data.name, data.id, data.email, data.officeNumber));
                    this.nextEmployee();
                    break;
                case "Engineer":
                    this.employees.push(new Engineer(data.name, data.id, data.email, data.github));
                    this.nextEmployee();
                    break;
                case "Intern":
                    this.employees.push(new Intern(data.name, data.id, data.email, data.school));
                    this.nextEmployee();
                    break;
            }
            
        });
    }

    renderHTML() {
        fs.readFile('src/template.html', 'utf8', (err, htmlString) => {

            htmlString = htmlString.split("<script></script>").join(this.getScript());

            fs.writeFile('dist/index.html', htmlString, (err) => {
                if (err) throw err;
                console.log('HTML generated!');
            });
        });

    }

    getScript() {

        var scripts = ``;
        this.employees.forEach(e => {
            var field = "";
            var iconClass = "";
            switch (e.getRole()) {
                case "Manager":
                    field = `Office #: ${e.getOfficeNumber()}`;
                    iconClass = `users`;
                    break;
                case "Engineer":
                    field = `${e.getGithub()}`;
                    iconClass = `hammer`;
                    break;
                case "Intern":
                    field = `School: ${e.getSchool()}`;
                    iconClass = `user-graduate`;
                    break;
            }

            var cardScript = `
            <script>
            var col = $('<div class="col-4">');
            var card = $('<div class="card mx-auto border-info mb-3" style="max-width: 18rem;">');
            var header1 = $('<div class="card-header text-center h4">');
            header1.text("${e.getName()}");
            var header2 = $('<div class="card-header text-center">');
            var icon = $('<i class="fas fa-${iconClass}">');
            header2.text(" ${e.getRole()}");
            header2.prepend(icon);

            var cardBody = $('<div class="card-body text-info">');
            var cardTitle = $('<h5 class="card-title">');
            cardTitle.text("Employee Information:");
            var cardText = $('<p class="card-text">');
            cardText.text("ID: ${e.getId()}");
            var cardText2 = $('<a href="mailto:${e.getEmail()}" class="card-text">');
            cardText2.text("${e.getEmail()}");
            var cardText2A = $('<p class="card-text">');
            cardText2A.text("");
            var cardText3 = $('<a href="${field}" class="card-text">');
            cardText3.text("${field}");
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            cardBody.append(cardText2);
            cardBody.append(cardText2A);
            cardBody.append(cardText3);
    
            card.append(header1);
            card.append(header2);
            card.append(cardBody);
            col.append(card);
            $("#cards").append(col);    
            </script>        
            `;
            scripts += cardScript;

        });
        return scripts;
    }

}


module.exports = App;