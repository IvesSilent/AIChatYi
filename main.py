# -*- coding: utf-8 -*-

import openai
from openai import OpenAI
import sys
import unicodedata


# 输入信息回复函
def send_message(user_messages):
    completion = client.chat.completions.create(
        model="yi-34b-chat-0205",
        messages=user_messages,
        stream=True
    )
    response = []
    for chunk in completion:
        content = chunk.choices[0].delta.content or ""

        # 应用Unicode规则化
        content = unicodedata.normalize('NFC', content)

        # 打印回复
        print(content, end="", flush=True)
        response.append(content)

    return ''.join(response)


if __name__ == "__main__":

    # 设置API_KEY和API_BASE
    API_BASE = "https://api.lingyiwanwu.com/v1"
    # API_KEY = "YOUR_API_KEY" # 替换为你的API_KEY
    API_KEY = "503caaa27c204992a08b79875ddae94a"  # 替换为你的API_KEY

    # 初始化OpenAI客户端
    client = OpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        api_key=API_KEY,
        base_url=API_BASE
    )

    user_messages = [{"role": "user", "content": "你好，请自我介绍一下。"}]
    while True:
        response = send_message(user_messages)
        # 保存至消息记录
        user_messages.append({"role": "assistant", "content": response})
        user_message = input("\nUser: ")  # 输入回复
        user_messages.append({"role": "user", "content": user_message})  # 保存至消息记录
