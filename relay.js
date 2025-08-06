(function() {
  const functions = {
    bar: input => `Bar processed: ${input}`,
    baz: input => `Baz transformed: ${input.toUpperCase()}`,
    qux: input => `Qux reversed: ${input.split('').reverse().join('')}`
  };

  // Create global relay object
  window.relay = {};

  // Populate relay with named functions
  for (const [name, fn] of Object.entries(functions)) {
    window.relay[name] = fn;
  }

  console.log("relay.js loaded with functions:", Object.keys(window.relay));
})();
