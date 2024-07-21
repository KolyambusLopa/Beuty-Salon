// Когда страница полностью загружена
document.addEventListener('DOMContentLoaded', function() {
    // Подключаем Flatpickr к полю выбора даты
    flatpickr("#date", {
        dateFormat: "Y-m-d", // Формат даты
        minDate: "today" // Ограничение: не ранее сегодняшнего дня
    });

    // Подключаем Flatpickr к полю выбора времени
    flatpickr("#time", {
        enableTime: true, // Включаем выбор времени
        noCalendar: true, // Без календаря
        dateFormat: "H:i", // Формат времени
        time_24hr: true // Формат времени 24 часа
    });

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
