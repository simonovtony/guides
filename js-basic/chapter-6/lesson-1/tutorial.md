# Методы объектов, this

До этого мы говорили об объекте лишь как о хранилище значений. Теперь пойдём дальше и поговорим 
об объектах как о сущностях со своими функциями («методами»).

## Методы у обьектов

При объявлении объекта можно указать свойство-функцию, например:

`example-1.html`

Свойства-функции называют «методами» объектов. Их можно добавлять и удалять в любой момент, в том 
числе и явным присваиванием:

`example-2.html`

## Доступ к обьекту через this

Для полноценной работы метод должен иметь доступ к данным объекта. В частности, вызов 
user.sayHi() может захотеть вывести имя пользователя. 

#### Для доступа к текущему объекту из метода используется ключевое слово this.

Значением this является объект перед «точкой», в контексте которого вызван метод, например:

`example-3.html`

Здесь при выполнении функции user.sayHi() в this будет храниться ссылка на текущий объект user.
Вместо this внутри sayHi можно было бы обратиться к объекту, используя переменную user:

    ...
    sayHi: function() {
        alert(user.name);
    }
    ...

…Однако, такое решение нестабильно. Если мы решим скопировать объект в другую переменную, 
например admin = user, а в переменную user записать что-то другое – обращение будет совсем не по 
адресу:

`example-4.html`

Использование this гарантирует, что функция работает именно с тем объектом, в контексте которого 
вызвана.

Через this метод может не только обратиться к любому свойству объекта, но и передать куда-то ссылку 
на сам объект целиком:

`example-5.html`

## Подробнее про this

Любая функция может иметь в себе this. Совершенно неважно, объявлена ли она в объекте или 
отдельно от него.

Значение this называется контекстом вызова и будет определено в момент вызова функции.

Например, такая функция, объявленная без объекта, вполне допустима:

    function sayHi() {
        alert( this.firstName );
    }
    
Эта функция ещё не знает, каким будет this. Это выяснится при выполнении программы.

Если одну и ту же функцию запускать в контексте разных объектов, она будет получать разный 
this:

`example-6.html`

Итак, значение this не зависит от того, как функция была создана, оно определяется исключительно в 
момент вызова.

## Значение this при вызове без контекста

Если функция использует this – это подразумевает работу с объектом. Но и прямой вызов func()
технически возможен.

Как правило, такая ситуация возникает при ошибке в разработке.

При этом this получает значение window, глобального объекта:

`example-7.html`

Таково поведение в старом стандарте.

А в режиме use strict вместо глобального объекта this будет undefined:

`example-8.html`

Обычно если в функции используется this, то она, всё же, служит для вызова в контексте объекта, так что 
такая ситуация – скорее исключение.

## Ссылочнй тип

Контекст this никак не привязан к функции, даже если она создана в объявлении объекта. Чтобы this 
передался, нужно вызвать функцию именно через точку (или квадратные скобки).

Любой более хитрый вызов приведёт к потере контекста, например:

`example-9.html`

В последней строке примера метод получен в результате выполнения тернарного оператора и тут же 
вызван. Но this при этом теряется.

Если хочется понять, почему, то причина кроется в деталях работы вызова obj.method().

Он ведь, на самом деле, состоит из двух независимых операций: точка . – получение свойства и скобки 
() – его вызов (предполагается, что это функция).

Функция, как мы говорили раньше, сама по себе не запоминает контекст. Чтобы «донести его» до скобок, 
JavaScript применяет «финт ушами» – точка возвращает не функцию, а значение специального 
«ссылочного» типа Reference Type.

Этот тип представляет собой связку «base-name-strict», где:

* base – как раз объект,
* name – имя свойства,
* strict – вспомогательный флаг для передачи use strict.

strict – вспомогательный флаг для передачи use strict.
То есть, ссылочный тип (Reference Type) – это своеобразное «три-в-одном». Он существует исключительно 
для целей спецификации, мы его не видим, поскольку любой оператор тут же от него избавляется: 

* Скобки () получают из base значение свойства name и вызывают в контексте base.
* Другие операторы получают из base значение свойства name и используют, а остальные компоненты игнорируют.

Поэтому любая операция над результатом операции получения свойства, кроме вызова, приводит к потере контекста.

Аналогично работает и получение свойства через квадратные скобки obj[method].

#### Любые другие операции, кроме вызова, превращают Reference Type в обычный тип,
#### в данном случае – функцию (так уж этот тип устроен).