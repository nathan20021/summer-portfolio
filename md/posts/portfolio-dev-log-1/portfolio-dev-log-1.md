#

## Expanding Blogs Functionalities

### Add light mode for `blogs/*`

On the bottom right-hand side, above the back-to-top button, there is an option to toggle light mode in the blog reader. At the time, this mode will only be useable on the `blogs/*` domain.

Adding light mode on the site is somewhat difficult since I'm using a mix of **`CSS-modules`** and **`tailwind-css`** on this particular page.

To get around that, I used some ugly fixes that I'm not so proud of.

- First, I refactor the `mdBlogs.moudule.css` so that it contains different attributes for dark or light mode.

```css
  .postLight a {
    color: #018fbd;
  }
  .postLight a:hover {
    color: #00c1ff;
  }
  .postDark a {
    color: #018fbd;
  }
  .postDark a:hover {
    color: #00c1ff;
  }
```

- In the `[slug].tsx` file where the blog gets rendered, I need to manually grab the theme from the `use-theme` hook and conditionally add the className into the components with some additional tailwind styling. This led to an ugly solution.

```tsx
  <ReactMarkdown
    className={
      theme === "dark"
        ? `${styles.postDark} ${styles.post} w-full z-10 text-lighttext`
        : `${styles.postLight} ${styles.post} w-full z-10 text-darktext`
    }
  >
    ...
  </ReactMarkdown>
```

### Mapping Markdown code into React components

- **Light theme code syntax highlighting:** As seen for all code blocks on the page, after being parsed from a markdown file, it got converted to HTML via `react-markdown` and syntax-highlighted with the `rehypeHighlight` plugin.

- **Wrapper for code blocks:** With each code block rendered by `react-markdown`, it got mapped into a custom React component wrapper that provides additional functionality (ie: copy-pasting) and states to handle UI interactions (ie: `setTimeout()`).

```tsx
  pre: (element: { children?: any; node?: any }) => {
    const [copied, setCopied] = useState(false);
    return (
      <div>
        <CopyPasteButton .../>
        <pre className="rounded-md code-block">{element.children}</pre>
      </div>
    )
  }
```

- The copy-paste functionality requires recursively traversing through a React component tree where a node can contain a list of nodes. The `flattenDeep` function from `lodash` can help with this problem.

```ts
  // Traverse through the tree recursively
  // retrun a multi-dimentional array containing the code.
  const preProcess = (data: preProcessProps[]) => {
    const result: DeepArray<String> = [];
    data.forEach((item) => {
      if (typeof item === "object") {
        result.push(preProcess(item.props.children));
      } else {
        result.push(item);
      }
    });
    return result;
  };

  // Copy to clipboard the string representing the flattened array
  pre: (element: { children?: any; node?: any }) => {
    // ...
    navigator.clipboard.writeText(
      flattenDeep(
        preProcess(element.children[0].props.children)
      ).join("")
    );
    // ...
  }
```

- To support such an operation, type `DeepArray` needs to be recursive:

```ts
  type DeepArray<T> = T | Array<DeepArray<T>>;

  type dataProps = {
    props: {
      children: dataProps[];
    };
  };

  type preProcessProps = string | dataProps;
```

## Plans for the future

1. Make blogs RSS-compatible
2. Light mode on `/portfolio` page and `/linktree`

## What I learned

1. Introduction to `lodash.js`
2. Recursive types in TypeScript
3. Theme customization with tailwindCSS

## Thanks for your time! Happy engineering 🥐
