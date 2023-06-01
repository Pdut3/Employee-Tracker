const mysql = ("mysql");
const inquirer = ("inquirer");


const connection = mysql.createConnection((
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_db",
));

function start() {
    inquirer.createPromptModule({
        name: "action",
        type: "list",
        message: "How can we help you today?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Exit",
        ],
    }).then(function (answer) {
        switch (answer.action) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployeeRole();
            case "Exit":
                connection.end();
                break;
            default;
                break;
        }
    })
}


const viewDepartments = () => {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    });
};

const viewRoles = () => {
    let query =
        "SELECT role.title, role.salary, role.id, department.name FROM role RIGHT JOIN department ON role.department_id = department.id";
    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    });
};

const viewEmployees = () => {
    let query =
        "SELECT t1.first_name, t1.last_name, t2.first_name AS manager FROM employee t1 INNER JOIN employee t2 ON t1.manager_id =t2.id";
    //let query = 
    //"SELECT first_name, last_name, id, manager_id FROM employee ORDER BY last_name";
    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    });
};

const addDepartment = () => {
    connection.query(query, function (err, res) {
        if (err) throw (err);
        inquirer.prompt([
            {
                name: "departmentName",
                type: "list",
                choices: function () {
                    return res.map((role) => ({ name: role.tilte, value: role.id }));
                },
                message: "new department?",
            },
        ]).then(function (answer) {
            connection.query("INSERT INTO employee SET ?",
            {
                name: answer.departmentName,
            }), 
            start();
        });
            
    });
    
};

const addRole = () => {
    connection.query(query, function (err, res) {
        if (err) throw (err);
    });
    inquirer.prompt([
        {
            name: "roleName",
            type: "input",
            message: "new role?",
        },
        {
            name: "salary",
            type: "input",
            message: "what is the salary?",
        },
        {
            name: "departmentId",
            type: "list",
            choices: function () {
                return res.map((role) => ({ name: role.title, value: role.id}));
            },
            message: "where is this role going?",
        },
    ]).then( function (answer) {
        connection.query("INSERT INTO role SET ?",
        {
            name: answer.message,
        }),
        start();
    });

};

    const addEmployee = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err)
            throw (err);
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "last name?",
            },
            {
                name: "managerId",
                type: "input",
                message: "manager id?",
            },
            {
                name: "addRole",
                type: "list",
                choices: function () {
                    return res.map((role) => ({ name: role.tilte, value: role.id }));
                },
                message: "role?",
            },
        ]).then(function (answer) {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_naem: answer.lastName,
                    manager_id: answer.managerId,
                    role_id: answer.addRole,
                }),
                start();
        });
    });

    //connection.query(query, function(err, res) {
    //    if (err) throw (err);
    //    console.table(res);
    //    start();
    //});
}

const updateEmployeeRole = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err)
            throw (err); {
        inquirer.prompt([
            {
              name: "employeeId", 
              type: "input",
              message: "employee id?"
            },
            {
              name: "updatedRole",
              type: "list",
              choices: function () {
                return res.map((role) => ({ name: role.title, value: role.id}));
              },
              message: "role?"  
            },
        ]).then(function (answer) {
            console.log(answer.updatedRole);
            connection.query("UPDATE employee SET ? WHERE ?", [
            { role_id: answer.updatedRole }, 
            { id: answer.employeeId },
        ]);
        start();
        });
    }});
};

start();


//updating repo to have code
