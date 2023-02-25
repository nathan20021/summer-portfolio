# HTML rendering techniques

## Introduction

Web technologies have matured rapidly over the years and everyone wants to take advantage of them. Whether it's launching you're on start-up, showing off your portfolio, or learning the web's fundamentals, knowing how HTML is rendered and transmitted is key.

In this article, I will go over the rendering techniques of HTML and CSS, while breaking down the pros and cons of each. Popular methods are:

1. Client-Side Rendering (CSR)

2. Server-Side Rendering (SSR)

3. Static Site Generation (SSG)

4. Incremental Static Generation (ISR)

## Fundamental

1. What is a "rendered" HTML file?

   - There are two components to an HTML file: the data (dynamic piece), and the static template which houses that dynamic data.

   - For example, Youtube Home Page's UI looks the same across all accounts, yet the videos (data) on that page differ across users.

   - A "fully rendered" HTML then is when the dynamic data are fully present in the template and ready to be consumed by the client.

2. Server and Client dynamics:
   - In our context, a web server is a computer that serves HTML, CSS, and Javascript.
   - A client is a computer that receives the HTML, CSS, and Javascript
   - After receiving the HTML, the client or the browser will present that HTML on the screen.
     > Note that the HTML being sent and received are not neccesarly pre-rendered.

## Client-Side Rendering (CSR)

- **CSR** is a technique where the server sends un-rendered HTML, CSS, and Javascript to the user's browser and the browser utilizes Javascript to fetch, update, and handle the content dynamically.
- With CSR, the rendering is off-loaded from the server, which improves the server's performance. However, rendering speed is now heavily dependent on the user's processing power which creates inconsistent experiences across users.

## Server-Side Rendering (SSR)

- Similar to CSR, SSR renders HTML in full with the dynamic data and then ships the file to the user's browser on every request.

## Static Site Generation (SSG)

## Incremental Static Generation (ISR)

```python
import someasldkfjasldkfjdkfjdkjfkfjdkthing
print("Hello world")
```
