const ws = new WebSocket('ws://localhost:8000');

ws.onopen = function () {
    console.log('WebSocket connection established');
};

const inputElement = document.getElementById('input');

inputElement.addEventListener('input', function (event) {
    ws.send(event.target.value);
});

let remainingSuggestedText = '';

ws.onmessage = function (event) {
    const message = JSON.parse(event.data);
    console.log('Message:', message.suggestedText);
    remainingSuggestedText = message.suggestedText;
    updateInputValue();
};

function updateInputValue() {
    const ptag = document.getElementById('suggestion');
    const inputField = document.getElementById('input');
    const currentValue = inputField.value;
    console.log('currentValue', currentValue)
    const newValue = currentValue + '<span class="suggested-text">' + remainingSuggestedText + '</span>';
    ptag.inputElement = newValue ?? '';
    inputField.blur(); 
    inputField.focus();
    inputField.setSelectionRange(currentValue.length, newValue.length);
}

const inputField = document.getElementById('input');
inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
        event.preventDefault(); // prevent default tab behavior
        updateInputValue();
    }
});
