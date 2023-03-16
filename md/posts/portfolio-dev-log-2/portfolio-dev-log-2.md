#

## **Expanding Blogs Functionalities**

### 👉 Support Katex for Math equation inputs (`react-katex` and the `remark-math` plugin)

Block Equations:

$$
s = ut + \frac{1}{2}at^{2}
$$

Inline Equations:

Calculate the value of $s$ when $u = 10\frac{m}{s}$ and $a = 2\frac{m}{s^{2}}$ at $t = 1s$

---

### 👉 Support Github-flavored-Markdown(`remarkGfm` plugin)

1. Render Markdown table as HTML Table
    ID | Blogs | # Views
    -- | ---- | ----
    1  | [Introduction](/blogs/introduction)| 14
    2  | [Getting started in backend development](/blogs/how-to-get-started-in-backend)| 9
    3  | [Portfolio devlog 0](/blogs/portfolio-dev-log)| 10
    4  | [Portfolio devlog 1](/blogs/portfolio-dev-log-1)| 5
    5  | Portfolio devlog 2                     | 0

2. Render read-only input-field

  ```md
  - [x] Implement `gfm`
  - [ ] Post this blog post
  ```

  👉 Rendered as:

- [x] Implement `gfm`
- [ ] Post this blog post.

---

### 👉 Support raw HTML rendering (`rehype-raw` plugin)

```html
<center>
  <iframe width="560" height="315"
      src="https://www.youtube.com/embed/88Jv7J4yjU4"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
  </iframe>
</center>
```

👉 Rendered as:

<center>
  <iframe width="560" height="315"
      src="https://www.youtube.com/embed/88Jv7J4yjU4"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
  </iframe>
</center>
