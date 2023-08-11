SELECT 
role.title AS Title,
role.id AS ID,
department.department_name AS Department,
role.salary AS Salary

FROM role
JOIN department ON role.department_id = department.id;

SELECT
employee.id AS ID,
employee.first_name AS First_Name,
employee.last_name AS Last_Name,
role.title AS Job_Title,
department.department_name AS Department

FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;