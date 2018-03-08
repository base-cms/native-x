# Fortnight JS

## Installation
### Library Source
Include the following Javascript before the closing `<head>` tag on all pages you wish to track. It is generally recommended to place this in a common file that all pages on your site include/require.
**Note:** The fourth argument is the library source. If you're using a custom domain (CNAME), this value should be updated to use it.
```js
(function(i, s, o, g, r, a, m) {
  i['SapienceObject'] = r;
  i[r] = i[r] || function() { (i[r].q = i[r].q || []).push(arguments) }
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://fortnight.as3.io/lib/fortnight.js', 'fortnight');
```
As implemented on a web page:
```html
<html>
  <head>
    <script>
      // Include the tracker script from above here...
    </script>
  </head>
</html>
```
### Initialization
Once the library source has been include, you can then initialize the tracker by call the `create` command. We recommend calling this as soon as possible, preferable right after the library source JS is included. For example:
```html
<html>
  <head>
    <script>
      // Include the tracker script from above here...

      // Now init the tracker.
      fortnight('init');
    </script>
  </head>
</html>
```
