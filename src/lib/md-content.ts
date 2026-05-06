export const doc = `# 一级标题

## 二级标题

### 三级标题

#### 四级标题

---

## 文本与强调

普通段落文本。**加粗文本**，*斜体文本*，~~删除线~~，\`行内代码\`。

---

## 无序列表

- 苹果
- 香蕉
  - 大蕉
  - 小蕉
- 橙子

---

## 有序列表

1. 第一步：安装依赖
2. 第二步：配置环境
   1. 设置环境变量
   2. 修改配置文件
3. 第三步：启动服务

---

## 表格

| 名称       | 类型     | 默认值  | 描述         |
| ---------- | -------- | ------- | ------------ |
| \`name\`   | \`string\` | —       | 组件名称     |
| \`size\`   | \`number\` | \`16\`  | 尺寸（px）   |
| \`visible\`| \`boolean\`| \`true\`| 是否可见     |

---

## 引用

> 这是一段普通引用内容。

> **注意：** 引用中也可以包含 \`行内代码\` 和其他格式。
>
> 多行引用的第二段。

---

## 代码块

\`\`\`shell
npm install
npm run dev
\`\`\`

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

---

## 链接与图片

[访问 GitHub](https://github.com)
`