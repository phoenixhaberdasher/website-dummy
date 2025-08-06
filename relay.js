(function() {
  // Function registry
  const functions = {
    bar: input => `Bar processed: ${input}`,
    baz: input => `Baz transformed: ${input.toUpperCase()}`,
    qux: input => `Qux reversed: ${input.split('').reverse().join('')}`
  };

  // Parse hash or query
  const raw = location.hash || location.search;
  const params = new URLSearchParams(raw.replace(/^#/, '').replace(/^\?/, ''));

  const funcName = params.get("foo");
  const input = params.get("input") || "default";

  console.log("relay.js loaded");
  console.log("Parsed parameters:", { funcName, input });

  // Call matching function
  let result;
  if (funcName && functions[funcName]) {
    result = functions[funcName](input);
  } else {
    result = `Function "${funcName}" not found.`;
  }

  console.log("relay.js result:", result);

  // Expose result globally
  window.relayResult = result;

  // Dispatch event after DOM is ready
  if (document.readyState === "complete" || document.readyState === "interactive") {
    dispatchRelayEvent(result);
  } else {
    document.addEventListener("DOMContentLoaded", () => dispatchRelayEvent(result));
  }

  function dispatchRelayEvent(detail) {
    const event = new CustomEvent("relayComplete", { detail });
    window.dispatchEvent(event);
  }
})();
