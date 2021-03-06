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

## Функции через =>

Появился новый синтаксис для задания функций через «стрелку» =>.

Его простейший вариант выглядит так:

`example-14.html`

Эти две записи – примерно аналогичны:

`example-15.html`

Как видно, "x => x+1" – это уже готовая функция. Слева от => находится аргумент, а справа – выражение, которое нужно вернуть.

Если аргументов несколько, то нужно обернуть их в скобки, вот так:

`example-16.html`

Если нужно задать функцию без аргументов, то также используются скобки, в этом случае – пустые

`example-17.html`

Когда тело функции достаточно большое, то можно его обернуть в фигурные скобки {…}:

`example-18.html`

Заметим, что как только тело функции оборачивается в {…}, то её результат уже не возвращается автоматически. Такая функция должна делать явный return, как в примере выше, если конечно хочет что-либо возвратить.

Функции-стрелки очень удобны в качестве коллбеков, например:

`example-19.html`

Такая запись – коротка и понятна. Далее мы познакомимся с дополнительными преимуществами использования функций-стрелок для этой цели.

## Фнукции стрелки не имеют своего this

Внутри функций-стрелок – тот же this, что и снаружи.

Это очень удобно в обработчиках событий и коллбэках, например:

`example-20.html`

Здесь в forEach была использована функция-стрелка, поэтому this.title в коллбэке – тот же, что и во внешней функции showList. То есть, в данном случае – group.title.

Если бы в forEach вместо функции-стрелки была обычная функция, то была бы ошибка:

`example-21.html`

При запуске будет "попытка прочитать свойство title у undefined", так как .forEach(f) при запуске f не ставит this. То есть, this внутри forEach будет undefined.

#### Функции стрелки нельзя запускать с new

Отсутствие у функции-стрелки "своего this" влечёт за собой естественное ограничение: такие функции нельзя использовать в качестве конструктора, то есть нельзя вызывать через new.

#### => это не то же самое, что .bind(this)

Есть тонкое различие между функцией стрелкой => и обычной функцией, у которой вызван .bind(this):

* Вызовом .bind(this) мы передаём текущий this, привязывая его к функции.

* При => привязки не происходит, так как функция стрелка вообще не имеет контекста this. Поиск this в ней осуществляется так же, как и поиск обычной переменной, то есть, выше в замыкании. До появления стандарта ES-2015 такое было невозможно.

## Функции стрелки не имеют своего arguments

В качестве arguments используются аргументы внешней «обычной» функции.

Например:

`example-22.html`

Вызов showArg() выведет 1, получив его из аргументов функции f. Функция-стрелка здесь вызвана без параметров, но это не важно: arguments всегда берутся из внешней «обычной» функции.

Сохранение внешнего this и arguments удобно использовать для форвардинга вызовов и создания декораторов.

Например, декоратор defer(f, ms) ниже получает функцию f и возвращает обёртку вокруг неё, откладывающую вызов на ms миллисекунд:

`example-23.html`

Аналогичная реализация без функции-стрелки выглядела бы так:

`example-24.html`

В этом коде пришлось создавать дополнительные переменные args и ctx для передачи внешних аргументов и контекста через замыкание.

## Итого

Основные улучшения в функциях:

* Можно задавать параметры по умолчанию, а также использовать деструктуризацию для чтения приходящего объекта.

* Оператор spread (троеточие) в объявлении позволяет функции получать оставшиеся аргументы в массив: function f(arg1, arg2, ...rest).

* Тот же оператор spread в вызове функции позволяет передать в неё массив как список аргументов (вместо apply).

* У функции есть свойство name, оно содержит имя, указанное при объявлении функции, либо, если его нет, то имя свойства или переменную, в которую она записана. Есть и некоторые другие ситуации, в которых интерпретатор подставляет «самое подходящее» имя.

* Объявление Function Declaration в блоке {...} видно только в этом блоке.

* Появились функции-стрелки:

    * Без фигурных скобок возвращают выражение expr: (args) => expr.

    * С фигурными скобками требуют явного return.

    * Не имеют своих this и arguments, при обращении получают их из окружающего контекста.

    * Не могут быть использованы как конструкторы, с new.