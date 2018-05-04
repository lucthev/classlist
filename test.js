const classList = require('./')
const test = require('tape')

class Element {
  constructor (className = '') {
    this.className = className
  }
}

test('ClassList constructor', function (t) {
  let el = new Element('a')

  const ClassList = classList
  let list = new ClassList(el) // class style
  t.equal(list.length, 1)
  t.equal(list[0], 'a')

  list = classList(el) // function style
  t.equal(list.length, 1)
  t.equal(list[0], 'a')

  el = new Element('')
  list = classList(el)
  t.equal(list.length, 0)
  t.equal(list[0], undefined)

  el = new Element('\t a   b \n ')
  list = classList(el)
  t.equal(list.length, 2)
  t.equal(list[0], 'a')
  t.equal(list[1], 'b')

  t.end()
})

test('ClassList#item', function (t) {
  let el = new Element('a b c')
  let list = classList(el)

  t.equal(list.item(3), null)
  t.equal(list.item(0), 'a')
  t.equal(list.item(1), 'b')
  t.equal(list.item(2), 'c')

  t.end()
})

test('ClassList#add', function (t) {
  let el = new Element('')
  let list = classList(el)

  t.equal(list.add('a'), undefined)

  t.equal(list.length, 1)
  t.equal(list[0], 'a')
  t.equal(el.className, 'a')

  t.equal(list.add('b', 'c'), undefined)

  t.equal(list.length, 3)
  t.equal(list[0], 'a')
  t.equal(list[1], 'b')
  t.equal(list[2], 'c')
  t.equal(el.className, 'a b c')

  t.end()
})

test('ClassList#remove', function (t) {
  let el = new Element('a b c d')
  let list = classList(el)

  t.equal(list.remove('b'), undefined)

  t.equal(list.length, 3)
  t.equal(list[0], 'a')
  t.equal(list[1], 'c')
  t.equal(list[2], 'd')
  t.equal(el.className, 'a c d')

  t.equal(list.remove('c', 'd'), undefined)

  t.equal(list.length, 1)
  t.equal(list[0], 'a')
  t.equal(list[1], undefined)
  t.equal(el.className, 'a')

  t.end()
})

test('ClassList#contains', function (t) {
  let el = new Element('a b c')
  let list = classList(el)

  t.equal(list.length, 3)
  t.ok(list.contains('a'))
  t.notOk(list.contains('x'))

  t.end()
})

test('ClassList#toggle', function (t) {
  let el = new Element('a b c')
  let list = classList(el)

  t.ok(list.toggle('d'))
  t.equal(list.length, 4)
  t.equal(el.className, 'a b c d')

  t.notOk(list.toggle('b'))
  t.equal(list.length, 3)
  t.equal(el.className, 'a c d')

  t.notOk(list.toggle('a', false))
  t.equal(list.length, 2)
  t.equal(el.className, 'c d')

  t.ok(list.toggle('a', true))
  t.equal(list.length, 3)
  t.equal(el.className, 'c d a')

  t.notOk(list.toggle('b', false))
  t.equal(list.length, 3)
  t.equal(el.className, 'c d a')

  t.ok(list.toggle('a', true))
  t.equal(list.length, 3)
  t.equal(el.className, 'c d a')

  t.end()
})

test('ClassList#replace', function (t) {
  let el = new Element('a b c')
  let list = classList(el)

  t.ok(list.replace('b', 'd'))
  t.equal(list.length, 3)
  t.equal(el.className, 'a d c')

  t.notOk(list.replace('x', 'y'))
  t.equal(list.length, 3)
  t.equal(el.className, 'a d c')

  t.end()
})
