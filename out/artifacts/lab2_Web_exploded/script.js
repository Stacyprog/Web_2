const MIN_Y = -5;
const MAX_Y = 5;
const AVAILABLE_X = ["-2", "-1.5", "-1", "-0.5", "0", "0.5", "1", "1.5", "2"];
const AVAILABLE_R = ["1", "2", "3", "4", "5"];


const headerImage = document.getElementById('header_image');
const errorMessage = document.getElementById('errors');
const submitButton = document.getElementById('submit');
const xCheckBoxes = document.querySelectorAll('input[name="x"]');
const rInput = document.getElementById('r');
const yText = document.getElementById('y');
const catAdv = document.getElementById('fix');
const styles = document.getElementById('styles');

window.addEventListener('message', handlerMessage);
submitButton.addEventListener("click", onSubmit);


function asyncRequest(url, method = 'POST') {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    return xhr;
}


const startHooker = (() => {
    let started = false;
    let previous = false;

    const hooker = () => {
        const req = asyncRequest(`${jspContextPath}/controller`);
        req.responseType = 'json';
        setTimeout(hooker, 1000);
    };

    return () => {
        if (started) {
            return;
        }

        started = true;
        setTimeout(hooker, 1);
    };
})();


function onSubmit(event) {
    let check = true;
    if(!checkX()) {
        check = false;
    }
    if (!checkY()) {
        check = false;
    }
    if (!checkR()) {
        check = false;
    }
    if (!check) {
        event.preventDefault();
    }
}


function checkX() {
    let selected = null;

    for (let i = 0; i < xCheckBoxes.length; i++) {
        if (xCheckBoxes[i].checked) {
            if (selected) {
                error1.innerHTML = "Введите только одно значение Х";
                return false;
            }
            else error1.innerHTML = null;

            if (AVAILABLE_X.indexOf(xCheckBoxes[i].value) === -1)   {
                error1.innerHTML = "Введите значение X кооректно";
                return false;
            }
            else error1.innerHTML = null;

            selected = xCheckBoxes[i].value;
        }
    }

    if (!selected) {
        error1.innerHTML = "Введите значение X";
        return false;
    }
    else error1.innerHTML = null;
    return true;
}

function checkY() {
    const y = (yText.value = yText.value.trim()).replace(',', '.');

    if (y.length === 0) {
        error2.innerHTML = "Введите значение У";
        return false;
    }
    else error2.innerHTML = null;

    if (isNaN(+y)) {
        error2.innerHTML = "Введите значение У";
        return false;
    }
    else error2.innerHTML = null;

    let val = +y;
    if (val <= MIN_Y || val >= MAX_Y) {
        error2.innerHTML = "Введите значение У";
        return false;
    }
    else error2.innerHTML = null;
    return true;
}


let rValue = '';
let rForCheck='';
function changeR() {
    let selectedR =document.getElementById('r').selectedIndex;
    let options=document.getElementById('r').options;
    rForCheck = options[selectedR].value;
    rValue = Number(options[selectedR].value);
    graphView(rValue);
}


function checkR() {
    if (rForCheck === '') {
        error3.innerHTML = "Введите значение R";
        return false;
    }
    else error3.innerHTML = null;

    if (AVAILABLE_R.indexOf(rForCheck) === -1) {
        error3.innerHTML = "Введите значение R";
        return false;
    }
    else error3.innerHTML = null;
    return true;
}

let redrawGraphView = () => graphView(null);

function handlerMessage(e) {
    if (e.data.hasOwnProperty('history')) {
        points = e.data.history;
        redrawGraphView();
        if (points.length === 0) {
            return;
        }
    }

    if (e.data.hasOwnProperty('height')) {
        const frame = document.getElementById('result_frame');
        const bounds = frame.getBoundingClientRect();
        frame.style.height = Math.max(bounds.bottom - bounds.top, e.data.height) + 'px';
    }

    if (e.data.hasOwnProperty('current')) {
        if (e.data.current === 1) {
            return false;
        }

    }
}

function graphView(r) {
    const canvas = document.getElementById("graph");
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
//прямоугольник
    context.beginPath();
    context.rect(20, 135, 230, 115);
    context.closePath();
    context.strokeStyle = "#228B22";
    context.fillStyle = "#228B22";
    context.fill();
    context.stroke();

// сектор
    context.beginPath();
    context.moveTo(250, 250);
    context.arc(250, 250, 230, 0, Math.PI / 2);
    context.closePath();
    context.strokeStyle = "#228B22";
    context.fillStyle = "#228B22";
    context.fill();
    context.stroke();

//треугольник
    context.beginPath();
    context.moveTo(250, 250);
    context.lineTo(250, 365);
    context.lineTo(20, 250);
    context.lineTo(250, 250);
    context.closePath();
    context.strokeStyle = "#228B22";
    context.fillStyle = "#228B22";
    context.fill();
    context.stroke();

//отрисовка осей
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.beginPath();
    context.font = "14px Courier New";
    context.moveTo(250, 0);
    context.lineTo(250, 500);
    context.moveTo(250, 0);
    context.lineTo(245, 15);
    context.moveTo(250, 0);
    context.lineTo(255, 15);
    context.fillText("Y", 260, 10);
    context.moveTo(0, 250);
    context.lineTo(500, 250);
    context.moveTo(500, 250);
    context.lineTo(485, 245);
    context.moveTo(500, 250);
    context.lineTo(485, 255);
    context.fillText("X", 490, 235);

// деления
    const R = r == null ? "R" : r;
    const halfR = r == null ? "R/2" : r / 2;

    context.moveTo(245, 20);
    context.lineTo(255, 20);
    context.fillText(R, 255, 25);
    context.moveTo(245, 135);
    context.lineTo(255, 135);
    context.fillText(halfR, 255, 140);
    context.moveTo(245, 365);
    context.lineTo(255, 365);
    context.fillText(`-${halfR}`, 255, 370);
    context.moveTo(245, 480);
    context.lineTo(255, 480);
    context.fillText(`-${R}`, 255, 485);
    context.moveTo(20, 245);
    context.lineTo(20, 255);
    context.fillText(`-${R}`, 15, 240);
    context.moveTo(135, 245);
    context.lineTo(135, 255);
    context.fillText(`-${halfR}`, 130, 240);
    context.moveTo(365, 245);
    context.lineTo(365, 255);
    context.fillText(halfR, 360, 240);
    context.moveTo(480, 245);
    context.lineTo(480, 255);
    context.fillText(R, 475, 240);

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();

    drawPoints(r, canvas, context);
    redrawGraphView = () => graphView(r);

    if (r != null) {
        canvas.onclick = (event) => {
            if (!checkR()) {
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const visualX = Math.floor(event.clientX - rect.left);
            const visualY = Math.floor(event.clientY - rect.top);

            const centerX = 250;
            const centerY = 250;
            const zoomX = 230 / r;
            const zoomY = 230 / r;

            sendForm({
                fromCanvas: true,
                x: (visualX - centerX) / zoomX,
                y: (centerY - visualY) / zoomY,
                r: r
            });
        };
    } else {
        canvas.onclick = () => {
            checkR();
        }
    }
}


const correctImage = new Image();
correctImage.src = jspContextPath +'/img/yelRound.png';
const wrongImage = new Image();
wrongImage.src = jspContextPath +'/img/regRound.png';

let points = [];
function drawPoints(r, canvas, context) {
    const centerX = 250;
    const centerY = 250;

    if (r != null) {
        const zoomX = 230 / r;
        const zoomY = 230 / r;

        points.forEach((point) => {
            if (point.r !== r) {
                return;
            }

            const visualX = centerX + point.x * zoomX;
            const visualY = centerY - point.y * zoomY;
            if (point.result===true){
                context.drawImage(correctImage, visualX - 3, visualY - 3, 10, 10);
            }
            else context.drawImage(wrongImage, visualX - 3, visualY - 3, 10, 10);
        });
    } else {
        points.forEach((point) => {
            const zoomX = 230 / point.r;
            const zoomY = 230 / point.r;

            const visualX = centerX + point.x * zoomX;
            const visualY = centerY - point.y * zoomY;
            if (point.result) {
                context.drawImage(correctImage, visualX - 15, visualY - 15, 30, 30);
            }
            else context.drawImage(wrongImage, visualX - 15, visualY - 15, 30, 30);
        });
    }
}

function sendForm(parameters) {
    //graphView(rValue);
    const form = document.createElement("form");
    form.action = `${jspContextPath}/controller`;
    form.method = "POST";
    form.target = "result_frame";
    form.style.display = "hidden";

    for (let parameter in parameters) {
        if (!parameters.hasOwnProperty(parameter)) {
            continue;
        }

        const field = document.createElement("input");
        field.type = "hidden";
        field.name = parameter;
        field.value = parameters[parameter];

        form.appendChild(field);
    }

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => form.remove(), 1);
}

graphView(null);
