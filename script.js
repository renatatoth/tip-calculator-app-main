const inputs = document.querySelectorAll('input');
const tipBtns = document.querySelectorAll('.tip-btn');
const customTipInput = document.querySelector('input[name="custom"]');
const tipPerson = document.querySelector('#tip-person');
const totalPerson = document.querySelector('#total-person');
const resetBtn = document.querySelector('.reset-btn');

let bill = 0;
let tip = 0;
let people = 0;
let tipPerPerson = 0;
let totalPerPerson = 0;

function getInputValue() {
    if (parseFloat(this.value.trim()) > 0 && this.value.trim() !== '') {
        hideError(this, this.name);
        switch (this.name) {
            case 'bill':
                bill = +this.value;
                break;
            case 'people':
                people = +this.value;
                break;
            case 'custom':
                tip = +this.value;
        }
    } else {
        showError(this, this.name);
    }

    this.name === 'custom' && resetActiveBtnClass();

    (bill !== 0 && tip !== 0 && people !== 0) && calcTip();
    resetBtn.style.opacity = '1';
}

function getBtnValue() {
    resetActiveBtnClass();

    customTipInput.value = '';
    tip = +this.value;
    this.classList.add('active');

    if (bill !== 0 && tip !==0 && people !== 0) calcTip();

    resetBtn.style.opacity = '1';
}

function calcTip() {
    let tipPerPerson = (tip / people).toFixed(2);
    let totalPerPerson = ((bill + tip) / people).toFixed(2);

    tipPerson.textContent = `$${tipPerPerson}`;
    totalPerson.textContent = `$${totalPerPerson}`;
}

function showError(input, msg) {
    input.classList.add('error');
    document.querySelector(`[data-error="${msg}"]`).textContent = `Can't be zero`;
}

function hideError(input, msg) {
    input.classList.remove('error');
    document.querySelector(`[data-error="${msg}"]`).textContent = '';
}

function resetActiveBtnClass() {
    tipBtns.forEach(btn => btn.classList.remove('active'));
}

function reset() {
    bill = 0;
    tip = 0;
    people = 0;
    tipPerPerson = 0;
    totalPerPerson = 0;

    resetActiveBtnClass();

    tipPerson.textContent = '$0.00';
    totalPerson.textContent = '$0.00';
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('error');
    });
    document.querySelectorAll('.error-text').forEach(errorMsg => errorMsg.textContent = '');
    resetBtn.style.opacity = '.2';
}

inputs.forEach(input => input.addEventListener('input', getInputValue));
tipBtns.forEach(btn => btn.addEventListener('click', getBtnValue));
resetBtn.addEventListener('click', reset);