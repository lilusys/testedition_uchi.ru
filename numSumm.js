"use strict";
var theFirstNumber = addRandomNum(6, 9); //первое рандомно взятое число из заданного диапазона a ~ [6, 9]
var theFinalNumber = addRandomNum(11, 14); //итоговая сумма чисел из заданного диапазона b ~ [11, 14]
var theSecondNumber; //второй операнд, вычисляется разностью двух других
var canvas, context;

theSecondNumber = theFinalNumber - theFirstNumber;

document.getElementById("writehere").innerHTML = '<span id="colorFN">' + theFirstNumber + '</span>' 
												  + ' + ' + '<span id="colorSND">' + 
												  theSecondNumber + '</span>' + ' = <span id="question">?</span>';

	canvas = document.getElementById("path");
	context = canvas.getContext('2d');
	canvas.height = 75;
    canvas.width = 875;
	
drawArc (theFirstNumber, 39, 75, context);

document.getElementById("addNumHere").innerHTML = '<input id="theFN" type="text" ' + 
												  'oninput="rightAnswer()">';
document.getElementById("theFN").style.marginLeft = 39 * (theFirstNumber + 1) / 2 +'px';
document.getElementById("theFN").style.bottom = (15 * theFirstNumber + 10) + 'px';


/* * * * * * * * * 
Рандом для заданного отрезка
 scnd + 1 - для включения верхней границы в диапазон
* * * * * * * * */
function addRandomNum(fst, scnd) {
	var fin = 0;
	fin = fst + Math.floor(Math.random() * (scnd + 1 - fst)) ;
	return fin;
}

/* * * * * * * * *
Рисуем дугу:
fst - число, с помощью него ищем конечные координаты дуги;
koo1 - начальная координата отрисовки по оси Х;
koo2 - начальная координата отрисовки по оси Y;
cont - область рисования.
* * * * * * * * */
function drawArc(fst, koo1, koo2, cont) {
	context.moveTo(koo1,koo2);
	context.quadraticCurveTo((koo1+39*fst/2), koo2-15*fst, koo1+39*fst, koo2);
	context.moveTo(koo1+39*fst,koo2);
	context.lineTo(koo1+39*fst-17, koo2-3);
	context.moveTo(koo1+39*fst,koo2);
	context.lineTo(koo1+39*fst-10, koo2-15);
	context.stroke();
}

/* * * * * * * * *
	Обработчик oninput для первого операнда, параллельно создает второй input для ввода.
	39px - длина одной единицы на линейке,
	33px - сумма половин сторон (17 + 16) для вычисления внешнего отступа input-а под центр второй дуги.
* * * * * * * * */
function rightAnswer() {
	var value = document.getElementById("theFN").value;
	if (theFirstNumber == value) {
		drawArc (theSecondNumber, (39*(theFirstNumber + 1)), 75, context);
		document.getElementById("theFN").disabled = "disabled";
		document.getElementById("theFN").className = "rightans";
		if (document.getElementById("colorFN").classList.contains("colorOn")) 
				document.getElementById("colorFN").classList.remove("colorOn");
				
		var inp = document.createElement('input'); //т.к. при innerHTML структура form обновляется, а нужно добавить к существующему
		inp.type = "text";
		inp.style.marginLeft = ((39*(theFirstNumber + theSecondNumber)/2)-33) +'px';
		inp.id = "theSD";
		inp.addEventListener("input", rightAnswerToo);
		document.getElementById("addNumHere").appendChild(inp);		
	}
	else {
		document.getElementById("theFN").className = "notrightans";
		document.getElementById("colorFN").className = "colorOn";
	}
	
}

/* 	Обработчик oninput для второго операнда, параллельно создает третий input для результата. */
function rightAnswerToo() {
	var value1 = document.getElementById("theSD").value;
	if (theSecondNumber == value1) {
		document.getElementById("theSD").disabled = "disabled";
		document.getElementById("theSD").className = "rightans";
		if (document.getElementById("colorSND").classList.contains("colorOn"))
				document.getElementById("colorSND").classList.remove("colorOn");	
		document.getElementById("question").innerHTML = '<input id="finNum" type="text" ' + 
														'oninput="finSumm()">';
	}
	else {
		document.getElementById("theSD").className = "notrightans";
		document.getElementById("colorSND").className = "colorOn";
	}
}

/* Обработчик oninput для результата */
function finSumm() {
	var finValue = document.getElementById("finNum").value;
	if (theFinalNumber == finValue) {
		document.getElementById("question").innerHTML = theFinalNumber;
	}
	else {
		document.getElementById("finNum").className = "notrightans";
	}
	
}