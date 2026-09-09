let requestData =
    JSON.parse(localStorage.getItem("requestData")) || null;
function addField() {
    const container = document.getElementById("fieldsContainer");
    const row = document.createElement("div");
    row.className = "field-row";

    row.innerHTML = `
        <input
            type="text"
            class="field-name"
            placeholder="Field name"
        >

        <select class="field-type">
            <option value="STRING">STRING</option>
            <option value="INTEGER">INTEGER</option>
            <option value="BOOLEAN">BOOLEAN</option>
            <option value="DATE">DATE</option>
            <option value="FLOAT">FLOAT</option>
        </select>

    `;
    container.appendChild(row);
}


function createTable() {
    const tableName =
        document.getElementById("tableName").value;

    const fieldNames =
        document.querySelectorAll(".field-name");

    const fieldTypes =
        document.querySelectorAll(".field-type");


    const fields = {};


    for (let i = 0; i < fieldNames.length; i++) {
        const name = fieldNames[i].value;
        const type = fieldTypes[i].value;
        if (name.trim() !== "") {
            fields[name] = type;
        }
    }


    requestData = {
        tableName: tableName,
        fields: fields
    };

    localStorage.setItem(
        "requestData",
        JSON.stringify(requestData)
    );
    console.log(requestData);


    fetch("http://localhost:3000/table", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to create table");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Table created successfully!");
        document.querySelector(".container").style.display = "none";
        addTableName();
    })
    .catch(error => {
        console.error("Error:", error);
    });

   
}


function closeModal() {

    document.querySelector(".container").style.display = "none";

}

function createModal(){
    document.querySelector(".container").style.display = "flex";
}