function timer(id, deadline2) {
    // Timer

    const deadline = new Date(); // присваиваем переменной текущую дату
    deadline.setDate(deadline.getDate() + 1); // устанавливаем дату на плюс 3 дня

    function setDateDeadLine(deadline) {
        const promodesk = document.querySelector('.promotion__descr'),
              newDataString = `Акция закончится ${deadline.getDate()} ${deadline.toLocaleString("ru", {month: 'long'})} в 00:00`;
              promodesk.textContent = promodesk.textContent.replace('Акция закончится 20 мая в 00:00', newDataString );
    }

    function getTineRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000*60*60*24)),
              hours = Math.floor((t / (1000*60*60) % 24)),
              minutes = Math.floor((t / (1000 / 60) % 60)),
              seconds = Math.floor((t / 1000) % 60);

        //return {
        //    'total': t,
        //    'days': days,
        //    'hours': hours,
        //    'minutes': minutes,
        //    'seconds': seconds
        //};
        return t > 0 ? 
             { total : t, days, hours, minutes, seconds } :
             { total : 0, days : 0, hours : 0, minutes : 0, seconds :0 };
    }

    function getZero(num) {
        if (num >=0 && num <10) {
            return `0${num}`;
        } else  {
            return num;
        }
    }

    function setCloak(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        setDateDeadLine(deadline);
        
        function updateClock() {
            const t = getTineRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0 ) {
                clearInterval(timeInterval);
            }
        }
    }

    setCloak(id, deadline);

       
}

//module.exports = timer;
export default timer;
