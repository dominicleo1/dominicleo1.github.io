let chatbox;
let chatMessages;
let userInput;

document.addEventListener('DOMContentLoaded', () => {
    chatbox = document.getElementById('chatbox');
    chatMessages = document.getElementById('chat-messages');
    userInput = document.getElementById('user-input');
});

function toggleChatbox() {
    chatbox.style.display = chatbox.style.display === 'none' ? 'block' : 'none';
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage('用户', message);
        userInput.value = '';
        
        try {
            const response = await callChatGPT(message);
            addMessage('AI', response);
        } catch (error) {
            console.error('Error:', error);
            addMessage('AI', '抱歉,出现了一个错误。请稍后再试。');
        }
    }
}

function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function callChatGPT(message) {
    // 注意:这里需要使用您的OpenAI API密钥
    const openai = new OpenAI({ apiKey: 'YOUR_API_KEY_HERE' });
    
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
    });

    return completion.choices[0].message.content;
}