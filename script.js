const backendUrl = "http://localhost:8090/deloitte-jax-rs-demo/employees";

function viewAllEmployees() {
    fetch(backendUrl)
        .then(response => response.json())
        .then(data => {
            let html = "<table class='table table-bordered'><tr><th>ID</th><th>Name</th><th>Salary</th></tr>";
            data.forEach(employee => {
                html += `<tr><td>${employee.id}</td><td>${employee.firstName}</td><td>${employee.salary}</td></tr>`;
            });
            html += "</table>";
            document.getElementById("employeeList").innerHTML = html;
        })
        .catch(error => console.error('Error:', error));
}

function addEmployee() {

    const firstName = document.getElementById("addFirstName").value;
    const salary = document.getElementById("addSalary").value;

    const employee = {

        firstName: firstName,
        salary: salary
    };

    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("addResult").innerText = "Employee added successfully!";
            viewAllEmployees();  
        })
        .catch(error => console.error('Error:', error));
}

function viewEmployeeById() {
    const employeeId = document.getElementById("viewEmployeeId").value;
    fetch(`${backendUrl}/${employeeId}`)
        .then(response => response.json())
        .then(employee => {
            let html = `<table class='table table-bordered'>
                          <tr><th>ID</th><th>Name</th><th>Salary</th></tr>
                          <tr><td>${employee.id}</td><td>${employee.firstName}</td><td>${employee.salary}</td></tr>
                        </table>`;
            document.getElementById("viewEmployeeResult").innerHTML = html;
        })
        .catch(error => console.error('Error:', error));
}


function updateEmployee() {
    const employeeId = document.getElementById("updateEmployeeId").value;
    const firstName = document.getElementById("updateFirstName").value;
    const salary = document.getElementById("updateSalary").value;

    const employee = {
        id: employeeId,
        firstName: firstName,
        salary: salary
    };

    fetch(`${backendUrl}/${employeeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("updateResult").innerText = "Employee updated successfully!";
        viewAllEmployees();  // Refresh the employee list
    })
    .catch(error => console.error('Error:', error));
}


function deleteEmployee() {
    const employeeId = document.getElementById("deleteEmployeeId").value;

    fetch(`${backendUrl}/${employeeId}`, {
        method: 'DELETE',
    })
    .then(() => {
        document.getElementById("deleteResult").innerText = "Employee deleted successfully!";
        viewAllEmployees();  // Refresh the employee list
    })
    .catch(error => console.error('Error:', error));
}

