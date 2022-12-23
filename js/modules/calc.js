function calc() {
    //Calculator
    //Формула расчета базовой нормы калорий:
    //для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
    //для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
    //Коэффициенты активности при расчете нормы калорий:
    //Минимальный уровень активности — 1.2
    //Низкий уровень активности — 1.375
    //Средний уровень активности — 1.55
    //Высокий уровень — 1.725
    //Очень высокий —  1.9
    const result = document.querySelector('.calculating__result');
    let height, 
        weight, 
        age,
        sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : "female",
        ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : "1.375";

    function initLocalSettingCalc(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            } 
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            } 
        });
        calcTotal();
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        } 

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio) + " ккал";
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio) + " ккал";
        }
    }

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.addEventListener('click', (e) => {
                const target = e.target;
                if (target.getAttribute('data-ratio')) {
                    ratio = +target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +target.getAttribute('data-ratio'));
                } else {
                    sex = target.getAttribute('id');
                    localStorage.setItem('sex', target.getAttribute('id'));
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                target.classList.add(activeClass);
                calcTotal();
            });
        });
        
    }

    initLocalSettingCalc('#gender div', 'calculating__choose-item_active');
    initLocalSettingCalc('.calculating__choose_big div', 'calculating__choose-item_active');
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', (e) => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

//module.exports = calc;
export default calc;