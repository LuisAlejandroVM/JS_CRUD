var toastHeader = document.getElementById("toastHeader");
var toastBody = document.getElementById("toastBody");

const validarNombres = () => {
	let flag = false;
	let inputName = document.getElementById('nombre');

	if(inputName.value === ""){
		document.getElementById('desc-nombre').innerHTML = "Campo requerido.";
		inputName.classList.add("is-invalid");
	}else{
		document.getElementById('desc-nombre').innerHTML = "";
		inputName.classList.remove("is-invalid");
		flag = true;
	}

	return flag;
};

const validarApellidos = () => {
	let flag = false;
	let inputLastname = document.getElementById('apellidos');

	if(inputLastname.value === ""){
		document.getElementById('desc-apellidos').innerHTML = "Campo requerido.";
		inputLastname.classList.add("is-invalid");
	}else{
		document.getElementById('desc-apellidos').innerHTML = "";
		inputLastname.classList.remove("is-invalid");
		flag = true;
	}

	return flag;	
};

const validarCorreoElectronico = () => {
	let flag = false;
	let inputEmail = document.getElementById("email");

	if(inputEmail){
		inputEmail.value = inputEmail.value.toLowerCase();
		let patron =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

		if(inputEmail.value.match(patron)){
			document.getElementById("desc-email").innerHTML = "";
			inputEmail.classList.remove("is-invalid");
			flag = true;	
		}else{
			document.getElementById("desc-email").innerHTML = "Debes introducir un correo electrónico válido.";
			inputEmail.classList.add("is-invalid");
		}
	}

	return flag;
};

const validarTelefono = () => {
	let flag1 = false;
	let flag2 = false;
	let telefono = document.getElementById("telefono");
	telefono.value = telefono.value.replace(" ", "").replace("-", "");

	if(!isNaN(telefono.value)){
		document.getElementById("desc-telefono").innerHTML = "";
		telefono.classList.remove("is-invalid");
		flag2 = true;

		if(telefono.value.length === 7 || telefono.value.length === 10){
			document.getElementById("desc-telefono").innerHTML = "";
			telefono.classList.remove("is-invalid");
			flag1 = true;
		}else{
			document.getElementById("desc-telefono").innerHTML = "El número de teléfono debe tener de 7 a 10 dígitos";
			telefono.classList.add("is-invalid");
		}
	}else{
		document.getElementById("desc-telefono").innerHTML = "El número de teléfono sólo debe contener números";
		telefono.classList.add("is-invalid");
	}

	return flag1 && flag2;
};

const validarFechaNacimiento = () => {
	var flag = false;
	var dia = document.getElementById("diaNac");
	var mes = document.getElementById("mesNac");
	var anio = document.getElementById("anioNac");

	if(dia.selectedIndex === 0){ dia.classList.add("is-invalid"); } else { dia.classList.remove("is-invalid"); }
	if(mes.selectedIndex === 0){ mes.classList.add("is-invalid"); } else { mes.classList.remove("is-invalid"); }
	if(anio.selectedIndex === 0){ anio.classList.add("is-invalid"); } else { anio.classList.remove("is-invalid"); }

	if(dia.selectedIndex === 0 || mes.selectedIndex === 0 || anio.selectedIndex === 0){
		document.getElementById("desc-fecha").innerHTML = "Debes introducir una fecha de nacimiento.";
	}else{
		document.getElementById("desc-fecha").innerHTML = "";
		flag = true;
	}

	return flag;
};

const validarSexo = () => {
	var respuesta = false;
	var sexo = document.querySelector("input[name=sexo]:checked");
	if(sexo){
		if(sexo.value === null){
			document.getElementById("desc-sexo").innerHTML = "Sebes seleccionar el sexo";
		}else{
			document.getElementById("desc-sexo").innerHTML = "";
			respuesta = true;
		}
	}

	return respuesta;
};

const generarMatricula = () => {
	let nombre = document.getElementById("nombre").value;
	let apellidos = document.getElementById("apellidos").value;
	let dia = document.getElementById("diaNac").value;
	let mes = document.getElementById("mesNac").value;
	let anio = document.getElementById("anioNac").value;
	let sexo = document.querySelector("input[name=sexo]:checked").value;

	let matricula = nombre.substring(0, 2) + apellidos.substring(0, 2) + anio.substring(2,4) + colocarCeros(mes) + colocarCeros(dia) + sexo.substring(0, 1);
	document.getElementById("matricula").value = matricula.toUpperCase();
};

const validarFormulario = () => {
	let flag = false;
	let btnGuardar = $("#btnGuardar");

	if(validarNombres() && validarApellidos() && validarCorreoElectronico() && validarTelefono() && validarFechaNacimiento() && validarSexo()){
		generarMatricula();
		btnGuardar.removeAttr("disabled");
		flag = true;
	}else{
		btnGuardar.attr("disabled", "disabled");
	}

	return flag;
};

const showAlert = (header, body) => {
    toastHeader.innerHTML = header;
    toastBody.innerHTML = body;
    $('.toast').toast('show');
};

const colocarCeros = (n) => {
	return (parseInt(n) < 10)? "0" + n : n ;
}

const limpiarFormulario = () => {
	document.getElementById("formStudent").reset(); 
}