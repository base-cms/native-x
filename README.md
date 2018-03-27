# Fortnight JS

## Installation
### Library Source and Initialization
Include the following Javascript before the closing `<head>` tag on all pages you wish to track. It is generally recommended to place this in a common file that all pages on your site include/require. Once the library code is added, you must `init` the library.
```html
<html>
  <head>
    <script>
      // Load the library (async), but add a command queue so calls to `fortnight()` are immediate.
      (function (i, s, o, g, r, a, m) {
        i['FortnightObject'] = r; i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }, a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; a.crossOrigin = 'anonymous'; m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://fortnight.as3.io/lib/fortnight.min.js', 'fortnight');

      // Now init the tracker.
      fortnight('init');
    </script>
  </head>
</html>
```
If you're using a custom domain name (CNAME), you must specify it as both the library source and the tracker domain. For example, if your custom domain is `https://your-host.your-domain.com` you would include and initialize as follows:
```html
<html>
  <head>
    <script>
      (function (i, s, o, g, r, a, m) {
        i['FortnightObject'] = r; i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }, a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; a.crossOrigin = 'anonymous'; m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://your-host.your-domain.com/lib/fortnight.min.js', 'fortnight');

      fortnight('init', {
        domain: 'https://your-host.your-domain.com'
      });
    </script>
  </head>
</html>
```

## Events
Load, view, and click events will be handled automatically by the content delivered from the server to the page. A server-side HTML payload will look similar to this:
```html
<div
  data-fortnight-action="view"
  data-fortnight-fields="%7B%22uuid%22%3A%22db1a4977-6ef8-4039-959d-99f95b839eae%22%2C%22pid%22%3A%225aa157594795e6000122dbe7%22%2C%22cid%22%3A%225ab00ccbfd9ea400012760d8%22%7D">
    <h1>
      <a
        href="https://google.com"
        data-fortnight-action="click"
        data-fortnight-fields="%7B%22uuid%22%3A%22db1a4977-6ef8-4039-959d-99f95b839eae%22%2C%22pid%22%3A%225aa157594795e6000122dbe7%22%2C%22cid%22%3A%225ab00ccbfd9ea400012760d8%22%7D">
        A very enticing title.
      </a>
    </h1>
    <p>Content here!</p>
</div>
<script>
  fortnight('event', 'load', {
    // A unique request identifier provided by the backend.
    uuid: 'db1a4977-6ef8-4039-959d-99f95b839eae',
    // The placement id used to fetch the ad content.
    pid: '5aa157594795e6000122dbe7',
    // The campaign id (if served and not a fallback).
    cid: '5ab00ccbfd9ea400012760d8'
  }, { transport: 'beacon' });
</script>
```

