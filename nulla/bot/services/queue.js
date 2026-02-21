const VALUE_LIMIT = 100.0;

/**
 * Parse channel name to determine vs and mode. Expect format like "1x1-mobile".
 */
function parseChannelName(name) {
  const parts = name.split('-');
  if (parts.length < 2) return null;
  const vs = parts[0];
  const mode = parts.slice(1).join('-');
  // return both english and portuguese keys for flexibility
  return { vs, mode, modo: mode };
}

// generate array of values (numbers) based on rules
function generateValues() {
  const values = [];
  let v = 0.1;
  while (v < 10.0) {
    values.push(parseFloat(v.toFixed(2)));
    v += 0.1;
  }
  v = 10.0;
  while (v <= VALUE_LIMIT) {
    values.push(parseFloat(v.toFixed(2)));
    v += 10.0;
  }
  return values;
}

module.exports = { parseChannelName, generateValues };
