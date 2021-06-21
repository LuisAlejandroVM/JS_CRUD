var estudiantes = [];
var matriculaModificar;

var dName = document.getElementById("nombre");
var dLastname = document.getElementById("apellidos");
var dEmail = document.getElementById("email");
var dPhone = document.getElementById("telefono");
var dDay = document.getElementById("diaNac");
var dMonth = document.getElementById("mesNac");
var dYear = document.getElementById("anioNac");
var dCard = document.getElementById("matricula");

var titulo = $("#titulo");
var modal = $('#addStudent');
var formularioEstudiante = $("#formStudent");

var btnGuardar = $("#btnGuardar");
var btnAgregar = $("#btnAgregar");

const llenarTabla = () => {
	let table = "";
	
	if(estudiantes.length > 0){
		for(let i = 0; i < estudiantes.length; i++) {
			table += `
			<tr data-matricula="${estudiantes[i].matricula}">
				<td>${ i + 1 }</td>
				<td>${estudiantes[i].nombre} ${estudiantes[i].apellidos}</td>
				<td>${estudiantes[i].email}</td>
				<td>${estudiantes[i].matricula}</td>
				<td>
					<button type="button" class="btn btn-info ver" data-bs-toggle="modal" data-bs-target="#addStudent">Ver</button>
					<button type="button" class="btn btn-primary modificar" data-bs-toggle="modal" data-bs-target="#addStudent">Modificar</button>
					<button type="button" class="btn btn-danger eliminar">Eliminar</button>
				</td>
			</tr>
			`;
		}
	}else{
		table = `
		<tr class="text-center">
			<td colspan="5">No hay estudiantes para mostrar</td>
		</tr>
		`;
	}
	$(".tabla-estudiantes > tbody").html(table);
};

const cargarDatos = () => {
	if (typeof(Storage) !== "undefined") {
		if(!localStorage.listaEstudiantes){
			localStorage.listaEstudiantes = JSON.stringify([]);
		}

		estudiantes = JSON.parse(localStorage.listaEstudiantes);
		llenarTabla();
	} else {
		alert("Tu navegador no soporta almacenamiento en el navegador Web.");
	}
};

const guardarDatosEstudiante = () => {
	let estudiante = new Object();
	estudiante.fechaNacimiento = new Object();

	estudiante.nombre = dName.value;
	estudiante.apellidos = dLastname.value;
	estudiante.email = dEmail.value;
	estudiante.telefono = dPhone.value;
	
	estudiante.fechaNacimiento.dia = colocarCeros(dDay.value);
	estudiante.fechaNacimiento.mes = colocarCeros(dMonth.value);
	estudiante.fechaNacimiento.anio = dYear.value;

	estudiante.sexo = document.querySelector("input[name=sexo]:checked").value;
	estudiante.matricula = dCard.value;

	estudiantes.push(estudiante);
	localStorage.listaEstudiantes = JSON.stringify(estudiantes);

	return true;
}

const modificarDatosEstudiante = () => {
	let matricula = $("#matricula").val();
	let res = "Error";

	if(confirm(`¿Estás seguro(a) de modificar al estudiante con matrícula ${matricula}?`)){
		for (let i = 0; i < estudiantes.length; i++) {
			if(estudiantes[i].matricula === matriculaModificar){
				estudiantes[i].nombre = dName.value;
				estudiantes[i].apellidos = dLastname.value;
				estudiantes[i].email = dEmail.value;
				estudiantes[i].telefono = dPhone.value;
				estudiantes[i].fechaNacimiento.dia = colocarCeros(dDay.value);
				estudiantes[i].fechaNacimiento.mes = colocarCeros(dMonth.value);
				estudiantes[i].fechaNacimiento.anio = dYear.value;
				estudiantes[i].sexo = document.querySelector("input[name=sexo]:checked").value;
				estudiantes[i].matricula = dCard.value;
				res = "Agregado";
			}
		}
	}else{
		res = "Cancelado";
	}

	localStorage.listaEstudiantes = JSON.stringify(estudiantes);
	return res;
}

const eliminarEstudiante = (matricula) => {
	let flag = false;

	for(let i = 0; i < estudiantes.length; i++) {
		if(estudiantes[i].matricula === matricula){
			estudiantes.splice(i, 1);
			flag = true;
			break;
		}
	}

	localStorage.listaEstudiantes = JSON.stringify(estudiantes);
	return flag;
}

const copiarDatosFormulario = (matricula) => {
	for(let i = 0; i < estudiantes.length; i++) {
		if(estudiantes[i].matricula === matricula){
			dName.value = estudiantes[i].nombre;
			dLastname.value = estudiantes[i].apellidos;
			dEmail.value = estudiantes[i].email;
			dPhone.value = estudiantes[i].telefono;
			dDay.value = parseInt(estudiantes[i].fechaNacimiento.dia);
			dMonth.value = parseInt(estudiantes[i].fechaNacimiento.mes);
			dYear.value = parseInt(estudiantes[i].fechaNacimiento.anio);
			$('input:radio[name="sexo"]').removeAttr('checked');
			$('input:radio[name="sexo"]').filter(`[value="${estudiantes[i].sexo.toLowerCase()}"]`).attr('checked', true);
			dCard.value = estudiantes[i].matricula;
			break;
		}
	}

	return true;	
}

const mostrarOcultarCampos = () => {
	if(titulo.text().indexOf("Información") === -1){
		$("#nombre").removeAttr("disabled");
		$("#apellidos").removeAttr("disabled");
		$("#email").removeAttr("disabled");
		$("#telefono").removeAttr("disabled");
		$("#diaNac").removeAttr("disabled");
		$("#mesNac").removeAttr("disabled");
		$("#anioNac").removeAttr("disabled");
		$("input[name=sexo]").removeAttr("disabled");
	}else{
		$("#nombre").attr("disabled", "disabled");
		$("#apellidos").attr("disabled", "disabled");
		$("#email").attr("disabled", "disabled");
		$("#telefono").attr("disabled", "disabled");
		$("#diaNac").attr("disabled", "disabled");
		$("#mesNac").attr("disabled", "disabled");
		$("#anioNac").attr("disabled", "disabled");
		$("input[name=sexo]").attr("disabled", "disabled");
	}
}

$(document).ready(function(){
	btnGuardar.attr("disabled","disabled");

	$("form").on("change", function(){
		validarFormulario();
	});

	btnAgregar.click(function(){
		if(guardarDatosEstudiante()){
			showAlert("¡Éxito!", "Estudiante agregado correctamente.");
		}else{
			showAlert("¡Error!", "Error al guardar estudiante");
		}
		modal.modal('hide');
		llenarTabla();
	});

	btnGuardar.click(function(){
		let modificar = modificarDatosEstudiante();

		if(modificar === "Agregado"){
			modal.modal('hide');
			showAlert("¡Éxito!", "Estudiante modificado correctamente.");
		}else if(modificar === "Error"){
			showAlert("¡Error!", "Error al modificar estudiante");
		}
		llenarTabla();
	});

	$("#agregar").click(function(){
		btnAgregar.show();
		btnGuardar.hide();
		limpiarFormulario(formularioEstudiante);
		titulo.text("Registro de estudiantes");
		mostrarOcultarCampos();
	});

	$(document).on("click", ".ver, .modificar", function(){
		let botonTexto = $(this).text();
		let matricula = $(this).parent().parent().data("matricula");
		matriculaModificar =  matricula;
		
		btnAgregar.hide();
		if(botonTexto === "Modificar"){
			btnGuardar.show();
			btnGuardar.text("Modificar");
			titulo.text("Modificar estudiante con matrícula " + matricula);
		}else{
			btnGuardar.hide();
			titulo.text("Información del estudiante con matrícula " + matricula);				
		}
		mostrarOcultarCampos();
		
		if(copiarDatosFormulario(matricula)){
			if(validarFormulario()){
				btnGuardar.removeAttr("disabled");
			}
		}
	});

	$(document).on("click",".eliminar",function(){
		let matricula = $(this).parent().parent().data("matricula");
		let confirmarEliminar = confirm(`¿Estás seguro de eliminar al estudiante con la matrícula ${matricula}?`);

		if(confirmarEliminar){
			$(this).parent().parent().remove();			
			if(eliminarEstudiante(matricula)){
				showAlert("¡Éxito!", `Estudiante con matrícula ${matricula} eliminado correctamente.`);
			}else{
				showAlert("¡Error!", "No se pudo eliminar al estudiante.");
			}
		}
	});
});