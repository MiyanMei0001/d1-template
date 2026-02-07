export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === "/Puter") {
      return new Response(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Puter AI Demo</title>
</head>
<body>
  <h2>Puter.js AI Chat Demo</h2>

  <script src="https://js.puter.com/v2/"></script>
  <script>
    puter.ai.chat(
      "Write a Python function that implements binary search on a sorted array",
      { model: "openai/gpt-5.1-codex-max" }
    ).then(response => {
      puter.print(response, { code: true });
    });
  </script>
</body>
</html>`,
        {
          headers: {
            "Content-Type": "text/html; charset=UTF-8"
          }
        }
      )
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