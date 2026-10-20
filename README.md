# Amigos.sensei – deploy na Vercel

1. Suba esta pasta num repositório (GitHub) e importe na Vercel (Framework: "Other", sem build).
2. Em Settings > Environment Variables crie:
   - CODES_NORMAL   = CODIGO1,CODIGO2
   - CODES_PROIBIDA = CODIGOA,CODIGOB
3. Em index.html, no objeto CONFIG, cole seus links de pagamento em `payUrl` e ajuste `price`.
4. Faça o redeploy.

Os códigos ficam só no servidor (api/validate.js). O desbloqueio no aparelho é guardado em localStorage.
