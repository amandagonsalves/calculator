class CalcController {
    constructor() {

        this._audio = new Audio('click.mp3');
        this.audioOnOff = false;

        this._lastOperator = '';
        this._lastNumber = '';

        this._timeElement = document.querySelector('#time');
        this._dateElement = document.querySelector('#date');
        this.currentDate;
        this._locale = 'pt-BR';

        this._displayCalcElement = document.querySelector('#values');

        this.initialize();
        this._operation = [];
        this.initButtonsEvents();
        this.initKeyboard();
    }

    copyToClipboard() {

        let input = document.querySelector('#copy');

        input.value = this.displayCalc;

        input.select();

        document.execCommand('Copy');

        input.remove();

    }

    pasteFromClipboard() {

        document.addEventListener('paste', e=> {

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text)
            console.log(text)

        })

    }

    toggleAudio() {
        
        this.audioOnOff = !this.audioOnOff;

    }

    playAudio() {
        
        if(this.audioOnOff) {

            this._audio.currentTime = 0;
            this._audio.play();

        }
    }

    initialize() {
        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

        this.pasteFromClipboard();

        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e=> {

                this.toggleAudio();

            })

        })
    }
    

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);

        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll('#buttons > li');

        buttons.forEach((btn, index) => {

            btn.addEventListener('click', e => {

                let textBtn = btn.className.replace('btn-', '');

                this.execBtn(textBtn)

            })

        })

    }

    initKeyboard() {

        document.addEventListener('keyup', e=> {
            this.playAudio();
            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperation(e.key);
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
            }
        })
        
    }

    clearAll() {
        this._operation = [];
        this.displayCalc = '0';
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    setError() {
        this.displayCalc = 'Error';
    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) {
        return this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    getResult() {
        return eval(this._operation.join(''))
    }

    calc() {

        let last = '';
        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3) {

            let firstItem = this._operation[0];

            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if (this._operation.length > 3) {

            last = this._operation.pop();

            this._lastNumber = this.getResult();

        } else if(this._operation.length == 3){

            this._lastNumber = this.getLastItem(false);

        }
        
        let result = this.getResult();

        if (last === '%') {

            result /= 100;

            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) {

                this.pushOperation(last);

            }

        }

        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) == isOperator) {

                lastItem = this._operation[i];
                break;

            }

        }
        if(!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
    }

    addDot() {

        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOperation) || !lastOperation) {

            this.pushOperation('0.');

        } else {

            this.setLastOperation(lastOperation.toString() + '.');

        }

        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false)

        if (!lastNumber) {
            lastNumber === 0
        };

        this.displayCalc = lastNumber;
    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else {

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }
        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();

                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();

            }

        }

    }

    execBtn(value) {

        this.playAudio();

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'plus':
                this.addOperation('+');
                break;
            case 'minus':
                this.addOperation('-');
                break;
            case 'times':
                this.addOperation('*');
                break;
            case 'divide':
                this.addOperation('/');
                break;
            case 'porcent':
                this.addOperation('%');
                break;
            case 'dot':
                this.addDot();
                break;
            case 'equals':
                this.calc();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
        }
    }


    //====getters and setters====
    get displayCalc() {
        return this._displayCalcElement.innerHTML;
    }
    set displayCalc(value) {

        if(value.toString().length > 12) {
            this.setError()
            return false;
        }
        this._displayCalcElement.innerHTML = value;
    }

    get displayTime() {
        return this._timeElement.innerHTML;
    }
    set displayTime(value) {
        this._timeElement.innerHTML = value;
    }

    get displayDate() {
        return this._dateElement.innerHTML;
    }
    set displayDate(value) {
        this._dateElement.innerHTML = value;
    }

    get currentDate() {
        return new Date()
    }
    set currentDate(value) {
        this.currentDate = value;
    }

}

