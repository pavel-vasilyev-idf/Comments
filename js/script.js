const filterByType = (type, ...values) => values.filter(value => typeof value === type), //фильтрация значенией 

	hideAllResponseBlocks = () => { // новая функция
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создание массива из селектора
		responseBlocksArray.forEach(block => block.style.display = 'none'); //перебор массива с заданием каждому элементу css свойства display: none;
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //новый метод, принимающий 3 параметра
		hideAllResponseBlocks(); // выполнение функции hideAllResponseBlocks выше
		document.querySelector(blockSelector).style.display = 'block'; //динамический поиск селектора из параметра blockSelector и задание ему свойства display: block;
		if (spanSelector) { //проверка на наличие spanSelector
			document.querySelector(spanSelector).textContent = msgText;//если spanSelector существует, то вписывать в него msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //функция запускает функцию showResponseBlock и открывает dialog__response-block_error и в элемент с тегом #error записывает значение msgText 

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //функция запускает функцию showResponseBlock и открывает dialog__response-block_ok и в элемент с тегом #ok записывает значение  msgText

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),//не принимает параметров функция 

	tryFilterByType = (type, values) => { //новая функция, принимающая 2 параметра 
		try { //первоначальные условия, пока не образуется ошибка
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");//фильтрует и собирает массив из полученных данных, записывает в переменную ввиде строки
			const alertMsg = (valuesArray.length) ? //проверяет наличие значение в строке valuesArray
				`Данные с типом ${type}: ${valuesArray}` : //если значения есть(> 0) то такая строка на выходе идет в переменную alertMsg
				`Отсутствуют данные типа ${type}`; //если false в условии, то эта строка и помещается в переменную alertMsg
			showResults(alertMsg); //запускается функция, принимающая ввиде параметра значение переменной alertMsg
		} catch (e) { //если в коде выше будет ошибка, то
			showError(`Ошибка: ${e}`); //выполнится функция, которая выведет описание ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); // переменная с новым элементом с id = #filter-btn

filterButton.addEventListener('click', e => { //событие клика
	const typeInput = document.querySelector('#type'); //переменная с селектором #type
	const dataInput = document.querySelector('#data');//переменная с селектором #data

	if (dataInput.value === '') { //проверка на пустую строку
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // если проверка успешна, то устанавливаем спец.значение в dataInput
		showNoResults(); // и выполняем функцию showNoResults
	} else { //иначе 
		dataInput.setCustomValidity(''); // устанавливаем спец.значение пустым
		e.preventDefault(); // скидываем стандартное поведение браузера
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // фильтруем массив, с обрезанием пробелов по значениям из поля dataInput
	}
});

