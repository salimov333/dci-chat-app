//console.log("test");

//API
const API_URL = "https://dci-chat-api.herokuapp.com"
const get_URL = `${API_URL}/messages`;
const post_URL = `${API_URL}/new`;

//Dom Elemente selektieren
const form = document.querySelector(".form");
const nameInput = document.querySelector("#name");
const messageIput = document.querySelector("#message");
const message_container = document.querySelector(".message_container");
const sendBtn = document.querySelector("#sendBtn");

//get message
async function getMessage() {
    try {
        nameInput.focus();
        const res = await fetch(get_URL);
        if (res.ok) {
            const messages = await res.json();
            console.log(messages);
            messages.forEach(mes => {
                const newMessage = renderMessage(mes.from, mes.message, mes.id);
                message_container.append(newMessage);
            });
        } else {
            console.log(res.statusText);
            return Promise.reject(res);
        }
    } catch (error) {
        console.warn('Something went wrong.', error);
    }
};

function renderMessage(from, message, id) {

    const messageDiv = document.createElement("div");
    const fromEl = document.createElement("h2");
    const messageEl = document.createElement("p");
    const deleteBtn = document.createElement('button');

    fromEl.textContent = from;
    messageEl.textContent = message;
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target);
        deleteMessage(id);
        const toDeleteDiv = e.target.closest("div");
        console.log(toDeleteDiv);
        toDeleteDiv.remove();
    });

    messageDiv.id = "message" + id;
    messageDiv.append(deleteBtn, fromEl, messageEl);
    return messageDiv;
}

getMessage();

//post message
async function createMessage(e) {
    e.preventDefault();
    //console.log(e.target);
    const nameValue = nameInput.value;
    const messageValue = messageIput.value;
    if (!nameValue || !messageValue) {
        console.log("empty field");
        return;
    }
    // console.log(nameValue);
    // console.log(messageValue);
    const payload = {
        from: nameValue,
        message: messageValue
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    };

    try {
        const res = await fetch(post_URL, options);
        if (res.ok) {
            const postedMessage = await res.json();
            //console.log(postedMessage);
            const newMessageDiv = renderMessage(postedMessage.from, postedMessage.message);
            message_container.append(newMessageDiv);

        } else {
            console.log(res.statusText);
            return Promise.reject(res);
        }
    } catch (error) {
        console.warn('Something went wrong.', error);
    }
};

//delete message
async function deleteMessage(id) {
    // const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            const deletedMessage = await res.json();
            console.log(deletedMessage);
            console.log(id);

        } else {
            console.log(res.statusText);
            return Promise.reject(res);
        }
    } catch (error) {
        console.warn('Something went wrong.', error);
    }
};

//Events
form.addEventListener("submit", createMessage);