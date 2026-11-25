
const form = document.getElementById("taskForm");

const input = document.getElementById("taskInput");

const list = document.getElementById("taskList");

const count = document.getElementById("count");

const clearDone = document.getElementById("clearDone");

const filterButtons = document.querySelectorAll(".filter");


let filter = "all";

let tasks = [
    { id: 1, text: "Academia", done: false },
    { id: 2, text: "estudar javascript", done: false }
];

function render() {

    const pending = tasks.filter(t => !t.done).length;

    count.textContent = pending +
        (pending === 1 ? " pendente" : " pendentes");

    clearDone.disabled = !tasks.some(t => t.done);

    filterButtons.forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.filter === filter
        );
    });


    const visible = tasks.filter(task => {

        if (filter === "pending") return !task.done;

        if (filter === "done") return task.done;

        return true;

    });

    list.innerHTML = "";

    
    if (visible.length === 0) {

        const empty = document.createElement("li");

        empty.className = "empty";

        empty.textContent = "Nenhuma tarefa encontrada.";

        list.appendChild(empty);

        return;
    }

    
    visible.forEach(task => {

        const item = document.createElement("li");

        item.className = "task";

        if (task.done) {
            item.classList.add("done");
        }

        
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.done;

        checkbox.addEventListener("change", () => {

            task.done = checkbox.checked;

            render();

        });

    
        const label = document.createElement("span");

        label.textContent = task.text;

        
        const remove = document.createElement("button");

        remove.className = "delete";

        remove.textContent = "×";

        remove.addEventListener("click", () => {

            tasks = tasks.filter(t => t.id !== task.id);

            render();

        });

        item.append(checkbox, label, remove);

        list.appendChild(item);

    });

}

form.addEventListener("submit", event => {

    event.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    tasks.push({

        id: Date.now(),

        text: text,

        done: false

    });

    input.value = "";

    filter = "all";

    render();

});


filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        filter = btn.dataset.filter;

        render();

    });

});


clearDone.addEventListener("click", () => {

    tasks = tasks.filter(t => !t.done);

    render();

});


render();


function criarCoracao() {
    const coracao = document.createElement("div");

    coracao.className = "heart-floating";

    const emojis = ["💗", "💕", "💖", "💘", "💓", "💞"];

    coracao.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

    coracao.style.left = Math.random() * 100 + "vw";

    coracao.style.fontSize = (18 + Math.random() * 20) + "px";

    const duracao = 5 + Math.random() * 5;

    coracao.style.animationDuration = duracao + "s";

    document.body.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    }, duracao * 1000);
}

setInterval(criarCoracao, 500);