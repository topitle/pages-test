document.getElementById('convertButton').addEventListener('click', function() {
  const input = document.getElementById('userInput').value;
  const output = input.toUpperCase();
  document.getElementById('outputBox').textContent = output;
});
