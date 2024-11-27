document.addEventListener('DOMContentLoaded', function() {
    let messageHistory = [];

    let isDarkTheme = false; // 添加一个标志位来记录当前是否是黑暗主题

    function updateMessagesDisplay() {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = ''; // 清空消息区域
        messageHistory.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message';
            msgDiv.innerHTML = `<strong>${msg.role}</strong><br>${msg.time}<br>${msg.content}`;// msg.content现在包含HTML
            messagesDiv.appendChild(msgDiv);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // 滚动到最新消息
    }

    document.getElementById('send_button').addEventListener('click', function() {
        const userMessage = document.getElementById('user_message').value;
        const history = JSON.stringify(messageHistory); // 将历史消息转换为字符串
        if (userMessage) {
            const current_time = new Date().toISOString();
            const userMessages = [{"role": "user", "content": userMessage, "time": current_time}];
            messageHistory = messageHistory.concat(userMessages); // 保存用户消息
            fetch('/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `user_message=${encodeURIComponent(userMessage)}&history=${encodeURIComponent(history)}`
            })
            .then(response => response.text())  // 使用 text() 方法处理流式响应
            .then(data => {

            // 将Markdown转换为HTML
                const htmlContent = marked.parse(data);
                const aiMessages = [{"role": "assistant", "content": htmlContent, "time": current_time}];
                messageHistory = messageHistory.concat(aiMessages); // 保存AI消息
                updateMessagesDisplay(); // 更新显示消息
                document.getElementById('user_message').value = '';
            });
        }
    });

    document.getElementById('theme_button').addEventListener('click', function() {
        isDarkTheme = !isDarkTheme; // 切换标志位状态
        document.body.classList.toggle('dark-theme', isDarkTheme); // 切换类名
        // 调整按钮和文字颜色
//        if (isDarkTheme) {
//
//        document.getElementById('send_button').style.backgroundColor = '#ff7300';
//            document.getElementById('send_button').style.color = '#333333';
//            document.getElementById('theme_button').style.backgroundColor = '#ff7300';
//            document.getElementById('theme_button').style.color = '#333333';
//        } else {
//            document.getElementById('send_button').style.backgroundColor = '#333333';
//            document.getElementById('send_button').style.color = '#f5f5f5';
//            document.getElementById('theme_button').style.backgroundColor = '#333333';
//            document.getElementById('theme_button').style.color = '#f5f5f5';
//        }
    });

});