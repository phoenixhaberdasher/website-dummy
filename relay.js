(function() {
  const functions = {
    cnn_rss: async () => {
      const rssUrl = "http://rss.cnn.com/rss/cnn_topstories.rss";
      const proxy = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

      try {
        const response = await fetch(proxy);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();

        return data.items.slice(0, 10).map(item => ({
          title: item.title,
          link: item.link,
          description: item.description
        }));
      } catch (err) {
        console.error("Failed to fetch CNN top stories:", err);
        return { error: err.message };
      }
    },

    baz: input => `Baz transformed: ${input.toUpperCase()}`,
    qux: input => `Qux reversed: ${input.split('').reverse().join('')}`
  };

  window.relay = {};

  for (const [name, fn] of Object.entries(functions)) {
    window.relay[name] = fn;
  }

  console.log("relay.js loaded with functions:", Object.keys(window.relay));
})();
