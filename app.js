#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
class Person {
    name;
    role;
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
    introduce() {
        return `Hello, I'm ${this.name}, your ${this.role}. How can I assist you today?`;
    }
}
class School {
    students = [];
    staff = [];
    addStudent(name) {
        this.students.push(name);
    }
    addStaff(name, role) {
        const newStaff = new Person(name, role);
        this.staff.push(newStaff);
    }
    findStudent(name) {
        return this.students.find(student => student === name);
    }
    findStaff(name) {
        return this.staff.find(staff => staff.name === name);
    }
    getAllStudents() {
        return this.students;
    }
    getAllStaff() {
        return this.staff;
    }
}
const school = new School();
const displayWelcomeMessage = () => {
    figlet.text('Welcome to my opp project', {
        font: 'Standard', // Use a valid font name
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
    }, (err, data) => {
        if (err) {
            console.log(chalk.red('Something went wrong with Figlet'));
            console.dir(err);
            return;
        }
        console.log(chalk.blue(data)); // Display the Figlet output in blue color
        startProgram();
    });
};
const startProgram = async () => {
    console.log(chalk.bgBlue.italic("\nCREATED BY MARIYAM IQBAL"));
    do {
        const answer = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.greenBright.bold.italic("Whom would you like to interact with?"),
            choices: ["Students", "Staff", "Exit"]
        });
        if (answer.select === "Exit") {
            console.log(chalk.redBright.italic.bold("Thank you for using the program. Exiting now."));
            process.exit();
        }
        if (answer.select === "Students") {
            await interactWithStudents();
        }
        else if (answer.select === "Staff") {
            await interactWithStaff();
        }
    } while (true);
};
const interactWithStudents = async () => {
    const studentAnswer = await inquirer.prompt({
        name: "studentName",
        type: "input",
        message: chalk.bgGreenBright("Please enter the name of the student you would like to interact with:")
    });
    const student = school.findStudent(studentAnswer.studentName);
    if (!student) {
        school.addStudent(studentAnswer.studentName);
        console.log(chalk.bgGreen(`Hello, I'm ${studentAnswer.studentName}. Nice to meet you!`));
    }
    else {
        console.log(chalk.magenta(`Hello, I'm ${student}. Welcome back.`));
    }
    console.log(chalk.yellow("Current student list:"));
    console.log(school.getAllStudents());
};
const interactWithStaff = async () => {
    const staffAnswer = await inquirer.prompt({
        name: "staffName",
        type: "input",
        message: chalk.blueBright("Please enter the name of the staff you would like to interact with:")
    });
    const staff = school.findStaff(staffAnswer.staffName);
    if (!staff) {
        const roleAnswer = await inquirer.prompt({
            name: "role",
            type: "input",
            message: chalk.blueBright("Please enter the role of the staff member:")
        });
        school.addStaff(staffAnswer.staffName, roleAnswer.role);
        console.log(chalk.yellow(`Hello, I'm ${staffAnswer.staffName}, your ${roleAnswer.role}. How can I assist you today?`));
    }
    else {
        console.log(chalk.magenta(staff.introduce()));
    }
    console.log(chalk.yellow("Current staff list:"));
    console.log(school.getAllStaff().map(staff => `${staff.name} - ${staff.role}`));
};
// Start the program by displaying the welcome message
displayWelcomeMessage();
