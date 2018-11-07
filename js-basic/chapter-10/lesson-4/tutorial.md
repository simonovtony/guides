# Функции

В функциях основные изменения касаются передачи параметров, плюс введена дополнительная короткая запись через стрелочку =>.

## Параметры по умолчанию

Можно указывать параметры по умолчанию через равенство =, например:

`example-1.html`

Параметр по умолчанию используется при отсутствующем аргументе или равном undefined, например:

`example-2.html`

При передаче любого значения, кроме undefined, включая пустую строку, ноль или null, параметр считается переданным, и значение по умолчанию не используется.

#### Параметры по умолчанию могут быть не только значениями, но и выражениями.

Например:

`example-3.html`

Заметим, что значение выражения getCurrentUser().toUpperCase() будет вычислено, и соответствующие функции вызваны – лишь в том случае, если это необходимо, то есть когда функция вызвана без параметра.

В частности, выражение по умолчанию не вычисляется при объявлении функции. В примере выше функция getCurrentUser() будет вызвана именно в последней строке, так как не передан параметр.

## Оператор spread вместо arguments

Чтобы получить массив аргументов, можно использовать оператор …, например:

`example-4.html`

В rest попадёт массив всех аргументов, начиная с третьего.

Заметим, что rest – настоящий массив, с методами map, forEach и другими, в отличие от arguments.

#### Оператор … должен быть в конце

Оператор … собирает «все оставшиеся» аргументы, поэтому такое объявление не имеет смысла:

`example-5.html`

Параметр ...rest должен быть в конце функции.

Выше мы увидели использование ... для чтения параметров в объявлении функции. Но этот же оператор можно использовать и при вызове функции, для передачи массива параметров как списка, например:

`example-6.html`

Формально говоря, эти два вызова делают одно и то же:

`example-7.html`

Похоже, что первый – короче и красивее.

## Деструктуризация в парамерах

Если функция получает объект, то она может его тут же разбить в переменные:

`example-8.html`

Можно использовать и более сложную деструктуризацию, с соответствиями и значениями по умолчанию:

`example-9.html`

Заметим, что в примере выше какой-то аргумент у showMenu() обязательно должен быть, чтобы разбить его на переменные.

Если хочется, чтобы функция могла быть вызвана вообще без аргументов – нужно добавить ей параметр по умолчанию – уже не внутрь деструктуризации, а в самом списке аргументов:

`example-10.html`

В коде выше весь объект аргументов по умолчанию равен пустому объекту {}, поэтому всегда есть что деструктурировать.

## Имя "name"

В свойстве name у функции находится её имя.

Например:

`example-11.html`

В примере выше показаны Function Declaration и Named Function Expression. В синтаксисе выше довольно очевидно, что у этих функций есть имя name. В конце концов, оно указано в объявлении.

Но современный JavaScript идёт дальше, он старается даже анонимным функциям дать разумные имена.

Например, при создании анонимной функции с одновременной записью в переменную или свойство – её имя равно названию переменной (или свойства).

Например:

`example-12.html`

## Функции в блоке

Объявление функции Function Declaration, сделанное в блоке, видно только в этом блоке.

Например:

`example-13.html`

То есть, иными словами, такое объявление – ведёт себя в точности как если бы let sayHi = function() {…} было сделано в начале блока.