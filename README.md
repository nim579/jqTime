jqTime 2.3 [![Build Status](https://travis-ci.org/nim579/jqTime.png?branch=master)](https://travis-ci.org/nim579/jqTime)
==========

— это jQuery плагин, выводящий время на экран. Плагин содержит в себе множество гибких настроек.

**Внимание!** Начиная с версии 2.2.0 плагин не совместим с предыдущими версиями. Обновите свои скрипты в соответствии с новой документацией. Там нет ничего сложного.

Возможности
---------------------

Плагин содержит в себе 3 мода *current*, *interval*, *toggler*.

**current**

- Выводит текущее время в заданный селектор
- Выводит время в обратном порядке (время до окнца дня)

**interval**

- Показывает время в заданном селекторе в заданный промежуток времени
- Показывает оставшееся время до заданного времени, начиная с заданого времени
- Вне промежутка время не показывается, показывается альтернативный текст (или HTML), или показывается изначальное содержимое

**toggler**

- Показывает заданный селектор в заданный промежуток времени
- Вне промежутка времени скрывает, или показывает альтернативный текст (или HTML)
- Может выполнять функции при изменении состояния, и высылать события

Технические требования и примеры вывода
---------------------------------------

Для работы плагина требуется подключение jQuery. Плагин тестировался на версии 1.7.2, но должен поддерживаться вплоть до 1.4.*.

~~~~~ js
$(selector).jqTime(mode, [options], [callback]);
~~~~~

**Пример вывода:**

Вставляет текущее время в элемент с id element1:

~~~~~ js
$('#element1').jqTime('current');
~~~~~

Будет показывать текущее время с 10:00:01 до 11 часов в element2:
	
~~~~~ js
$('#element2').jqTime('interval', {from: '10:00:01', to: '11:00:00'});
~~~~~

Будет показывать заданный элемент с 10 часов 1 секунды, до 11 часов:

~~~~~ js	
$('#element3').jqTime('toggler', {from: '10:00:01', to: '11:00:00'});
~~~~~

Общие свойства модов
----------------------

В плагине работает система подсчета времени, время обновляется раз в 5 минут.

В функциях выводящих время, используется форматировщик выводящегося времени по регулярному выражению. Он ищет в выражении буквы H,M,S,h,m,s. Если буква прописная, то время будет форматироваться (к числам добавится 0, если они меньше 10).

Все функции могут работать в часовом поясе пользователя зашедшего на сайт, или в заданом часовом поясе UTC (±0–12).
Можно указать третьим параметром callback, который будет вызываться каждую секунду. В него будет передано время в формате JSON:

~~~~~ js
$('element').jqTime('current', {}, function(JSONdata){
    console.log(JSONdata);
});
~~~~~

Все возможные поля JSON:
 
~~~~~ js
{
    hours: 0,
    minutes: 0,
    seconds: 0,
    utc: 'real', // часовой пояс, с которым сейчас работает плагин
    formated: '12:00:00', // отформатированная строка, или содержимое. Это же содержимое будет показано в выбраном элемента
    midday: 'am', // или pm. будет показано, только если включен 12-часовой формат
    inInterval: true, // boolean для interval и toggler, для multi будет строка с id в формате *interval<id>*
}
~~~~~

Мод current
-----------

Список опций

* **wrap** (boolean) — если *true*, отсчитывает время в обратную сторону. По умолчанию *false*.

* **utc** (numeric) — выводит время в любом часовом поясе UTC. Если установлено значение *real* — будет выводить текуще время на машине пользователя. По умолчанию *real*.

* **hour12** (boolean) — если *true*, то будет показывать время в 12-часовом формате. По умолчанию *false*

* **am**, **pm** (string) — строки, соответствующие am и pm времени. По умолчанию *a.m.* и *p.m.* соответственно. Их можно увидеть, если добавить в **exp** маску *D* (*HH:MM:SS D*, будет 12:00:00 a.m.)

* **exp** (RegExp) — если не *null*, отменяет опции *sepor* и *format*, и выводит время в соответствии с заданным регулярным выражением. по умолчанию *HH:MM:SS d*.

Пример вывода:
~~~~~ js
$('#element')..jqTime('current', {
	wrap: true,
	utc: 0,
	exp: 'hh:MM:ss'
});
~~~~~

Мод interval
------------

Список опций

* **wrap** (boolean) — если *true*, отсчитывает время до *timeTo*. По умолчанию *false*.

* **utc** (numeric) — выводит таймер в любом часовом поясе UTC. Если установлено значение *real* — таймер будет работать со временем на машине пользователя. По умолчанию *real*.

* **hour12** (boolean) — если *true*, то будет показывать время в 12-часовом формате. По умолчанию *false*

* **am**, **pm** (string) — строки, соответствующие am и pm времени. По умолчанию *a.m.* и *p.m.* соответственно. Их можно увидеть, если добавить в **exp** маску *D* (*HH:MM:SS D*, будет 12:00:00 a.m.)

* **exp** (RegExp) — если не *null*, отменяет опции *sepor* и *format*, и выводит время в соответствии с заданным регулярным выражением. по умолчанию *null*.

* **timeFrom** (hh:mm:ss) — задает время, с которого будет включаться таймер. Используется строка по шаблону "0:0:0". Параметр обязателен, по умолчанию ничего не задано.

* **timeTo** (hh:mm:ss) — задает время, до которого будет работать таймер. Используется строка по шаблону "0:0:0". Параметр обязателен, по умолчанию ничего не задано.

* **alt** (string, html) — выведет текст или HTML вне промежутка времени *timeFrom – timeTo*. Если *null*, покажет изначальное содержимое. По умолчанию *null*.

Пример вывода:

~~~~~ js
$('#element2').jqTime('interval', {
	utc: +4,
	timeFrom: '0:0:0',
	timeTo: '12:0:0',
	alt: '<span>Вне промежутка</span>',
	exp: 'hh:MM:ss'
});
~~~~~

Мод toggler
-----------

Список опций

* **utc** (numeric) — считает в любом часовом поясе UTC. Если установлено значение *real* — будет считать относительно времени на машине пользователя. По умолчанию *real*.

* **timeFrom** (hh:mm:ss) — задает время, с которого будет включаться таймер. Используется строка по шаблону "0:0:0". Параметр обязателен, по умолчанию ничего не задано.

* **timeTo** (hh:mm:ss) — задает время, до которого будет работать таймер. Используется строка по шаблону "0:0:0". Параметр обязателен, по умолчанию ничего не задано.

* **inInterval** (string, html, fn) — выведет текст или HTML в промежутке времени *timeFrom – timeTo*. Если *null*, будет просто показывать выбранный селектор. По умолчанию *null*. Если передать функцию — она выполнится, когда время войдет в промежуток.

* **outInterval** (string, html, fn) — выведет текст или HTML вне промежутка времени *timeFrom – timeTo*. Если *null*, будет просто скрывать выбранный селектор. По умолчанию *null*. Если передать функцию — она выполнится, когда время выйдет из промежутка.

Пример вывода:

~~~~~ js
$('#element2').jqTime('toggler' ,{
	utc: -2,
	timeFrom: '0:0:0',
	timeTo: '12:0:0'
});
~~~~~

Вспомогательные функции js
--------------------------

В плагине используются вспомогательные функции, которые тоже могут быть полезными. Они находятся в объекте *$.jqTime.helper*

**$.jqTime.helper.formater**(number) — Если переданное число меньше 9, то функция добавит перед числом 0, и вернет строку.

**$.jqTime.helper.stingToTime**('hh:mm:ss') — Забирает строку в формате "0:0:0". Возвращает заданое время в секундах.

**$.jqTime.helper.updater**(seconds, utc) — Забирает время в секундах, если время кратно 300 секундам (5 минут), обновляет его, и возвращает текущее время в секундах.

**$.jqTime.helper.expToTime(expr, hours, minutes, seconds, midday)** — Возвращает отформатированное время. Поддерживает следующие маски (H, h, M, m, S, s, D, d). Маски в верхнем регистре будут отформатированы (добавлен 0 в начало). D — значение полудня. Midday — обьект с полями: now (pm/am) — флаг текушего полудня, am — текст до полудня, pm — текст после полудня.

Тестирование и сборка
---------------------

В проекте ведется тестирование с помощью qUnit. Пока весь проект не покрыт тестами, но тесты дописываются постоянно.

Разработка проекта ведется с методологией Continuous Integration, автоматизированное тестирование работает на [Travis CI](https://travis-ci.org/nim579/jqTime).

Для сборки проекта используется Grunt.js.
