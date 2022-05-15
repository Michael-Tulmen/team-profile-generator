//required npm packages
const inquirer = require('inquirer');
const colors = require('colors');

//This is what generates the actual html
const spawnHTML = require('./src/spawnHTML');

//subclasses of employee
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');


//The array that will hold new and existing team members (needs to be expandable);
const teamArr = [];

//Introduction to the program, functionality explanation
const introduction = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'intro',
            message: "Welcome to a personalized team management generator, this program will prompt you for various information regarding your team to identify and keep track of everybody's positions"
        },
    ])
    .then(addManager)
};

//Questions that the user will answer to populate data, will start with manager, then go down the hierarchy
//add manager function CALLED ABOVE, name is important because name carries throughout other functions
const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Please enter a manager's name",
            validate: name => {
                if (name) {
                    return true;
                } else {
                    console.log("Please enter a team manager's name or N/A if none are available");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: ({ name }) => `Input ${name}'s employee ID.`,
            validate: id => {
                if (id) {
                    return true;
                } else {
                    ({ name }) => console.log (`Please enter ${name}'s employee ID.`);
                    return false; 
                }
            },
        },
        {
            type: 'input',
            name: 'email',
            message: ({ name }) => `Enter ${name}'s email address.`,
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log('Please enter a valid email address.')
                    return false;
                };
            },
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: ({ name }) => `Enter ${name}'s office number.`,
            validate: officeNumber => {
                if (officeNumber) {
                    return true;
                } else {
                    ({ name }) => console.log (`Please enter ${name}\'s office number.`);
                    return false; 
                }
            },
        },
        {
            type: 'list',
            name: 'moreTeammates',
            message: 'Would you like to add more teammates',
            choices: ['Yes', 'No'],
        },
    ])
    .then(answers => {
        if (answers.title === 'Engineer') {
            const {name, id, email, github} = answers;
            const engineer = new Engineer (name, id, email, github);
            teamArr.push(engineer); 
        
        } else if (answers.title === 'Intern') {
            const {name, id, email, school} = answers;
            const intern = new Intern (name, id, email, school);
            teamArr.push(intern);
        };
        (answers.queryMoreReports === 'Yes') ? addReports() : generateHTML(teamArr);
    })
};


//starts app 
const init = () => introduction()
//init
init();

