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
    const id = document.getElementById("addId").value;
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
            viewAllEmployees();  // Refresh the employee list
        })
        .catch(error => console.error('Error:', error));
}
