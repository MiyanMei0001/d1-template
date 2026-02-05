export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url)
    const verifyUrl = searchParams.get("url")

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

    return new Response(JSON.stringify({
      shortlink: data.url
    }), {
      headers: { "Content-Type": "application/json" }
    })
  }
}