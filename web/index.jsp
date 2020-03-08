<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>2 лаба</title>
    <meta charset="UTF-8">
    <script type="text/javascript">let jspContextPath = "${pageContext.request.contextPath}";</script>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/img/ITMO.png">
    <link rel="stylesheet" href="stylesheets/normal.css" id="styles">
</head>
<body>
<table class="main_table">
    <tr>
        <th class="up-text-wrap">
            <header>
                Соколова Анастасия Денисовна (Вариант №20121)
            </header>
        </th>
    </tr>
    <tr class="header">
        <td class="condition">
                    <p>Для проверки попадания точки в данную
                        область введите данные ниже и нажмите на кнопку.</p>
                    <p class="explanation"> (Область обозначена зеленым цветом на графике.) </p>
        </td>
        <td class="graphic">
            <canvas id="graph" width="500" height="500" class="graph-view"></canvas>
        </td>
            </div>
        </td>
    </tr>
    <tr class="choice">
        <td>
            <form id="my_form" action="${pageContext.request.contextPath}/controller"
                  target="result_frame" method="post" style="display: inline-block;">
                <table class="control">
                    <tr>
                        <td class="xxx">
                            <p class="panel__title"><label class="text">Введите X</label></p>
                            <table style="margin: 0 auto;">
                                <tr>
                                    <td>
                                        <div class="radiobox">
                                            <input type="radio" id="choice1"
                                                   name="x" value="-2">
                                            <label for="choice1">-2</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="radiobox">
                                            <input type="radio" id="choice2"
                                                   name="x" value="-1.5">
                                            <label for="choice2">-1.5</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="radiobox">
                                            <input type="radio" id="choice3"
                                                   name="x" value="-1">
                                            <label for="choice3">-1</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="radiobox">
                                            <input type="radio" id="choice4"
                                                   name="x" value="-0.5">
                                            <label for="choice4">-0.5</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="radiobox">
                                            <input type="radio" id="choice5"
                                                   name="x" value="0">
                                            <label for="choice5">0</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="radiobox">
                                            <input type="radio" id="choice6"
                                                   name="x" value="0.5">
                                            <label for="choice6">0.5</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="radiobox">
                                            <input type="radio" id="choice7"
                                                   name="x" value="1">
                                            <label for="choice7">1</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="radiobox">
                                            <input type="radio" id="choice8"
                                                   name="x" value="1.5">
                                            <label for="choice8">1.5</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="radiobox">
                                            <input type="radio" id="choice9"
                                                   name="x" value="2">
                                            <label for="choice9">2</label>
                                        </div>
                                    </td>
                                    <td>
                                        <p id="error1"></p>
                                    </td>
                            </table>
                        </td>
                        <td class="yyy">
                            <p class="panel__title"><label class="text" for="y">Введите Y (-5;5)</label></p>
                            <input type="text" name="y" id="y" placeholder="от -5 до 5">
                            <p id="error2"></p>
                        </td>
                        <td class="rrr">
                            <p class="panel__title"><label class="text">Введите R</label></p>
                            <div class="panel_r" id="r-button">
                                <select name="r" value="" id="r" onchange="changeR()">
                                    <option disabled selected value="">Выберите Y</option>
                                    <option class="text" id="r1" name="r" value="1">1</option>
                                    <option class="text" id="r2" name="r" value="2">2</option>
                                    <option class="text" id="r3" name="r" value="3">3</option>
                                    <option class="text" id="r4" name="r" value="4">4</option>
                                    <option class="text" id="r5" name="r" value="5">5</option>
                                </select>
                                <p id="error3"></p>
                            </div>
                        </td>
                        <td>
                            <button id="submit" type="submit" class="submit-btn">Проверить</button>
                        </td>
                    </tr>
                </table>
            </form>
        </td>
    </tr>

    <tr>
        <td>
            <iframe name="result_frame" id="result_frame" src="${pageContext.request.contextPath}/table.jsp"
                    scrolling="no" allowtransparency></iframe>
        </td>
    </tr>
</table>
<script src="${pageContext.request.contextPath}/script.js"></script>
<script>startHooker();</script>
</body>
</html>
