# Guide.js - Guide your users through your interface

Guide.js is a tiny (~800 bytes gzipped) JavaScript library for implementing user interface step-by-step guides.
It's like Intro.js (http://introjs.com). However, it is 10x smaller, simpler, and MIT licensed (which means
you can use it for commercial purposes, provided you keep the copyright notice).

## How to use it

The page in `example.html` shows everything you can do with Guide.js. I'll write a more detailed explanation soon.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf8" />
    <link rel="stylesheet" href="guidejs.css" />
    <script type="text/javascript" src="guide.js"></script>
  </head>
  <body>
    <div id="guidejs-overlay"></div>
    <div id="guidejs-bg"></div>

    <h1 class="guidejs-test-step0">Hello, world!</h1>

    <h2>This is a tutorial</h2>

    <p>Here are some buttons:</p>
    <button class="guidejs-test-step1" onclick="guidejsAdvance()">Destroy computer</button>

    <button onclick="guidejsBeginGuide('test')">Begin tutorial</button>

    <p class="guidejs-test-step2">All good things come to an end...</p>

    <div class="guidejs-test-step0-tooltip guidejs-tooltip">
      <span>Hello! Welcome to the tutorial.</span> <br/>
      <button onclick="guidejsAdvance()">Next</button>
    </div>

    <div class="guidejs-test-step1-tooltip guidejs-tooltip">
      <span>Click the button.</span>
    </div>

    <div class="guidejs-test-step2-tooltip guidejs-tooltip" guidejs-position="above">
      <span>As you have probably noticed, you have followed a tutorial.</span> <br/>
      <span>Thanks for all the fish!</span> <br/>
      <button onclick="guidejsAdvance()">Finish</button>
    </div>
  </body>
</html>
```

## Customization

You can customize how tooltips look by changing `guidejs.css`.
Active tooltips have the `.guidejs-highlighted-tooltip` class, so you might want to change it.
The file is very simple - go take a look!

## License

MIT.