(function() {
  const functions = {
    bar: input => `Bar processed: ${input}`,
    baz: input => `Baz transformed: ${input.toUpperCase()}`
  };

  window.relayFunction = function(funcName, input = "default") {
    let result;
    if (funcName && functions[funcName]) {
      result = functions[funcName](input);
    } else {
      result = `Function "${funcName}" not found.`;
    }

    const event = new CustomEvent("relayComplete", { detail: result });
    window.dispatchEvent(event);

    return result;
  };

  console.log("relay.js loaded");
})();
