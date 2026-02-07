export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === "/Puter") {
      return new Response(`<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Puter AI — Chat Demo</title>
<style>
:root{--bg:#0f1724;--card:#0b1220;--muted:#94a3b8;--accent:#7c3aed;--bubble-user:#1e293b;--bubble-bot:#0b1220}
*{box-sizing:border-box;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial}
html,body{height:100%;margin:0;background:linear-gradient(180deg,#041025 0%,#071428 100%);color:#e6eef8}
.app{max-width:880px;margin:28px auto;padding:20px;border-radius:12px;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent);box-shadow:0 8px 30px rgba(2,6,23,0.6)}
.header{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.logo{width:56px;height:56px;border-radius:10px;background:linear-gradient(135deg,var(--accent),#2dd4bf);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:20px}
.title{font-size:18px;font-weight:700}
.controls{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}
.select,textarea,input,button{background:transparent;border:1px solid rgba(255,255,255,0.06);color:inherit;padding:10px;border-radius:8px}
.model-select{min-width:260px}
.top-row{display:flex;justify-content:space-between;align-items:center;gap:12px}
.chat{height:520px;overflow:auto;padding:18px;border-radius:10px;background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00));border:1px solid rgba(255,255,255,0.02)}
.message{max-width:78%;padding:12px 14px;border-radius:10px;margin-bottom:12px;white-space:pre-wrap;word-break:break-word}
.user{margin-left:auto;background:linear-gradient(180deg,var(--bubble-user),#0f1724);border:1px solid rgba(255,255,255,0.03)}
.bot{background:linear-gradient(180deg,var(--bubble-bot),#071428);border:1px solid rgba(255,255,255,0.02)}
.controls-row{display:flex;gap:8px;align-items:center;margin-top:12px}
.prompt{flex:1;min-height:48px;max-height:160px;resize:vertical}
.send{background:linear-gradient(90deg,var(--accent),#06b6d4);border:0;color:#021124;padding:12px 16px;font-weight:600;cursor:pointer}
.small{font-size:13px;color:var(--muted)}
.toolbar{display:flex;gap:8px}
.badge{font-size:12px;padding:6px 8px;border-radius:999px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.03)}
.actions{display:flex;gap:8px}
.code{background:#010417;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);overflow:auto;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,monospace;font-size:13px}
.empty{opacity:.6;text-align:center;padding:60px 12px}
.footer{display:flex;justify-content:space-between;align-items:center;margin-top:12px;color:var(--muted);font-size:13px}
.icon{width:18px;height:18px;display:inline-block;vertical-align:middle}
.copy{cursor:pointer}
@media (max-width:640px){.top-row{flex-direction:column;align-items:stretch}.model-select{width:100%}}
</style>
</head>
<body>
<div class="app" role="application" aria-label="Puter AI Chat">
  <div class="header">
    <div class="logo">P</div>
    <div>
      <div class="title">Puter AI Chat</div>
      <div class="small">Ketik prompt, pilih model, dapatkan jawaban instan.</div>
    </div>
  </div>

  <div class="top-row">
    <div style="flex:1">
      <div class="controls">
        <select id="model" class="select model-select" aria-label="Pilih model">
          <option value="openai/gpt-5.1-codex-max">openai/gpt-5.1-codex-max (code)</option>
          <option value="openai/gpt-5.1-mini">openai/gpt-5.1-mini</option>
          <option value="openai/gpt-5o">openai/gpt-5o</option>
        </select>
        <input id="temperature" class="select" type="number" step="0.1" min="0" max="2" value="0.2" style="width:92px" aria-label="Temperature">
        <div class="badge small">Realtime client-side demo</div>
      </div>
    </div>

    <div class="actions">
      <button id="clearBtn" class="select">Clear</button>
      <button id="downloadBtn" class="select">Download</button>
    </div>
  </div>

  <div id="chat" class="chat" role="log" aria-live="polite">
    <div id="empty" class="empty small">Belum ada percakapan. Ketik sesuatu di bawah lalu tekan Enter atau Send.</div>
  </div>

  <div class="controls-row">
    <textarea id="prompt" class="prompt" placeholder="Tulis prompt Anda di sini... Gunakan Ctrl+Enter untuk baris baru, Enter untuk kirim." aria-label="Prompt"></textarea>
    <button id="send" class="send">Send</button>
  </div>

  <div class="footer">
    <div class="small">Powered by Puter.js</div>
    <div class="small">Tip: untuk kode, gunakan model yang berlabel (code)</div>
  </div>
</div>

<script src="https://js.puter.com/v2/"></script>
<script>
const chatEl = document.getElementById('chat')
const promptEl = document.getElementById('prompt')
const sendBtn = document.getElementById('send')
const modelEl = document.getElementById('model')
const tempEl = document.getElementById('temperature')
const clearBtn = document.getElementById('clearBtn')
const downloadBtn = document.getElementById('downloadBtn')
const emptyEl = document.getElementById('empty')

function ensureEmptyHidden() {
  if (chatEl.querySelectorAll('.message').length) emptyEl.style.display = 'none'
  else emptyEl.style.display = 'block'
}

function appendMessage(text, who='bot') {
  const m = document.createElement('div')
  m.className = 'message ' + (who === 'user' ? 'user' : 'bot')
m.textContent = text
  chatEl.appendChild(m)
  chatEl.scrollTop = chatEl.scrollHeight
  ensureEmptyHidden()
}

function downloadTranscript() {
  const msgs = Array.from(chatEl.querySelectorAll('.message')).map(el => {
    const role = el.classList.contains('user') ? 'User' : 'Puter'
    return role + ':\n' + el.innerText.trim()
  }).join('\n\n')
  const blob = new Blob([msgs], {type:'text/plain'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'puter-transcript.txt'
  a.click()
  URL.revokeObjectURL(url)
}

function renderBusy() {
  const el = document.createElement('div')
  el.className = 'message bot'
  el.id = 'busy'
  el.textContent = 'Menyusun jawaban…'
  chatEl.appendChild(el)
  chatEl.scrollTop = chatEl.scrollHeight
  ensureEmptyHidden()
}

function removeBusy() {
  const b = document.getElementById('busy')
  if (b) b.remove()
}

async function sendPrompt() {
  const prompt = promptEl.value.trim()
  if (!prompt) return
  appendMessage(prompt, 'user')
  promptEl.value = ''
  renderBusy()
  const model = modelEl.value
  const temp = Number(tempEl.value) || 0.2
  try {
    const resp = await puter.ai.chat(prompt, { model, temperature: temp })
    removeBusy()
    appendMessage(String(resp || 'No response from model'))
  } catch (err) {
    removeBusy()
    appendMessage('Error: ' + (err && err.message ? err.message : String(err)))
  }
}

promptEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendPrompt()
  }
})

sendBtn.addEventListener('click', sendPrompt)
clearBtn.addEventListener('click', () => {
  Array.from(chatEl.querySelectorAll('.message')).forEach(m => m.remove())
  ensureEmptyHidden()
})
downloadBtn.addEventListener('click', downloadTranscript)

ensureEmptyHidden()
</script>
</body>
</html>`, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8"
        }
      })
    }

    const verifyUrl = url.searchParams.get("url")

    if (!verifyUrl) {
      return new Response("Missing url", { status: 400 })
    }

    const res = await fetch("https://safelinku.com/api/v1/links", {
      method: "POST",
      headers: {
        "Authorization": "65b295c090ecfd2971de2de476835f845d026414",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: verifyUrl
      })
    })

    const data = await res.json()

    if (!data.url) {
      return new Response("Failed to generate link", { status: 502 })
    }

    return new Response(
      JSON.stringify({ shortlink: data.url }),
      { headers: { "Content-Type": "application/json" } }
    )
  }
}