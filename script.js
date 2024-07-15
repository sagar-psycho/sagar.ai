document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("user-input");
    const chatHistory = document.getElementById("chat-history");
    const speechButton = document.getElementById("speech-button");
    const searchButton = document.getElementById("search-button");
    const clearHistoryHistoryButton = document.getElementById("clear-history-history");
    const searchHistoryContainer = document.getElementById("search-history");
    const deletePop = document.getElementById("delete-pop");

    function appendMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        messageElement.classList.add("message", sender);
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        saveChatHistory();
    }

    function processInput(input) {
        if (input.toLowerCase().startsWith("open")) {
            const command = input.toLowerCase().replace("open", "").trim();
            switch (command) {
                case "google":
                    window.open("https://www.google.com", "_blank");
                    return "Opening Google...";
                case "whatsapp":
                    window.open("https://web.whatsapp.com", "_blank");
                    return "Opening WhatsApp...";
                case "instagram":
                    window.open("https://www.instagram.com", "_blank");
                    return "Opening Instagram...";
                case "youtube":
                    window.open("https://www.youtube.com", "_blank");
                    return "Opening YouTube...";
                case "github":
                    window.open("https://github.com", "_blank");
                    return "Opening GitHub...";
                case "about sagar":
                    window.open("https://sagar-psycho.github.io/portfolio.responsive/", "_blank");
                    return "Opening about SAGAR...";
                default:
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(input)}`, "_blank");
                    return "Searching on Google...";
            }
        } else {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(input)}`, "_blank");
            return "Searching on Google...";
        }
    }

    function speakText(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
    }

    speechButton.addEventListener("click", function() {
        appendMessage("SAGAR ai is activated...", "bot");
        speakText("SAGAR ai is activated...");

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            appendMessage(speechResult, "user");
            speakText(speechResult);
            const response = processInput(speechResult);
            appendMessage(response, "bot");
            speakText(response);
            addToSearchHistory(speechResult);
        };
    });

    searchButton.addEventListener("click", function() {
        const inputText = userInput.value.trim();
        if (inputText !== "") {
            appendMessage(inputText, "user");
            speakText(inputText);
            const response = processInput(inputText);
            appendMessage(response, "bot");
            speakText(response);
            addToSearchHistory(inputText);
            userInput.value = "";
        }
    });

    userInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const inputText = userInput.value.trim();
            if (inputText !== "") {
                appendMessage(inputText, "user");
                speakText(inputText);
                const response = processInput(inputText);
                appendMessage(response, "bot");
                speakText(response);
                addToSearchHistory(inputText);
                userInput.value = "";
            }
        }
    });

    clearHistoryHistoryButton.addEventListener("click", function() {
        deletePop.style.display = "block";
    });

    document.querySelector(".cancel-btn").addEventListener("click", function() {
        deletePop.style.display = "none";
    });

    document.querySelector(".yes-btn").addEventListener("click", function() {
        clearChatHistory();
        clearSearchHistory();
        deletePop.style.display = "none";
    });

    function addToSearchHistory(query, date = null) {
        const options = { month: 'long', day: 'numeric' };
        const dateString = date ? date : new Date().toLocaleDateString(undefined, options);
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = `${query} - ${dateString}`;
        searchHistoryContainer.appendChild(listItem);
        saveSearchHistory();
    }

    function saveSearchHistory() {
        const historyItems = [];
        searchHistoryContainer.querySelectorAll("li").forEach(item => {
            historyItems.push(item.textContent);
        });
        localStorage.setItem("searchHistory", JSON.stringify(historyItems));
    }

    function loadSearchHistory() {
        const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        storedHistory.forEach(item => {
            const parts = item.split(' - ');
            if (parts.length === 2) {
                addToSearchHistory(parts[0], parts[1]);
            }
        });
    }

    function clearSearchHistory() {
        localStorage.removeItem("searchHistory");
        searchHistoryContainer.innerHTML = "";
    }

    function clearChatHistory() {
        localStorage.removeItem("chatHistory");
        chatHistory.innerHTML = "";
    }

    function saveChatHistory() {
        const chatItems = [];
        chatHistory.querySelectorAll(".message").forEach(item => {
            chatItems.push({
                text: item.textContent,
                sender: item.classList.contains("user") ? "user" : "bot"
            });
        });
        localStorage.setItem("chatHistory", JSON.stringify(chatItems));
    }

    function loadChatHistory() {
        const storedChatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        storedChatHistory.forEach(item => {
            appendMessage(item.text, item.sender);
        });
    }

    loadSearchHistory();
    loadChatHistory();
});

window.onload = function() {
    var changingText = document.getElementById("changingText");
    var texts = ["Welcome to Sagar ai"];
    var index = 0;
    var letterIndex = 0;

    function typeText() {
        if (letterIndex < texts[index].length) {
            changingText.textContent += texts[index].charAt(letterIndex);
            letterIndex++;
            setTimeout(typeText, 150);
        }
    }
    typeText(); 
};

document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "Dark Mode";
    darkModeToggle.className = "btn btn-dark-mode";
    darkModeToggle.style.position = "fixed";
    darkModeToggle.style.bottom = "20px";
    darkModeToggle.style.right = "20px";
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.querySelector(".navbar").classList.toggle("dark-mode");
        document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("dark-mode"));
        document.querySelectorAll(".dropdown-menu").forEach(menu => menu.classList.toggle("dark-mode"));
        document.querySelectorAll(".accordion-button").forEach(button => button.classList.toggle("dark-mode"));
        document.querySelectorAll(".accordion-body").forEach(body => body.classList.toggle("dark-mode"));
        document.querySelector("#chat-container").classList.toggle("dark-mode");
        document.querySelector(".history").classList.toggle("dark-mode");
        document.querySelector("#delete-pop").classList.toggle("dark-mode");
        document.querySelector("#user-input").classList.toggle("dark-mode");
    });
});
