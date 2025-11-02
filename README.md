# Dashboard Financeiro - Front End Jr

Bem-vindo ao **Dashboard Financeiro**, desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor(a) Front End Jr na Innovev.

Este projeto permite aos usuários visualizar e analisar suas transações financeiras de forma intuitiva, com recursos interativos, gráficos e filtros.

---

## 🎯 Funcionalidades

* Página de **Login** e Dashboard protegida.
* **Filtros dinâmicos**: datas, contas, indústrias e estado.
* **Cards resumidos** de receitas, despesas, transações pendentes e saldo total.
* **Gráficos interativos**:

  * Gráfico de barras empilhadas
  * Gráfico de linhas
* **Sidebar** exclusiva na Dashboard com opções de Logout e Home.
* **Persistência de sessão** e filtros usando `localStorage`.
* **Design responsivo** utilizando TailwindCSS.
* Desenvolvido com **React + TypeScript**.

## 🛠 Tecnologias e Dependências

### Dependências principais

* `react`, `react-dom`, `react-router-dom` – Navegação e SPA.
* `@mui/material`, `@mui/icons-material`, `@emotion/styled` – Componentes e estilização.
* `recharts` – Criação de gráficos interativos.
* `date-fns` – Manipulação de datas.

### Dependências de desenvolvimento

* `vite` – Build e bundling.
* `typescript` – Tipagem estática.
* `tailwindcss` – Estilização rápida e responsiva.
* `eslint`, `@eslint/js`, `eslint-plugin-react-hooks` – Linting.
* `postcss`, `autoprefixer` – Processamento de CSS.

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <https://github.com/juliafclima/dashboard>
```

2. Entre na pasta do projeto:

```bash
cd dashboard
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o projeto:

```bash
npm run dev
```

5. Abra o navegador em `http://localhost:5173` (ou porta indicada no terminal).

---

## 🗂 Estrutura de Pastas

```
src/
│
├─ assets/        # Imagens e ícones
├─ components/    # Componentes reutilizáveis
├─ context/       # Contextos para gerenciamento de estado global
├─ hooks/         # Hooks customizados
├─ pages/         # Páginas da aplicação: Login e Dashboard
├─ router/        # Configuração de rotas e navegação
├─ types/         # Tipagens TypeScript
└─ utils/         # Funções utilitárias 

```

---

## ⚡ Observações

* Os dados utilizados estão no arquivo `transactions.json` e **não foram alterados**.
* Todo o estado do filtro e preferências do usuário é armazenado no `localStorage`.
* Testado em resoluções desktop e mobile (design responsivo).

---

## 🔗 Deploy


```
https://dashboard-psi-two-85.vercel.app/
```

---

## 🎥 Demonstração

* Vídeo de demonstração da aplicação (até 5 minutos) gravado via Loom.

https://www.loom.com/share/a726471cd5c64ee9b57e946a12200b07

---

## 📸 Imagens

![Login](./screenshot-1762042692890.png)
![Dashboard](./Captura%20de%20tela_1-11-2025_211844_dashboard-psi-two-85.vercel.app.jpeg)


