// Vercel Serverless Function: valida o código de acesso no servidor.
// Configure na Vercel (Settings > Environment Variables):
//   CODES_NORMAL    = CODIGO1,CODIGO2
//   CODES_PROIBIDA  = CODIGOA,CODIGOB
const hits = new Map();
const list = (v) => (v || "").split(",").map((x) => x.trim().toUpperCase()).filter(Boolean);

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "x";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
  recent.push(now);
  hits.set(ip, recent);
  if (recent.length > 10) return res.status(429).json({ ok: false });

  const { kind, code } = req.body || {};
  const env = kind === "normal" ? process.env.CODES_NORMAL : kind === "proibida" ? process.env.CODES_PROIBIDA : "";
  const ok = typeof code === "string" && code.length <= 64 && list(env).includes(code.trim().toUpperCase());
  res.status(ok ? 200 : 401).json({ ok });
};
