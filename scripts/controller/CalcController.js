/* const display = document.querySelector('#display');


function timeDate() {

    const currentDate = new Date();

    const time = document.querySelector('#time');
    const timeEl = currentDate.toLocaleTimeString('pt-BR');
    time.innerHTML = `<p>${timeEl}</p>`

    const date = document.querySelector('#date');
    const dateEl = currentDate.toLocaleDateString('pt-BR');
    date.innerHTML = `<p>${dateEl}</p>`

}
function initialize() {
    timeDate()
    setInterval(()=> {
        timeDate()
    },1000)
}
initialize()  */
 class CalcController {
    constructor() {

        this._timeElement = document.querySelector('#time');
        this._dateElement = document.querySelector('#date');
        this.currentDate;
        this._locale = 'pt-BR';

        this._displayCalcElement = document.querySelector('#values');
        
        this.initialize();
        this._operation = [];
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(()=> {
            this.setDisplayDateTime();
        }, 1000);
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    initButtosEvents() {
        let buttons = document.querySelectorAll('#buttons > li');
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', e => {
                console.log('e')
            })
        })
    }

    get displayCalc() {
        return this._displayCalcElement.innerHTML;
    }
    set displayCalc(value) {
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

