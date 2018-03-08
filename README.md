# Fortnight JS

## Installation
### Library Source
Include the following Javascript before the closing `<head>` tag on all pages you wish to track. It is generally recommended to place this in a common file that all pages on your site include/require.
**Note:** The fourth argument is the library source. If you're using a custom domain (CNAME), this value should be updated to use it.

```html
<html>
  <head>
    <script src="https://fortnight.as3.io/lib/0.1.0/fortnight.min.js"></script>
  </head>
</html>
```
### Initialization
Once the library source has been included, you can access the library via the `Fortnight` global window object.

## Beacon In-View Tracking
A becon element _must_ cotain two data attributes:
 - `data-fortnight-view` set to `pending`
 - `data-fortnight-beacon` set to the fully-qualified in-view image URL

For example:
```html
<img src="https://fortnight.as3.io/t/{token}/load.gif" data-fortnight-view="pending" data-fortnight-beacon="https://fortnight.as3.io/t/{token}/view.gif">
```
