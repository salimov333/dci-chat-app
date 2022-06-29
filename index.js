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
const spinner = document.querySelector(".spinner-border");

//get message
async function getMessage() {
    try {
        nameInput.focus();
        const res = await fetch(get_URL);
        if (res.ok) {
            const messages = await res.json();
            console.log(messages);

            const renderPromises = messages.map(async msg => {
                const newMessage = await renderMessage(msg.from, msg.message, msg.id)
                message_container.prepend(newMessage);
            });
            await Promise.all(renderPromises);
            spinner.classList.add("d-none");
        } else {
            console.log(res.statusText);
            return;
        }
    } catch (error) {
        console.error('Something went wrong.', error);
    }
};
getMessage();

//render message
async function renderMessage(from, message, id) {

    const messageDiv = document.createElement("div");
    const fromEl = document.createElement("h2");
    const messageEl = document.createElement("p");
    const deleteBtn = document.createElement('button');
    const avatar = document.createElement("img");

    fromEl.textContent = from;
    messageEl.textContent = message;
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.title = "Delete message";

    deleteBtn.addEventListener("click", async (e) => {
        //e.preventDefault();
        //console.log(e.target);
        await deleteMessage(id);
        const toDeleteDiv = e.target.closest("div");
        //console.log(toDeleteDiv);
        toDeleteDiv.remove();
    });

    //get data from API-GitHub
    //Authentication: https://docs.github.com/en/rest/overview/resources-in-the-rest-api#authentication
    //Personal access tokens: https://github.com/settings/tokens
    const res = await fetch(`https://api.github.com/users/${from}`);

    const githubData = await res.json();
    //console.log(githubData);

    const name = githubData.name;
    //console.log(name);
    const avatarURL = githubData.avatar_url
    //console.log(avatarURL);


    if (name && avatarURL) {
        fromEl.textContent = name;
        avatar.src = avatarURL;
        avatar.classList.add("avatar");
        messageDiv.prepend(avatar);
    }

    messageDiv.id = "message" + id;

    messageDiv.appendChild(deleteBtn);
    messageDiv.appendChild(fromEl);
    messageDiv.appendChild(messageEl);


    return messageDiv;
};

//Events
form.addEventListener("submit", createMessage);

//post message
async function createMessage(e) {
    e.preventDefault();
    //console.log(e.target);
    const nameValue = nameInput.value.trim();
    //console.log(nameValue);
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
            const newMessageDiv = await renderMessage(postedMessage.from, postedMessage.message, postedMessage.id);
            message_container.prepend(newMessageDiv);
            nameInput.value = "";
            messageIput.value = "";

        } else {
            console.log(res.statusText);
            return;
        }
    } catch (error) {
        console.error('Something went wrong.', error);
    }
};

//delete message
async function deleteMessage(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            const deletedMessage = await res.json();
            console.log("deleted message", deletedMessage);
            //console.log(id);

        } else {
            console.log(res.statusText);
            return;
        }
    } catch (error) {
        console.error('Something went wrong.', error);
    }
};