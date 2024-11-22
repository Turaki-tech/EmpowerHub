function postUpdate() {
    const updateText = document.getElementById("updateText").value;

    if (updateText) {
        const updates = JSON.parse(localStorage.getItem("updates")) || [];
        updates.push({ text: updateText, date: new Date().toLocaleString() });
        localStorage.setItem("updates", JSON.stringify(updates));
        displayUpdates();
        document.getElementById("updateText").value = "";
    } else {
        alert("Please write an update before posting.");
    }
}

function displayUpdates() {
    const updates = JSON.parse(localStorage.getItem("updates")) || [];
    const updatesList = document.getElementById("updatesList");
    updatesList.innerHTML = "";

    updates.forEach(update => {
        const updateDiv = document.createElement("div");
        updateDiv.classList.add("update");
        updateDiv.innerHTML = `
            <p>${update.text}</p>
            <small>Posted on: ${update.date}</small>
        `;
        updatesList.appendChild(updateDiv);
    });
}

document.addEventListener("DOMContentLoaded", displayUpdates);