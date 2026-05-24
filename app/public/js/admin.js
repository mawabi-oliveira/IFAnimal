async function checkAuth() {
    const res = await fetch('/api/check-auth');
    const data = await res.json();
    if (data.authenticated) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('panel-section').style.display = 'block';
        document.getElementById('btn-sair-container').style.display = 'block';
        carregarAdocoes();
        carregarGerenciamentoGatos();
    }
}

async function fazerLogin() {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: document.getElementById('userLogin').value,
            password: document.getElementById('passLogin').value
        })
    });
    const data = await res.json();
    if(data.success) {
        location.reload();
    } else {
        Swal.fire('Erro!', 'Usuário ou senha inválidos.', 'error');
    }
}

async function sair() {
    await fetch('/api/logout', { method: 'POST' });
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    const formAddGato = document.getElementById('form-add-gato');
    if(formAddGato) {
        formAddGato.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('nome', document.getElementById('nomeGato').value);
            formData.append('idade', document.getElementById('idadeGato').value);
            formData.append('origem', document.getElementById('origemGato').value);
            formData.append('foto', document.getElementById('fotoGato').files[0]);

            const res = await fetch('/api/gatos', { method: 'POST', body: formData });
            if(res.ok) {
                Swal.fire('Sucesso!', 'Gatinho cadastrado com sucesso!', 'success');
                e.target.reset();
                carregarGerenciamentoGatos();
            } else {
                Swal.fire('Erro!', 'Falha ao cadastrar gatinho.', 'error');
            }
        };
    }
});

async function carregarGerenciamentoGatos() {
    const res = await fetch('/api/admin/gatos');
    const gatos = await res.json();
    const tbody = document.getElementById('lista-gerenciar-gatos');
    tbody.innerHTML = '';
    gatos.forEach(g => {
        tbody.innerHTML += `
            <tr>
                <td>${g.nome}</td>
                <td>${g.idade}</td>
                <td>${g.origem}</td>
                <td><span style="color: ${g.status === 'disponivel' ? 'green' : 'gray'}">${g.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn-acao" style="background-color: #eab308; color: white;" onclick="abrirModalEdicao(${g.id}, '${g.nome}', '${g.idade}', '${g.origem}')">Editar</button>
                </td>
            </tr>
        `;
    });
}

async function abrirModalEdicao(id, nome, idade, origem) {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Informações do Gato',
        html:
            `<input id="swal-nome" class="swal2-input" placeholder="Nome" value="${nome}" maxlength="30">` +
            `<input id="swal-idade" class="swal2-input" placeholder="Idade" value="${idade}" maxlength="15">` +
            `<select id="swal-origem" class="swal2-input">
                <option ${origem === 'IFAnimal' ? 'selected' : ''}>IFAnimal</option>
                <option ${origem === 'Comunidade' ? 'selected' : ''}>Comunidade</option>
             </select>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            return {
                nome: document.getElementById('swal-nome').value,
                idade: document.getElementById('swal-idade').value,
                origem: document.getElementById('swal-origem').value
            }
        }
    });

    if (formValues) {
        const res = await fetch(`/api/gatos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        });
        if(res.ok) {
            Swal.fire('Atualizado!', 'As informações foram atualizadas.', 'success');
            carregarGerenciamentoGatos();
            carregarAdocoes();
        } else {
            Swal.fire('Erro!', 'Não foi possível atualizar.', 'error');
        }
    }
}

async function carregarAdocoes() {
    const res = await fetch('/api/adocoes');
    const adocoes = await res.json();
    const tbody = document.getElementById('lista-adocoes');
    tbody.innerHTML = '';
    adocoes.forEach(a => {
        tbody.innerHTML += `
            <tr>
                <td>${a.gato_nome}</td>
                <td>${a.nome_adotante}</td>
                <td>${a.telefone} <br> ${a.email}</td>
                <td>
                    <button class="btn-acao aprovar" onclick="marcarAdotado(${a.gato_id})">Concluir Adoção</button>
                </td>
            </tr>
        `;
    });
}

async function marcarAdotado(gatoId) {
    await fetch(`/api/gatos/${gatoId}/adotado`, { method: 'PUT' });
    Swal.fire('Concluído!', 'Gato marcado como adotado e removido das listas!', 'success');
    carregarAdocoes();
    carregarGerenciamentoGatos();
}