function addTableName() {

    const name =
        document.querySelector(".tableName-bold");

        name.innerHTML = requestData.tableName;;

        name.addEventListener("click",()=>{
            const value = document.querySelector('#recordsHead');
            value.innerHTML = "";
            for (const fieldName in requestData.fields) {
                const th = document.createElement("th");
                th.textContent = fieldName;
                value.appendChild(th);
            }
      })
    

    insertTableValue();
}


function insertTableValue() {

    const div =
        document.createElement("div");

    const button =
        document.createElement("button");

    button.innerHTML = "Insert record";

    button.className = "insert";

    div.appendChild(button);

    document
        .querySelector(".tableName-bold")
        .appendChild(div);


    button.addEventListener("click", () => {

        openInsertModal();

    });
}


function openInsertModal() {

    const container =
        document.getElementById("insertFieldsContainer");

    container.innerHTML = "";


    for (const fieldName in requestData.fields) {

        const fieldType =
            requestData.fields[fieldName];

        const input =
            document.createElement("input");

        input.type =
            getInputType(fieldType);

        input.className =
            "insertUser";

        input.placeholder =
            fieldName;

        input.dataset.fieldName =
            fieldName;

        container.appendChild(input);
    }


    document.querySelector(".insertContainer")
        .style.display = "flex";
}


function getInputType(type) {

    switch (type) {

        case "INTEGER":
        case "FLOAT":
            return "number";

        case "DATE":
            return "date";

        case "BOOLEAN":
            return "checkbox";

        default:
            return "text";
    }
}


function insertRecord() {
    const inputs =
        document.querySelectorAll(
            "#insertFieldsContainer input"
        );
    const data = {};
    inputs.forEach(input => {
        const fieldName =
            input.dataset.fieldName;
        if (input.type === "checkbox") {
            data[fieldName] =
                input.checked;
        } else {
            data[fieldName] =
                input.value;

        }
    });
    console.log(data);
    fetch("http://localhost:3000/insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tableName:
                requestData.tableName,
                fields: requestData.fields,
            data: data
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to insert record");
        }
        return response.json();
    })
    .then(result => {

        console.log(result);
        closeInsertModal();
        fetchRecords();

    })
    .catch(error => {

        console.error("Insert error:", error);

    });
}







function displayRecords(records) {

    const head =
        document.getElementById("recordsHead");
    const body =
        document.getElementById("recordsBody");
    head.innerHTML = "";
    body.innerHTML = "";
    if (records.length === 0) {
        return;
    }
    const columns =
        Object.keys(records[0]);
    const headerRow =
        document.createElement("tr");


    columns.forEach(column => {
        const th =
            document.createElement("th");
        th.innerText = column;
        headerRow.appendChild(th);
    });


    const deleteTh =
        document.createElement("th");
    deleteTh.innerText = "Action";
    headerRow.appendChild(deleteTh);
    head.appendChild(headerRow);
    records.forEach(record => {
        const row =
            document.createElement("tr");
        columns.forEach(column => {
            const td =
                document.createElement("td");
            td.innerText =
                record[column];
            row.appendChild(td);
        });

        const actionTd =
            document.createElement("td");
        const deleteButton =
            document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className =
            "delete-btn";
        deleteButton.addEventListener("click", () => {
            deleteRecord(record.id);
        });
        actionTd.appendChild(deleteButton);
        row.appendChild(actionTd);
        body.appendChild(row);

    });
}


function fetchRecords() {

    fetch(`http://localhost:3000/records/${requestData.tableName}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch records");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayRecords(data.records);
    })
    .catch(error => {
        console.error(error.message);
    });
}


function closeInsertModal(){
    document.querySelector('.insertContainer').style.display = 'none';
}


function deleteRecord(id) {

    fetch(`http://localhost:3000/records/${requestData.tableName}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete record");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        fetchRecords();
    })
    .catch(error => {
        console.error("Delete error:", error);
    });
}



document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM loaded");
    if (!requestData) {
        console.log("No table selected");
        return;
    }

    addTableName();
    fetchRecords();

});

