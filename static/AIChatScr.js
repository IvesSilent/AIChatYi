document.addEventListener('DOMContentLoaded', function() {
    let messageHistory = [];

    let isDarkTheme = false; // ���һ����־λ����¼��ǰ�Ƿ��Ǻڰ�����

    function updateMessagesDisplay() {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = ''; // �����Ϣ����
        messageHistory.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message';
            msgDiv.innerHTML = `<strong>${msg.role}</strong><br>${msg.time}<br>${msg.content}`;// msg.content���ڰ���HTML
            messagesDiv.appendChild(msgDiv);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // ������������Ϣ
    }

    document.getElementById('send_button').addEventListener('click', function() {
        const userMessage = document.getElementById('user_message').value;
        const history = JSON.stringify(messageHistory); // ����ʷ��Ϣת��Ϊ�ַ���
        if (userMessage) {
            const current_time = new Date().toISOString();
            const userMessages = [{"role": "user", "content": userMessage, "time": current_time}];
            messageHistory = messageHistory.concat(userMessages); // �����û���Ϣ
            fetch('/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `user_message=${encodeURIComponent(userMessage)}&history=${encodeURIComponent(history)}`
            })
            .then(response => response.text())  // ʹ�� text() ����������ʽ��Ӧ
            .then(data => {

            // ��Markdownת��ΪHTML
                const htmlContent = marked.parse(data);
                const aiMessages = [{"role": "assistant", "content": htmlContent, "time": current_time}];
                messageHistory = messageHistory.concat(aiMessages); // ����AI��Ϣ
                updateMessagesDisplay(); // ������ʾ��Ϣ
                document.getElementById('user_message').value = '';
            });
        }
    });

    document.getElementById('theme_button').addEventListener('click', function() {
        isDarkTheme = !isDarkTheme; // �л���־λ״̬
        document.body.classList.toggle('dark-theme', isDarkTheme); // �л�����
        // ������ť��������ɫ
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