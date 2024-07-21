document.addEventListener('DOMContentLoaded', function() {
    // Подключаем Flatpickr к полю выбора даты
    flatpickr("#date", {
        dateFormat: "Y-m-d", // Формат даты
        minDate: "today", // Ограничение: не ранее сегодняшнего дня,
        onChange: function(selectedDates, dateStr, instance) {
            updateAvailableTimes(dateStr);
        }
    });

    function updateAvailableTimes(selectedDate) {
        const timePicker = flatpickr("#time", {
            enableTime: true, // Включаем выбор времени
            noCalendar: true, // Без календаря
            dateFormat: "H:i", // Формат времени
            time_24hr: true, // Формат времени 24 часа
            minDate: selectedDate, // Минимальная доступная дата (выбранная дата)
            minTime: "09:00", // Минимальное доступное время
            maxTime: "20:00" // Максимальное доступное время
        });

        const date = new Date(selectedDate);
        const dayOfCycle = (Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) + 1) % 6; // Определяем день цикла

        // Определяем доступные временные интервалы
        let availableTimes = [];
        if (dayOfCycle < 4) { // Первые 4 дня
            availableTimes = ["09:00", "10:00", "11:00", "12:00", "13:00"];
        } else { // Следующие 2 дня
            availableTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
        }

        // Очищаем предыдущие значения
        timePicker.clear();

        // Устанавливаем доступные временные интервалы
        timePicker.set("enable", availableTimes.map(time => {
            return {
                from: time,
                to: addOneHour(time)
            };
        }));
    }

    function addOneHour(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return `${hours + 1}:${minutes < 10 ? '0' + minutes : minutes}`;
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
});