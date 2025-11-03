
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('show');
}

function sectionScroll(sectionId) {
    
    const section = document.getElementById(sectionId);
    
    if (!section) return;

    const headerHeight = 70;
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({top: sectionPosition, behavior:"smooth"});

    const menu = document.getElementById('navMenu');
    menu.classList.remove('show');
}

function handleThemeToggle() {
    const body = document.body;
    const toggleBtn = document.getElementById("themeToggle");
    
    body.classList.toggle("dark-theme");
    const isDark = body.classList.contains("dark-theme");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

function setupThemeToggle() {
    const toggleBtn = document.getElementById("themeToggle");
    const body = document.body;

    if (!toggleBtn) return; 

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-theme");
        toggleBtn.textContent = "☀️";
    } else {
        body.classList.remove("dark-theme");
        toggleBtn.textContent = "🌙";
    }

    
    toggleBtn.removeEventListener("click", handleThemeToggle); 
    toggleBtn.addEventListener("click", handleThemeToggle);
}


function isCpfLengthValid(cpf) {
  
    cpf = cpf.replace(/[^\d]/g, ""); 
  
     if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }
   
    
    return true; 
}


function isAgeValid(form) {
    const dataNascimentoInput = form.dataNascimento.value;
    const dataNascimento = new Date(dataNascimentoInput);
    const idadeMinima = 18;
    const hoje = new Date();
    
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    if (idade < idadeMinima) {
        alert(`Erro: Você precisa ter pelo menos ${idadeMinima} anos para se cadastrar.`);
        form.dataNascimento.focus();
        return false;
    }

    return true; 
}

function validateForm(form) {
    const cpfInput = form.cpf;
    if (!isCpfLengthValid(cpfInput.value)) {
        alert("Erro: O número do CPF é inválido (deve conter 11 dígitos). Verifique o preenchimento.");
        cpfInput.focus();
        return false;
    }
    if (!isAgeValid(form)) {
        return false;
    }
    return true;
}

function renderCadastroTemplate(cadastro) {
    return `
        <div class="card">
            <h3>${cadastro.nome}</h3>
            <p>Email: ${cadastro.email}</p>
            <p>CPF: ${cadastro.cpf}</p>
            <p>Telefone: ${cadastro.telefone}</p>
            <p>Endereço: ${cadastro.endereco} - ${cadastro.estado}</p>
            <p>Interesse: ${cadastro.interesses}</p>
            <p class="data-cadastro">Cadastrado em: ${cadastro.dataCadastro}</p>
        </div>
    `;
}

function listarCadastros() {
    const main = document.querySelector('main');
    
    main.innerHTML = '<article class="cadastro-list-section"><h1>Lista de Cadastros</h1><div id="cadastroLista" class="card-container"></div></article>'; 
    
    const lista = document.querySelector("#cadastroLista");
    if (lista) {
        const dados = JSON.parse(localStorage.getItem("cadastro") || "[]");
        
        if (dados.length > 0) {
            lista.innerHTML = dados.map(renderCadastroTemplate).join("");
        } else {
            lista.innerHTML = '<p>Nenhum cadastro encontrado. Cadastre-se na seção Cadastro!</p>';
        }
    }
}

function handleSubmit(event){
    event.preventDefault();

    const form = document.getElementById('cadastro');

    if (!validateForm(form)) {
        return; 
    }
    
    const formData ={
        nome: form.nome.value, 
        cpf: form.cpf.value,
        email: form.email.value,
        telefone: form.telefone.value,
        dataNascimento: form.dataNascimento.value, 
        endereco: form.endereco.value,
        cep: form.cep.value,
        estado: form.estado.value,
        interesses: form.interesses.value,
        dataCadastro: new Date().toLocaleDateString()
    }

    let cadastro = JSON.parse(localStorage.getItem('cadastro') || '[]');
    cadastro.push(formData);
    localStorage.setItem('cadastro', JSON.stringify(cadastro));

    const sucessMessage = document.getElementById('sucessMessage');
    sucessMessage.classList.add('show');
    sucessMessage.scrollIntoView({behavior: 'smooth' , block:'center'});

     form.reset();
}

async function loadPage(pageName) {
    const main = document.querySelector("main");
    
    if (pageName === 'listacadastros') { 
        listarCadastros();
        history.pushState(null, '', `/listacadastros`); 
        return;
    }

    try {
        const response = await fetch(`${pageName}.html`); 
        if (!response.ok) throw new Error('Página não encontrada.');

        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMainContent = doc.querySelector('main').innerHTML;

        main.innerHTML = newMainContent;
        
        history.pushState(null, '', `/${pageName}.html`); 

        attachFormListeners(); 

    } catch (error) {
        main.innerHTML = `<h1>Erro ao carregar a página.</h1><p>Verifique se o arquivo ${pageName}.html existe.</p>`;
        console.error("Erro ao carregar a página:", error);
    }
}

function setupSpaNavigation() {
 
    document.body.addEventListener('click', (event) => {
    const link = event.target.closest('a');
        
        if (link && link.getAttribute('href') && !link.hasAttribute('target')) {
            const href = link.getAttribute('href');
            

            if (href.endsWith('.html')) {
                event.preventDefault();                 
            
                const pageName = href.split('/').pop().replace('.html', '');
                
                loadPage(pageName);
            }
               window.addEventListener('popstate' )
        }
    });
    
    
    window.addEventListener('popstate', () => {
         const path = window.location.pathname.split('/').pop();
         const pageName = path.replace('.html', '') || 'index';
    
    });
}

function attachFormListeners() {
    const cadastroForm = document.getElementById('cadastro');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleSubmit);
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    const menuToggleBtn = document.querySelector('.dropdown-btn');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleMenu);
    }

    attachFormListeners();

    
    setupThemeToggle();
})

window.addEventListener('popstate', () => {
    const path = window.location.pathname.split('/').pop();
    const pageName = path.replace('.html', '') || 'index';
  
    
     loadPage(pageName)
});