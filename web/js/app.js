
function byId(id) { return document.getElementById(id); }
function qs(sel, root=document) { return root.querySelector(sel); }
function qsa(sel, root=document) { return Array.from(root.querySelectorAll(sel)); }

function normalizeNumber(str) {

    return (str || "").trim().replace(",", ".");
}

function validate({ x, y, r }) {
    if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(r)) return false;
    if (x < -3 || x > 3) return false;
    if (r < 1 || r > 4) return false;
    // y — один из фиксированных радиобаттонов, отдельной проверки не нужно,
    // но на всякий проверим диапазон из разметки (-3..5)
    if (y < -3 || y > 5) return false;
    return true;
}

function prependCell(container, text) {
    const div = document.createElement("div");
    div.textContent = text;
    div.style.borderTop = "1px solid #000000";
    container.prepend(div);
}

window.addEventListener("DOMContentLoaded", () => {
    const submitBtn = byId("submit");
    const resultBox = byId("result");

    submitBtn.addEventListener("click", async () => {
        // собираем значения
        const xVal = normalizeNumber(byId("x-input")?.value);
        const yInput = qs("input[name='y-value']:checked");
        const rVal = normalizeNumber(byId("r-input")?.value);

        const payload = {
            x: Number(xVal),
            y: yInput ? Number(yInput.value) : NaN,
            r: Number(rVal),
        };

        if (!validate(payload)) {
            alert("Некорректные данные");
            return;
        }

        // готовим URL c query string
        const params = new URLSearchParams({
            x: String(payload.x),
            y: String(payload.y),
            r: String(payload.r),
        });

        try {
            const resp = await fetch(`/fcgi-bin/?${params.toString()}`, {
                method: "GET",
                headers: { "Accept": "application/json" },
            });

            if (!resp.ok) {
                throw new Error(`HTTP ${resp.status}`);
            }

            const data = await resp.json();

            if (data.error != null) {
                alert("Ответ от сервера не получен");
                console.log(data);
                return;
            }

            // порядок как в твоём шаблоне: Время, X, Y, R, Попал?, Время выполнения
            // (достигается последовательными prepend в обратном порядке)
            prependCell(resultBox, `${data.exec_time} ms`);
            prependCell(resultBox, data.result ? "Да" : "Нет");
            prependCell(resultBox, String(payload.r));
            prependCell(resultBox, String(payload.y));
            prependCell(resultBox, String(payload.x));

            const timeOnly = (data.current_time || "").split(" ")[1] || "";
            prependCell(resultBox, timeOnly);

        } catch (err) {
            alert(`Ошибка запроса: ${err.message}`);
            console.error(err);
        }
    });
});
