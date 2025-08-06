(function() {
  // Function registry
  const functions = {
    bar: function(input) {
      return `Bar processed: ${input}`;
    },
    baz: function(input) {
      return `Baz transformed: ${input.toUpperCase()}`;
    },
    qux: function(input) {
      return `Qux reversed: ${input.split('').reverse().join('')}`;
    }
  };

  // Parse hash or query
  const raw = location.hash || location.search;
  const params = new URLSearchParams(raw.replace(/^#/, '').replace(/^\?/, ''));

  const funcName = params.get("foo"); // e.g., "bar"
  const input = params.get("input") || "default";

  // Call matching function
  let result = null;
  if (funcName && functions[funcName]) {
    result = functions[funcName](input);
  } else {
    result = `Function "${funcName}" not found.`;
  }

  // Expose result globally
  window.relayResult = result;

  // Optional: dispatch event
  const event = new CustomEvent("relayComplete", { detail: result });
  window.dispatchEvent(event);
})();
