# CRUD Angular

Frontend Angular para a API Spring Boot deste projeto.

## Executar no Windows

1. Inicie primeiro o backend Spring Boot na porta `8080`.
2. Nesta pasta, execute:

```powershell
npm install
npm start
```

O frontend abre normalmente em `http://localhost:4200`. O arquivo `proxy.config.js` encaminha chamadas `/api` para `http://localhost:8080`.

A API esperada é `/api/cursos`.
