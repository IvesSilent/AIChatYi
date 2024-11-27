# -*encoding=utf8*-

from flask import Flask, render_template, request, jsonify
import openai
import unicodedata
import datetime
import json
from flask import Response

app = Flask(__name__)

# 初始化OpenAI客户端
# API_BASE = "https://api.lingyiwanwu.com/v1"
# API_KEY = "API_KEY_Yi"  # 替换为你的API_KEY
API_BASE = "https://api.hunyuan.cloud.tencent.com/v1"
API_KEY = "sk-6R0hq8U7v3bSbT1u41Lp6kPRwAgf9wnW73WgvSC7WUI73eRO"  # 替换为你的API_KEY

client = openai.OpenAI(api_key=API_KEY, base_url=API_BASE)


# 输入信息回复函
def send_message(user_messages):
    completion = client.chat.completions.create(
        # model="yi-34b-chat-0205",
        model="hunyuan-pro",
        messages=user_messages,
        temperature=0.3,
        stream=True
    )
    response = []
    for chunk in completion:
        content = chunk.choices[0].delta.content or ""
        content = unicodedata.normalize('NFC', content)
        response.append(content)
        yield content  # 使用yield关键字来实现流式输出

    # return ''.join(response)
    # return response  # 返回列表而不是生成器


@app.route('/')
def index():
    return render_template('AIChat.html')


@app.route('/send_message', methods=['POST'])
def send_message_route():
    user_message = request.form.get('user_message')

    history = request.form.get('history', '[]')  # 获取历史消息
    user_messages = []
    if history:
        user_messages.extend(json.loads(history))  # 将历史消息添加到user_messages列表中
    if user_message:
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        user_messages.append({"role": "user", "content": user_message, "time": current_time})

    ai_response = send_message(user_messages)
    return Response(ai_response, mimetype='application/json')  # 返回流式响应


if __name__ == "__main__":
    app.run(debug=True)
