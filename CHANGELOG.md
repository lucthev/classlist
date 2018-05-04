# Changelog

### v2.0.0

- Removed context chaining and changed some return values to more closely match [the specification][spec]

    ```js
    // v1
    list.add('foo').remove('bar')

    // v2
    list.add('foo')
    list.remove('bar')
    ```

- Added `item` and `replace` methods

[spec]: https://dom.spec.whatwg.org/#dom-element-classlist
