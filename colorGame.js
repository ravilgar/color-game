var colors = generateRandomColors(6); //цвета для угадывания
var squares = document.querySelectorAll(".square"); //array квадратиков со сгенерированными цветами
var pickedColor = pickColor(); //отгадываемый цвет
var colorDisplay = document.querySelector("#colorDisplay"); //span RGB
var messageDisplay = document.querySelector("#message"); //сообщить о результате
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset"); //кнопка New color
var changeTypeBtns = document.querySelectorAll(".changeTypeBtns"); // кнопки смены типа представления цвета
var checkType = 'rgbBtn'; // проверка типа

//при нажатии кнопки 
resetButton.addEventListener("click", function() {
    colors = generateRandomColors(6);
    pickedColor = pickColor();
    if (checkType === 'rgbBtn') {
        colorDisplay.textContent = pickedColor;
    }
    if (checkType === 'hexBtn') {
        colorDisplay.textContent = "#" + getHexRGBColor(pickedColor);
    }
    messageDisplay.textContent = "";

    for (var i = 0; i < squares.length; i++) {
        //назначаем цвета квадратикам
        squares[i].style.backgroundColor = colors[i];
    }
});

colorDisplay.textContent = pickedColor;


for (var i = 0; i < colors.length; i++) {
    //назначаем цвета квадратикам
    squares[i].style.backgroundColor = colors[i];
    //выведем в консоль
    console.log(squares[i].style.backgroundColor);

    //добавляем click listener для squares
    squares[i].addEventListener("click", function() {
        //берем значение цвета с выбранного квадрата
        var clickedColor = String(this.style.backgroundColor);

        //вывод информации для разработчика в консоль
        console.log("clickedColor is " + clickedColor);
        console.log(typeof clickedColor);
        console.log("pickedColor is " + pickedColor);
        console.log(typeof(pickedColor));
        console.log("///////////////");

        //сравниваем color с pickedColor
        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "Правильно!";

            // красим все квадратики в угаданный цвет;
            for (var i = 0; i < squares.length; i++) {
                squares[i].style.backgroundColor = pickedColor;
            }
            h1.style.backgroundColor = pickedColor;
            resetButton.style.backgroundColor = pickedColor;
        } else {
            //квадратик исчезает
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Попробуй еще!";
        }
    });
}


function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//генерируем array с num случайных цветов
function generateRandomColors(num) {
    //создаем array
    var arr = [];
    // добавляем num случайных цветов в array;
    for (var i = 0; i < num; i++) {
        arr.push(randomColors());
    }
    //возвращаем array
    return arr;
}

// генерируем случайный цвет
function randomColors() {
    // выбор красного оттенка от 0 до 255
    var r = Math.floor(Math.random() * 256);
    // выбор зелего оттенка от 0 до 255
    var g = Math.floor(Math.random() * 256);
    // выбор синего оттенка от 0 до 255
    var b = Math.floor(Math.random() * 256);

    var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
    return rgb;
}

for (var i = 0; i < changeTypeBtns.length; i++) {
    changeTypeBtns[i].addEventListener("click", function(e) {
        for (var i = 0; i < changeTypeBtns.length; i++) {
            changeTypeBtns[i].classList.add("white");
        };
        console.log(e.target.classList.remove("white"));
        if (e.target.id == 'rgbBtn') {
            checkType = 'rgbBtn';
            colorDisplay.textContent = pickedColor;
        }
        if (e.target.id == 'hexBtn') {
            checkType = 'hexBtn';
            colorDisplay.textContent = "#" + getHexRGBColor(pickedColor);
        }
    });
    console.log(changeTypeBtns[i]);
}


function getHexRGBColor(color) {
    color = color.replace(/\s/g, "");
    var aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);

    if (aRGB) {
        color = '';
        for (var i = 1; i <= 3; i++) color += Math.round((aRGB[i][aRGB[i].length - 1] == "%" ? 2.55 : 1) * parseInt(aRGB[i])).toString(16).replace(/^(.)$/, '0$1');
    } else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');

    return color;
}
