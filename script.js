const mostraTodo = document.getElementById("mostraTodo");
const mostraUna = document.getElementById("mostraUna");
const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");

let n;
let soluciones;
let h;
mostraUna.addEventListener("click", function () {
    let solucionNumero = parseInt(
        document.getElementById("solucionNumero").value
    );
    n = parseInt(document.getElementById("numero").value);
    if (!n) {
        alert("Debes ingresar el numero de reinas");
    } else {
        soluciones = nReinas(n);
        h = ``;
        soluciones[solucionNumero - 1].forEach((row, indexRow) => {
            m = ``;
            row.split("").forEach((reina, indexReina) => {
                if (indexRow % 2 === 0) {
                    if (indexReina % 2 === 0) {
                        a = ``;
                    } else {
                        a = `class="button1"`;
                    }
                } else {
                    if (indexReina % 2 === 0) {
                        a = `class="button1"`;
                    } else {
                        a = ``;
                    }
                }

                if (reina === "R") {
                    b = '<img src="img/re.PNG">'; //'♛'
                } else {
                    b = "";
                }

                m += `<td><button ${a}>${b}</button></td>`;
            });
            h += `
    <tr class="row">
      ${m}
    </tr>
    `;
        });
        h2 =
            `
    <h5>Solución N° ${solucionNumero}</h5>
    <table>` +
            h +
            `</table>
  `;
        a2.innerHTML = h2;
    }
});

mostraTodo.addEventListener("click", function () {
    h1 = ``;
    n = parseInt(document.getElementById("numero").value);
    soluciones = nReinas(n);
    soluciones.forEach((solucion, index) => {
        h = ``;
        solucion.forEach((row, indexRow) => {
            m = ``;
            row.split("").forEach((reina, indexReina) => {
                if (indexRow % 2 === 0) {
                    if (indexReina % 2 === 0) {
                        a = ``;
                    } else {
                        a = `class="button1"`;
                    }
                } else {
                    if (indexReina % 2 === 0) {
                        a = `class="button1"`;
                    } else {
                        a = ``;
                    }
                }

                if (reina === "R") {
                    b = '<img src="img/re.PNG">'; //'♛'
                } else {
                    b = "";
                }

                m += `<td><button ${a}>${b}</button></td>`;
            });

            h += `
      <tr class="row">
        ${m}
      </tr>
      `;
        });
        h1 +=
            `
    <div class="m-2 d-flex justify-content-center align-items-center flex-column">
      <h5>Numero: ${index + 1}</h5>
      <table>` +
            h +
            `</table>
    </div>
    `;
    });
    a1.innerHTML =
        `<h5 class="m-2">Todas las soluciones para ${n} reinas</h5>` + h1;
});

//funcion para las reinas
function nReinas(n) {
    let soluciones = [];
    let tablero = [];
    for (let j = 0; j < n; j++) {
        let filaTablero = [];
        for (let i = 0; i < n; i++) {
            filaTablero.push(".");
        }
        tablero.push(filaTablero);
    }
    //
    function sePuede(row, col) {
        //izq
        for (let i = 0; i < col; i++) {
            if (tablero[row][i] === "R") {
                return false;
            }
        }
        //diagonal sup izq
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (tablero[i][j] === "R") {
                return false;
            }
        }
        //diagonal inf izq
        for (let i = row, j = col; i < n && j >= 0; i++, j--) {
            if (tablero[i][j] === "R") {
                return false;
            }
        }
        return true;
    }
    //encuentra todas las formas de soluciones posibles
    function reina(col) {
        //itera hasta colocar todas las reinas segun el valor de n
        if (col === n) {
            const solucion = tablero.map((row) => row.join(""));
            soluciones.push(solucion);
            return;
        }
        //se itera con una reina a cada fila de la columna actual y asi sucesivamente
        for (let row = 0; row < n; row++) {
            if (sePuede(row, col)) {
                //posicion que si puede la reina estar
                tablero[row][col] = "R";
                //itera en la otra columna
                reina(col + 1);
                //si se puede en la otra fila
                tablero[row][col] = ".";
            }
        }
    }
    reina(0); //desde la primera columna se empieza a iterar
    return soluciones;
}
