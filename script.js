document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const service = document.getElementById('service').value;
    const master = document.getElementById('master').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (service && master && date && time) {
        alert(`Вы записались на ${service} к ${master} на дату ${date} и время ${time}.`);
        // Здесь можно добавить код для отправки данных на сервер или другие действия
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
});
document.getElementById('date').addEventListener('focus', function() {
    this.click();
});
