jqTime
======

— это jQuery плагин, выводящий время на экран. Плагин содержит в себе множество гибких настроек.

Функции и их описание
---------------------

Плагин содержит в себе 3 основные jQuery функции *curTime*, *IntervalTimer*, *TimerToggler*.

**curTime**

- Выводит текущее время в заданный селектор
- Выводит время в обратном порядке (время до окнца дня)

**IntervalTimer**

- Показывает время в заданном селекторе в заданный промежуток времени
- Показывает оставшееся время до заданного времени, начиная с заданого мремени
- Вне промежутка время не показывается, или показывается альтернативный текст (или HTML)

**TimerToggler**

- Показывает заданный селектор в заданный промежуток времени
- Вне промежутка времени скрывает, или показывает альтернативный текст (или HTML)

Технические требования и примеры вывода
---------------------------------------

Для работы плагина требуется подключение jQuery. Плагин тестировался на версии 1.7.2, но должен поддерживаться вплоть до 1.4.

**Пример вывода:**

Вставляет текущее время в элемент с id element1:

`$('#element1').curTime();`

Будет показывать текущее время с 10:00:01 до 11 часов в element2:
	
`$('#element2').intervalTime({from: '10:00:01', to: '11:00:00'});`

Будет показывать заданный элемент с 10 часов 1 секунды, до 11 часов:
	
`$('#element3').timeToggler({from: '10:00:01', to: '11:00:00'});`

Общие свойства функций
----------------------

Здесь будет описание общих свойств функций плагина.

Функция curTime
---------------

Список опций

**wrap** (boolean) — если *true*, отсчитывает время в обратную сторону. По умолчанию *false*.

**sepor** (string) — задает символ, которым разделяется время, например, если задан ":", выдает время "00:00:00". По умолчанию *":"*.

**utc** (numeric) — выводит время в любом часовом поясе UTC. Если установлено значение *real* — будет выводить текуще время на машине пользователя. по умолчанию *real*.

**format** (boolean) — если установлено значение *true*, то добавляется 0 к времени, если оно меньше 10, например: 09. При *false* число будет обображаться без 0, например: 9. По умолчанию *true*.

**exp** (RegExp) — если не *null*, отменяет опции *sepor* и *format*, и выводит время в соответствии с заданным регулярным выражением. по умолчанию null.

Пример вывода:

	$('#element').curTime({
		sepor: ":",
		wrap: true,
		utc: 0,
		format: false,
		exp: "hh:MM:ss"
	});

Функция IntervalTime
--------------------


Функция TimeToggler
-------------------


Вспомогательные функции js
--------------------------

Здесь будут описаны вспомогательные функции, использующиеся в плагине, к которым так же есть доступ.
