#

## 🤔 What's new?

The blogs will now support Admonitions and Callouts.

:::success
Like this one
:::

:::warn{title="Or this Contentless warning callout"}
:::

> Regular quotes are still supported with ">"
>
> Regular quotes will have a lower visual hierachy.
> > Quotes can also be nested like Admonitions

## 👉 Examples

:::info{title="Default Information Callout"}
  This is a default Information callout
:::

:::call{icon="🙋‍♂️" title="Themeless Callout"}
Themeless with custom icons
:::

::notes{title="Contentless Notes Callout"}

:::fail{title="Recursive Rendering within Admonitions"}
This `AI code` will destroy humanity:

```py
def dogOrBagel():
    return random.choice(["Dog", "Bagel"])
```

:::

:::fail{title="Nested Admonitions"}
  :::info{title="Nested Adminition 1"}
    :::notes{title="Nested Adminition 2"}
      Pretty neat huh!
:::

## 🤔 How was the feature developed?

### Custom Remark Plugin

A custom remark plugin was implemented with contingent usage of `remarkDirective`.

```js
  export function remarkDirectiveHelper() {
    return (tree) => {
      visit(tree, (node) => {
        if (
          node.type === "textDirective" ||
          node.type === "leafDirective" ||
          node.type === "containerDirective"
        ) {
          const data = node.data || (node.data = {});
          const hast = h(node.name, node.attributes);
          data.hName = hast.tagName;
          data.hProperties = hast.properties;
        }
      });
    };
  }
```

The custom plugin transforms the following markdown, into the following HTML element:

```md
  :::info{title="Information Tag"}
    This is a callout
  :::
```

```html
  <info>
    <p>This is a callout</p>
  </info>
```

The `MarkdownComponent.tsx` component can then pick up the parsed HTML element and transform it into native `div` components that are widely supported across browsers.

```tsx
  info: ({
    node,
    className,
    children,
    title = "Info",
    icon = "ℹ️",
  }: CallOutProps) => {
    return (
      <div
        className={`success border-l-[#5d74f9] bg-[#5d74f933] ${className} border-l-[5px]`}
      >
        <div className="flex w-full">
          <h1 className="text-white text-xl">{icon}</h1>
          <h1 className="text-xl text-[#addaff]">{title}</h1>
        </div>
        <div className="indent-5">{children}</div>
      </div>
    );
  },
```

Metadata such as `title`, `icon`, `className` can be passed as parameters and parsed into the following UI element.

:::info{title="Information Tag"}
This is a callout
:::

## Thanks for your time! 🥐
