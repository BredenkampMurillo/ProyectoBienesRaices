document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContacto');

    form.addEventListener('submit', function(event) {
        // Prevenir el comportamiento por defecto del formulario
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;

        if (nombre && correo && mensaje) {
            // Mensaje de éxito usando SweetAlert
            Swal.fire({
                title: '¡Mensaje Enviado!',
                text: 'Gracias, ' + nombre + '. Hemos recibido tu mensaje.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Enviar el formulario de manera programada
                form.submit();
            });

        } else {
            // En caso de error (aunque no debería ocurrir debido a los campos required)
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos antes de enviar el mensaje.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});

function calculateAge() {
    const dobInput = document.getElementById('dob');
    const dob = new Date(dobInput.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    
    // Ajuste si no ha llegado el cumpleaños este año
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    // Asignar la edad al campo oculto
    document.getElementById('age').value = age;
}
