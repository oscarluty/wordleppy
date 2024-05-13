document.addEventListener("DOMContentLoaded", function () {
    const guessButton = document.getElementById("guess-button");

    guessButton.addEventListener("click", function () {
        const input = document.getElementById("guess-input").value;
        console.log("Valor ingresado:", input);
        let divInicio = document.getElementById("inicio");
        divInicio.style.display = "none";

        //logica
        let resultElement = document.querySelector('.result');
        let mainContainer = document.querySelector(".main-container")
        let rowId = 1;
        let word = input;
        let wordArray = word.toUpperCase().split('');
        let index = 0;
        let idText = 0;


        let actualRow = document.querySelector('.row');
        let squares = actualRow.querySelectorAll('.square');

        console.log('actualRow', actualRow);

        drawSquares(actualRow, idText);
        listenInputs(actualRow);
        addFocus(actualRow);
        createVirtualKeyboard(actualRow);

        function listenInputs(actualRow) {
            squares = actualRow.querySelectorAll('.square');
            squares = [...squares]

            let userInput = []

            squares.forEach(element => {
                element.addEventListener('input', event => {
                    //si no se ha borrado
                    if (event.inputType !== 'deleteContentBackward') {
                        //recoger el ingreso del usuario y lo vuelve mayuscula
                        userInput.push(event.target.value.toUpperCase())
                        //enviamos el cursor al siguiente input, solo si hay siguiente input
                        if (event.target.nextElementSibling) {
                            event.target.nextElementSibling.focus();                            //index++;
                        } else {
                            idText++;
                            console.log("else" + idText);
                            //crear arreglo con las letras 

                            //buscar el contenido de la fila anterior
                            //armar un arreglo con el resultado de comparar
                            let squareFilled = document.querySelectorAll('.square');
                            squareFilled = [...squareFilled];
                            let lastFiveSquareFilled = squareFilled.slice(-5);
                            let finalUserInput = [];
                            lastFiveSquareFilled.forEach(element => {
                                finalUserInput.push(element.value.toUpperCase());
                            });
                            console.log(finalUserInput);
                            idText++;
                            console.log("else" + idText);
                            console.log(squares);
                            //cambiar estilo si existe la letra en otra posicion
                            let existIndexArray = existLetter(wordArray, finalUserInput);
                            existIndexArray.forEach(element => {
                                squares[element].classList.add('gold');
                            });
                            //comparar arreglos para cambiar color de inputs
                            let rightIndex = compareArrays(wordArray, finalUserInput);
                            rightIndex.forEach(element => {
                                squares[element].classList.add('green');
                            });
                            //si los arreglos son iguales
                            if (rightIndex.length == wordArray.length) {
                                showResult("Ganaste!");
                                return;
                            }
                            //crear una nueva fila
                            let actualRow = createRow();
                            if (!actualRow) {
                                return;
                            }
                            idText++;
                            console.log("id:", actualRow.id);
                            if (actualRow.id == 2) {
                                drawSquares(actualRow, 5);
                            }else if (actualRow.id ==3){
                                drawSquares(actualRow, 10);
                            }else if (actualRow.id == 4){
                                drawSquares(actualRow, 15);
                            }else if (actualRow.id == 5){
                                drawSquares(actualRow, 20);
                            }else if (actualRow.id == 6){
                                drawSquares(actualRow, 25);
                            }
                            listenInputs(actualRow);
                            addFocus(actualRow);
                        }
                    } else {
                        userInput.pop();
                    }
                })
            })

        }

        //funciones

        function createVirtualKeyboard() {

            var keyboardDiv = document.getElementById("keyboard");
            keyboardDiv.innerHTML = ""; // Limpiar el contenido anterior del teclado virtual

            var keyboardLayout = [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
                [ 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
            ];

            keyboardLayout.forEach(row => {
                row.forEach(key => {
                    var keyElement = document.createElement("div");
                    keyElement.textContent = key;
                    keyElement.classList.add("key");
                    keyElement.onclick = function () {

                        //El sistema reconoce el valor del caracter en 'key'
                        appendToInput(key, index);
                        console.log("prueba: ", idText);
                        idText++;
                        index++;
                        if (idText === 5 || idText === 10 || idText === 15 || idText === 20 || idText === 25) {
                            //idText++;
                            console.log("else" + idText);
                            //crear arreglo con las letras 

                            //buscar el contenido de la fila anterior
                            //armar un arreglo con el resultado de comparar
                            let squareFilled = document.querySelectorAll('.square');
                            squareFilled = [...squareFilled];
                            let lastFiveSquareFilled = squareFilled.slice(-5);
                            let finalUserInput = [];
                            lastFiveSquareFilled.forEach(element => {
                                finalUserInput.push(element.value.toUpperCase());
                            });
                            console.log(finalUserInput);
                            //idText++;
                            console.log("else" + idText);
                            console.log(squares);
                            //cambiar estilo si existe la letra en otra posicion
                            let existIndexArray = existLetter(wordArray, finalUserInput);
                            existIndexArray.forEach(element => {
                                squares[element].classList.add('gold');
                            });
                            //comparar arreglos para cambiar color de inputs
                            let rightIndex = compareArrays(wordArray, finalUserInput);
                            rightIndex.forEach(element => {
                                squares[element].classList.add('green');
                            });
                            //si los arreglos son iguales
                            if (rightIndex.length == wordArray.length) {
                                showResult("Ganaste!");
                                return;
                            }
                            //crear una nueva fila
                            let actualRow = createRow();
                            if (!actualRow) {
                                return;
                            }
                            //idText++;
                            console.log("id:", actualRow.id);
                            console.log("id:", actualRow.id);
                            if (actualRow.id == 2) {
                                drawSquares(actualRow, 5);
                            }else if (actualRow.id ==3){
                                drawSquares(actualRow, 10);
                            }else if (actualRow.id == 4){
                                drawSquares(actualRow, 15);
                            }else if (actualRow.id == 5){
                                drawSquares(actualRow, 20);
                            }else if (actualRow.id == 6){
                                drawSquares(actualRow, 25);
                            }
                            console.log("hola");
                            listenInputs(actualRow);
                            addFocus(actualRow);
                        }
                    };
                    keyboardDiv.appendChild(keyElement);
                });
            });
        }

        function appendToInput(character, idText) {
            var input = document.getElementById(`textInput${idText}`);
            input.value += character;
            console.log(input);
            console.log(index);
            document.getElementById("keyboard").addEventListener("click", (e) => {
                const target = e.target;
                if (!target.classList.contains("key")) {
                    return;
                }
                let key = target.textContent;

                if (key === "BORRAR") {
                    key = "Backspace";
                }
                document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
            });

        }

        function compareArrays(array1, array2) {
            let iqualsIndex = []
            array1.forEach((element, index) => {
                if (element == array2[index]) {
                    console.log(`En la posicion ${index} si son iguales`);
                    iqualsIndex.push(index);
                } else {
                    console.log(`En la posicion ${index} no son iguales`);
                }
            });
            return iqualsIndex;
        }

        function existLetter(array1, array2) {
            let existIndexArray = [];
            array2.forEach((element, index) => {
                if (array1.includes(element)) {
                    existIndexArray.push(index)
                }
            });
            return existIndexArray;
        }

        function createRow() {
            rowId++;
            if (rowId <= 6) {
                let newRow = document.createElement("div");
                newRow.classList.add("row");
                newRow.setAttribute("id", rowId);
                mainContainer.appendChild(newRow);
                return newRow;
            } else {
                showResult(`Perdiste! la palabra era ${word.toUpperCase()}`);
            }
        }

        function drawSquares(actualRow, i) {
            wordArray.forEach((item, idText) => {
                console.log("prueba:", idText);
                if (idText === 0 || idText === 5 || idText === 10 || idText === 15 || idText === 20) {
                    actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus" id="textInput${i++}">`
                } else {
                    actualRow.innerHTML += `<input type="text" maxlength="1" class="square" id="textInput${i++}">`
                }
            });
        }

        function addFocus(actualRow) {
            let focusElement = actualRow.querySelector('.focus');
            focusElement.focus();
        }

        function showResult(textMsg) {
            resultElement.innerHTML = `
    <p>${textMsg}</p>
    <button class="button">Reiniciar</button>`
            let resetBtn = document.querySelector('.button');
            resetBtn.addEventListener('click', () => {
                location.reload();
            });
        }


    });


});