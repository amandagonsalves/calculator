/* const display = document.querySelector('#display');

function timeDate() {

    const time = document.querySelector('#time');
    const now = new Date();
    const timeEl = now.toLocaleTimeString('pt-BR');
    time.innerHTML = `<p>${timeEl}</p>`

    const date = document.querySelector('#date');
    const currentDate = new Date();
    const dateEl = currentDate.toLocaleDateString('pt-BR');
    date.innerHTML = `<p>${dateEl}</p>`

}
function initialize() {
    timeDate()
    setInterval(()=> {
        timeDate()
    },1000)
}
initialize() */
class CalcController {
    constructor() {
        this._timeEl = document.querySelector('#time');
        this._dateEl = document.querySelector('#date');
        this._displayCalcEl = document.querySelector('#display');
        this.currentDate;
        this._locale = 'pt-BR'
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get currentDate() {
        return new Date()
    }
    set currentDate(value) {
        this.currentDate.innerHTML = value;
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    initialize() {
        setInterval(()=> {
            setDisplayDateTime()
        }, 1000)
    }

}

