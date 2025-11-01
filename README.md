# 🌐 Projeto Web - SPA com Validação de Formulários e Modo Escuro  

Este projeto foi desenvolvido como parte dos estudos em **Desenvolvimento Front-End**, com foco em **Single Page Application (SPA)**, **validação de formulários**, **modo escuro**, e **interação dinâmica com o usuário** usando **HTML5, CSS3 e JavaScript** puro.  

---

## 🧠 Objetivo do Projeto  

Criar uma aplicação web de página única (SPA) capaz de:  
- Navegar entre seções sem recarregar a página (sistema SPA);  
- Realizar validação de dados do formulário (CPF, idade, telefone e CEP);  
- Exibir mensagens de alerta ou sucesso conforme a entrada do usuário;  
- Buscar automaticamente o endereço a partir do CEP (ViaCEP API);  
- Alternar entre **modo claro e escuro**, com preferência salva no navegador;  
- Renderizar conteúdo dinâmico com **templates JavaScript**.

---

## 🧩 Funcionalidades Principais  

### 🌙 Modo Escuro / Claro  
- Alternância de tema com transição suave;  
- Salvamento automático da preferência no `localStorage`;  
- Ícone interativo no botão (`☀️` / `🌙`).  

### 🧾 Validação de Formulário  
- **CPF:** verificação completa com cálculo dos dígitos verificadores;  
- **Telefone:** checagem de formato e tamanho;  
- **Data de nascimento:** bloqueio de menores de 18 anos;  
- **CEP:** busca automática de endereço via [ViaCEP API](https://viacep.com.br/).  

### 🧠 Sistema SPA  
- Carregamento dinâmico de páginas HTML via `fetch()`;  
- Transição suave entre seções sem recarregar o site;  
- Estrutura modular e reutilizável.  

### 🧱 Templates JS  
- Geração dinâmica de elementos (ex: cartões de cadastro) com base nos dados armazenados no `localStorage`.  

---

## 🛠️ Tecnologias Utilizadas  

| Tecnologia | Descrição |
|-------------|------------|
| **HTML5** | Estrutura semântica da aplicação |
| **CSS3** | Estilos, layout responsivo e modo escuro |
| **JavaScript (ES6)** | Lógica, validação e manipulação de DOM |
| **LocalStorage API** | Armazenamento local dos cadastros |
| **Fetch API** | Comunicação com a API ViaCEP |
| **Git & GitHub** | Controle de versão e publicação |

---

## 🚀 Como Executar o Projeto  

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/priscilamac2023/aula_DesenvolvimentoWeb
