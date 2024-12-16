
document.querySelector('#logar').addEventListener('click', logar);

function logar(event) {
    event.preventDefault();  

    let email_digitado = document.querySelector('#email').value;  
    let senha_digitada = document.querySelector('#senha').value;  

    
    let loginButton = document.querySelector('#logar');
    loginButton.disabled = true;
    loginButton.innerText = 'Carregando...'; 

    
    fetch('login.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })
        .then((dados) => {
            let login = false;
            let email_salvo = '';  

        
            dados.usuarios.map((informacoes) => {
                if (informacoes.email === email_digitado && informacoes.senha === senha_digitada) {
                    login = true;
                    email_salvo = informacoes.email; 
                }
            });

            if (login) {
                alert('Login efetuado com sucesso!');
                localStorage.setItem('email', email_salvo); 
                window.location.href = '/socrateshome/socrates.html'; 
            } else {
                alert('Usuário ou senha inválidos!');
            }

            
            loginButton.disabled = false;
            loginButton.innerText = 'Entrar';
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Ocorreu um erro. Tente novamente mais tarde.');

            loginButton.disabled = false;
            loginButton.innerText = 'Entrar';
        });
}
