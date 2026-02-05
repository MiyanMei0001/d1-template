export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = 'https://yan-montelli.vercel.app' + url.pathname + url.search;
    
    return fetch(targetUrl, {
      headers: request.headers,
      method: request.method,
      body: request.body,
    });
  },
};