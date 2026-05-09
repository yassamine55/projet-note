# TODO - Auth Fix (Register/Login)

- [x] Inspect front Login.js / Registre.js and identify API endpoints (/login, /register)
- [x] Inspect back AuthController.php and identify expected Sanctum token behavior
- [x] Inspect back routes/api.php and detect mismatch (inline closures vs AuthController)
- [x] Update back/blogback/routes/api.php to route `/register` and `/login` to `AuthController`
- [x] Run backend and verify register/login flows work
- [ ] If still failing: inspect axios baseURL + check CORS / server logs + validate token usage in AuthContext
