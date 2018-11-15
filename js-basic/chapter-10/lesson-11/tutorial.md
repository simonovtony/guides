# Promise

Promise (обычно их так и называют «промисы») – предоставляют удобный способ организации асинхронного кода.

В современном JavaScript промисы часто используются в том числе и неявно, при помощи генераторов, но об этом чуть позже.

## Что такое Promise

Promise – это специальный объект, который содержит своё состояние. Вначале pending («ожидание»), затем – одно из: fulfilled («выполнено успешно») или rejected («выполнено с ошибкой»).

На promise можно навешивать коллбэки двух типов:

* onFulfilled - срабатывает, когда promise в состоянии "выполнен успешно".

* onRejected - срабатывает, когда promise в состоянии "выполнен с ошибкой".

Способ использования, в общих чертах, такой:

1. Код, которому надо сделать что-то асинхронно, создает обьект promise и возвращает его.

2. Внешний код, получив promise, навешивает на него обработчики.

3. По завершении процесса асинхронный код переводит promise в состояние fulfilled (с результатом) или rejected (с ошибкой). При этом автоматически вызываются соответствующие обработчики во внешнем коде.

Синтаксис создания Promise:

    var promise = new Promise(function (resolve, reject) {
        // Эта фнукция будет вызвана автоматически

        // В ней можно делать любые асинхронные операции,
        // А когда они завершатся - нужно вызвать одно из:
        // resolve(результат) при успешном выполнении
        // reject(ошибка) при ошибке
    })

Универсальный метод для навешивания обработчиков:

    promise.then(onFulfilled, onRejected)

* onFulfilled - функция, которая будет вызвана с результатом при resolve

* onRejected - функция, которая будет вызвана с ошибкой при reject.

С его помощью можно назначить как оба обработчика сразу, так и только один:

    // onFulfilled сработает при успешном выполнении
    promise.then(onFulfilled)
    // onRejected сработает при ошибке
    promise.then(null, onRejected)

#### .catch

Для того, чтобы поставить обработчик только на ошибку, вместо .then(null, onRejected) можно написать .catch(onRejected) - это то же самое.

#### Синхронный throw - то же самое, что reject

Если функции промиса происходит синхронный throw (или иная ошибка), то вызывается reject:

    let p = new Promise((resolve, reject) => {
        // то же что reject(new Error("o_O"))
        throw new Error("o_O")
    });

    p.catch(alert); // Error: o_O

Посмотрим, как это выглядит вместе, на простом примере.

## Пример с setTimeout

Возьмем setTimeout в качестве асинхронной операции, которая должна через нескоторое время успешно завершиться с результатом "result":

`example-1.html`

В результате запуска кода выше - через 1 секунду выведется "Fulfilled: result".

А если бы вместо resolve("result") был вызов reject("error"), то вывелось бы "Rejected: error". Впрочем, как правило, если при выполнении возникла проблема, то reject вызывают не со строкой, а с обьектом ошибки типа new Error:

`example-2.html`

Конечно, вместо setTimeout внутри функции промиса может быть и запрос к серверу и ожидание ввода пользователя, или другой асинхронный процесс. Главное, что по своему завершению он вызовал resolve или reject, которые передадут результат обработчиками.

#### Только один аргумент

Функции resolve/reject принимают ровно один аргумент - результат/ошибку.

Именно он передается обработчиком в .then, как можно видеть в примерах выше.

## Promise после reject/resolve - неизменны

Змаетим, что после вызова resolve/reject промис уже не может "передумать".

Когда промис переходит в состояние "выполнен" - с результатом (resolve) или ошибка (reject) - это навсегда.

Например:

`example-3.html`

В результате вызова этого кода сработает только первый обработчик then, так как после вызова resolve промис уже получил состояние (с результатом), и в дальнейшем его уже ничто не изменит.

Последующие вызовы resolve/reject будут просто проигнорированы.

А так - наоборот, ошибка будет раньше:

`example-4.html`

## Промисификация

Промисификация - это когда берут асинхронный функционал и делают для него обертку, возвращающую промис.

После промисификации использование функционала зачастую становится гораздно удобнее.

В качестве примера сделаем такую обертку для запросов при помощи XMLHttpRequest.

Фнукция httpGet(url) будет возвращать промис, который при успешной загрузке данных с url будет переходить в fulfilled с этими данными, а при ошибке - в rejected с информаций об ошибке:

`example-5.html`

Как видно, внутри функции обьекта XMLHttpRequest создается и отсылается как обычно, при onload/onerror вызываются, соответственно, resolve(при статусе 200) или reject.

Использование:

`example-6.html`

## Цепочки промисов

"Чейнинг"(chaining), то есть возможность строить асинхронные цепочки из промисов - пожалуй, основная причина, из-за которой существуют и активно используются промисы.

Например, мы хотим по очереди:

1. Загрузить анные посетителя с сервера (асинхронно).

2. Затем отправить запрос о нем на github (асинхронно).

3. Когда это будет готово, вывести его github-аватар на экран (асинхронно).

4. ...И сделать код расширяемым, чтобы цепочку можно было легко продолжить.

Вот код для этого, использующий функцию httpGet, описанную выше:

`example-7.html`

Самое главное в этом коде - последовательность вызовов:

    httpGet(...)
        .then(...)
        .then(...)
        .then(...)

При чейнинге, то есть последовательных вызовах .then...then...then, в каждый следующий then переходит результат от предыдущего. Вызовы console.log оставлены, что бы при запуске можно было посмотреть конкретные значения, хотя они здесь и не очень важны.

#### Если очередной then вернул промис, то далее по цепочке будет передан не сам этот промис, а его результат.

В коде выше:

1. Функция в первом then возвращает "обычное" значение user. Это значит, что then возвратит промис в состоянии "выполнен" с user в качестве результата. Он станет аргументом в следующем then.

2. Функция во втором then возвращает промис (результат нового вызова httpGet). Когда он будет завершен (может пройти какое-то время), то будет вызван следующий then с его результатом.

3. Третий then ничего не возвращает.

Схематично его работу можно изобразить так:

Значком "песочные часы" помечены периоды ожидания, которых всего два: в исходном httpGet и в подвызове далее по цепочке.

Если then возвращает промис, то до его выполнения может пройти некоторое время, оставшаяся часть цепочки будет ждать.

То есть, логика довольно проста:

* В каждом then мы получаем текущий результат работы

* Можно его обработать синхронно и вернуть результат (например, применить JSON.parse). Или же, если нужна асинхронная обработка - инициировать ее и вернуть промис.

Обратим внимание, что последний then в нашем примере ничего не возвращает. Если мы хотим, что бы после setTimeout (*) асинхронная цепочка могла быть продолжена, то последний then стартует новый асинхронный процесс, то для того, что бы оставшаяся часть цепочки выполнилась после его окончания, мы должны вернуть промис.

В данном случае промис должен перейти в состояние "выполнен" после срабатывания setTimeout.

Строку (*) для этого нужно переписать так:

`example-8.html`

Теперь, если к цепочке добавить еще then, то он будет вызван после окончания setTimeout.

## Перехват ошибок

Выше мы рассмотрели "идеальный случай" выполнения, когда ошибок нет.

А что, если github не отвечает? Или JSON.parse бросил синтаксическую ошибку при обработке данных?

Да мало ли, где ошибка...

Правило здесь очень простое.

#### При возникновении ошибки - она отправляется в ближайший обработчик onRejected.

Такой обработчик нужно поставить через второй аргумент .then(..., onRejected) или, что то же самое, через .catch(onRejected).

Что бы поймать всевозможные ошибки, которые возникнут при загрузке и обработке данных, добавим catch в конец нашей цепочки:

`example-9.html`

В примере выше ошибка возникает в первом же httpGet, но catch с тем же успехом поймал бы ошибку во втором httpGet или в JSON.parse.

Принцып очень похож на обычный try...catch: мы делаем асинхронную цепочку из .then, а затем, в том месте кода, где нужно перехватить оишбки, вызываем .catch(onRejected).

#### А что после catch?

Обработчик .catch(onRejected) получает ошибку и должен обработать ее.

Есть два варианта развития событий:

1. Если ошибка не критичная, то onRejected возвращает значение через return, и управление переходит в ближайший .then(onFulfilled).

2. Если продолжить выполнение с такой ошибкой нельзя, то он делает throw, и тогда ошибка переходит в следующий ближайший .catch(onRejected).

Это также похоже на обычный try..catch - в блоке catch ошибка либо обрабатывается, и тогда выполнение кода продолжается как обычно, либо он делает throw. Существенное отличие - в том, что промисы асинхронные, поэтому при отсутствии внешнего .catch ошибка не "выплывается" в консоль и не "убивает" скрипт.

Ведь возможно, что новый обработчик .catch будет добавлен в цепочку позже.

## Промисы в деталях

Самым основным источником информации по промисам является, разумеется, стандарт.

Чтобы наше понимание промисов было полным, и мы могли с легкостью разрешать сложные ситуации, посмотрим внимательнее, что такое промис и как он работает, но уже не в общих словах, а детально, в соответствии со стандартом ECMAScript.

Согласно стандарту, у обьекта new Promise(executor) при создании есть четыре внутренних свойства:

* PromiseState - состояние, вначале "pending".

* PromiseResult - результат, при создании значения нет.

* PromiseFulfilledReactions - список функций-обработчиков успешного выполнения.

* PromiseRejectReactions - список функций-обработчиков ошибки.

Когда функция-executor вызывает reject или resolve, то PromiseState становится "resolved" или "rejected", а все функции-обработчики из соответствующего списка перемещаются в специальную системную очередь "PromiseJobs".

Эта очередь автоматически выполняется, когдаинтерпретатору "нечего делать". Иначе говоря, все функции-обработчики выполнятся асинхронно, одна за другой, по завершении текущего кода, примерно как setTimeout(..,0).

Исключени из этого правила - если resolve возвращает другой Promise. Тогда дальнейшее выполнение ожидает его результата (в очередь помещается специальная задача), и функции-обработчики выполняются уже с ним.

Добавляет обработчики в списки один метод: .then(onResolved, onRejected). Метод .catch(onRejected) - всего лишь сокращенная запись .then(null, onRejected).

Он делает следующее:

* Если PromiseState == 'pending', то есть промис еще не выполнен, то обработчики добавляются в соответствующие списки.

* Иначе обработчики сразу помещаются в очередь на выполнение.

Здесь важно, что обработчики можно добавлять в любой момент. Можно до выполнения промиса (они подождут), а можно - после (выполнятся в ближайшее время, через асинхронную очередь).

Например:

    // Промис выполнится сразу же
    var promise = new Promise((resolve, reject) => resolve(1));

    // PromiseState = 'resolved'
    // PromiseResult = 1

    // Добавили обработчик к выполненному промису
    promise.then(alert); // ...он сработает тут же

Разумеется, можно добавлять и много обработчиков на один и тот же промис:

    var promise = new Promise((resolve, reject) => resolve(1));

    promise.then(function f1(result) {
        alert(result);
        return 'f1';
    });

    promise.then(function f2(result) {
        alert(result);
        return 'f2';
    });

Вид обьекта promise после этого:
