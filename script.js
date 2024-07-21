document.addEventListener('DOMContentLoaded', function() {
    // Подключаем Flatpickr к полю выбора даты
    flatpickr("#date", {
        dateFormat: "Y-m-d", // Формат даты
        minDate: "today", // Ограничение: не ранее сегодняшнего дня
        onChange: function(selectedDates, dateStr, instance) {
            updateAvailableTimes(dateStr);
        }
    });

    function updateAvailableTimes(selectedDate) {
        const timeSelect = document.getElementById('time');
        timeSelect.innerHTML = ''; // Очистка списка времени при изменении даты

        const date = new Date(selectedDate);
        const dayOfCycle = ((Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) + 1) % 6);

        // Определяем доступные временные интервалы
        let availableTimes = [];
        if (dayOfCycle < 4) { // Первые 4 дня
            availableTimes = ["09:00", "10:00", "11:00", "12:00", "13:00"];
        } else { // Следующие 2 дня
            availableTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
        }

        // Заполнение поля выбора времени доступными интервалами
        availableTimes.forEach(function(time) {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });

        timeSelect.removeAttribute('disabled'); // Разблокировать поле времени
    }

    // Обработка отправки формы
    document.getElementById('appointment-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Отменяем стандартное поведение формы

        const service = document.getElementById('service').value;
        const master = document.getElementById('master').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (service && master && date && time) {
            alert(`Вы записались на ${service} к ${master} на дату ${date} и время ${time}.`);
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    });

    // Изначально блокируем поле времени
    document.getElementById('time').setAttribute('disabled', 'disabled');
});