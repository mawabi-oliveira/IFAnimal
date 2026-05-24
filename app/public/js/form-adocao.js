document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const gatoId = params.get('id');
    document.getElementById('nome-gato-display').innerText = params.get('nome');

    // === MÁSCARA RIGOROSA DE TELEFONE ===
    const telInput = document.getElementById('telefoneAdotante');
    telInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); 
        if (value.length > 11) value = value.slice(0, 11); 
        
        if (value.length > 2) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        }
        if (value.length > 10) {
            value = value.substring(0, 10) + '-' + value.substring(10);
        }
        e.target.value = value;
    });

    document.getElementById('form-adocao-user').onsubmit = async (e) => {
        e.preventDefault();
        
        // Verifica se o telefone tem o tamanho mínimo
        if (telInput.value.length < 14) {
            Swal.fire('Erro!', 'Digite um número de telefone válido com DDD.', 'warning');
            return;
        }

        Swal.fire({
            title: 'Enviando pedido...',
            html: 'Aguarde um momento.',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        const res = await fetch('/api/adotar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gato_id: gatoId,
                nome_adotante: document.getElementById('nomeAdotante').value,
                telefone: document.getElementById('telefoneAdotante').value,
                email: document.getElementById('emailAdotante').value
            })
        });

        if(res.ok) {
            Swal.fire({
                title: 'Sucesso!',
                text: 'Pedido enviado com sucesso! Aguarde nosso contato.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => { window.location.href = '/views/adotar.html'; });
        } else {
            Swal.fire('Erro!', 'Não foi possível processar o envio do formulário.', 'error');
        }
    };
});