# ClassList

This module aims to match the behaviour of [`Element#classList`][classlist], without polyfilling it.

IE9 doesn't have the native `classList`, and other browsers have incomplete implementations. This module tries to bridge the gaps.

## Installation

`npm install classlist` (or `yarn add classlist`)

## Usage

This module is intended for use in the browser via a module bundler such as [Webpack][webpack] or [Browserify][browserify]. Sample usage:

```js
var classList = require('classlist')

var element = document.querySelector('#id')
var list = classList(element)

// Add a class:
list.add('foo')

// Remove a class:
list.remove('bar')

// Toggle a class:
list.toggle('baz')

// Replace class 'foo' with 'bar'
list.replace('foo', 'bar')

// Check if the element has a class:
if (list.contains('bar')) {
    console.log('Element has class bar')
}
```

## API

This module tries to follow the [native API][classlist] as closely as possible.

- `list = new ClassList(element)`

    Constructor. Create a new `ClassList` object. `new` is optional.

    ```js
    // Object style, "new"
    var ClassList = require('classlist')
    var list = new ClassList(element)

    // Function style, no "new"
    var classList = require('classlist')
    var list = classList(element)
    ```

- `list.item(index)` or `list[index]`

    Returns the class at the given `index`. Example:

    ```js
      var div = document.createElement('div')
      div.className = 'a b'
      var list = classList(div)
      list.item(0)  // 'a'
      list[1]       // 'b'
    ```

- `list.contains(class)`

    Returns true if the element has the given class; false otherwise.

- `list.add(class1 [, class2 [, ... ]])`

    Adds one or more classes to the element associated with `list`. If the class is already present on the element, it is not added again.

- `list.remove(class1 [, class2 [, ... ]])`

    Removes one or more classes from the element, if present.

- `list.toggle(class [, force ])`

    Toggles the given class; removes the class if it is present, or adds the class if it is not present.

    When `force` is true, the class is always added (i.e. it is equivalent to calling `add`). When `force` is false, the class is always removed (i.e. it is equivalent to calling `remove`). This can be useful when conditioning on an outcome; for example,

    ```js
      list.toggle('not_empty', counter > 0)

      // is equivalent to:
      if (counter > 0) {
        list.add('not_empty')
      } else {
        list.remove('not_empty')
      }
    ```

    Returns `true` if the class is now present, or `false` otherwise.

- `list.replace(oldClass, newClass)`

    If `oldClass` is present on the element, it is replaced by `newClass`. If `oldClass` is not present, this method has no effect.

    Returns `true` if the class was replaced, `false` otherwise.

## Browser support

This module has been tested for compatibility with IE8+, and may work in even older browsers. If it doesn't, [open an issue](https://github.com/lucthev/classlist/issues/new).

## License

MIT

[classlist]: https://developer.mozilla.org/docs/Web/API/Element/classList
[browserify]: http://browserify.org/
[webpack]: https://webpack.github.io/
[npm]: https://www.npmjs.com/
