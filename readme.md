# AIChatYi

AIChatYi 是一个基于 Flask 框架和混元LLM实现的对话应用，允许用户与人工智能进行交互。

## 项目结构

```markdown
AIChatYi/
│
├── app.py                # Flask 应用的主文件
├── templates/
│   └── AIChat.html       # 应用的前端HTML模板
├── static/
│   ├── AIChat.css        # 应用的CSS样式表
│   └── AIChatScr.js      # 应用的JavaScript脚本
│
└── README.md             # 项目说明文件
```

## 环境要求

- Python 3.x
- Flask
- OpenAI Python 客户端

## 安装指南

1. 安装 Python 3.x（如果尚未安装）。
2. 使用 `pip` 安装所需的依赖项：

   ```
   pip install -r requirements.txt
   ```

3. 运行 Flask 应用：

   ```
   python app.py
   ```

## 使用说明

- 启动应用后，访问 `http://127.0.0.1:5000/` 即可开始与AI对话。
- 点击“发送”按钮提交你的消息。
- 点击“主题”按钮切换应用的主题颜色。

## 贡献

欢迎任何形式的贡献，包括但不限于代码提交、bug报告和功能请求。

## 许可证

本项目采用 [MIT License](https://opensource.org/licenses/MIT)。













