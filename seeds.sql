USE employees_db;

INSERT INTO department (name) VALUES
("Sales"),
("Onboarding"),
("Upsells"),
("Human Resources"),

INSERT INTO role (title, salary, department_id) VALUES
("Account Executive", 70000, 1),
("Onboarding Speaclist", 60000, 2),
("Senior Account Executive", 85000, 3),
("Human Resource Manager", 70000, 4),

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Jim", "Campbell", 1, 4),
("Jessica", "Jones", 2, 3),
("Doug", "Johnson", 3, 2), 
("Anna", "Gomez", 4, 1),
