INSERT INTO department (department_name)
VALUES ("Marketing"),
    ("Accounting"),
    ("Production"),
    ("Distribution");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 150000, 1),
("Accountant", 80000, 2),
("Head Brewer", 100000, 3),
("warehouse supervisor", 80000, 4),
("assistant Brewer", 65000, 3),
("delivery driver", 50000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("jarrod", "blanning", 2, 1),
("Amanda", "Baker", 1, 1),
("Ryan", "Anderson", 3, 2),
("Cam", "Allum", 4, 1),
("Mitch", "Wirth", 5, 3),
("Dave", "Johnston", 6, 3);

