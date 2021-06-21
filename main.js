var students = []

const fillTable = () => {
    let table = "";

    if(students.length > 0){
        for(let i = 0; i < students.length; i++){
            table += `
            <tr>
                <td>${ i + 1 }</td>
                <td>${ students[i].name }</td>
                <td>${ students[i].email }</td>
                <td>${ students[i].card }</td>
                <td>
                    <button class="btn btn-sm btn-info">Ver</button>
                    <button class="btn btn-sm btn-primary">Modificar</button>
                    <button class="btn btn-sm btn-danger">Eliminar</button>
                </td>
            </tr>
            `;
        }
    } else {
        table += `
            <tr class="text-center">
                <td colspan="5">No hay estudiantes para mostrar</td>
            </tr>
        `;
    }
    $(".table > tbody").html(table);
};

const loadData = () => {
    if(typeof(Storage) !== "undefined"){
        if(localStorage.listStudents){
            students = JSON.parse(localStorage.listStudents);
        }
        fillTable();
    } else {
        alert("Tu navegador no soporta almacenamiento en el navegador web.");
    }
};