module.exports = ClassList

var arr = Array.prototype

function ClassList (elem) {
  if (!(this instanceof ClassList)) {
    return new ClassList(elem)
  }

  // Use RegExp instead of String#trim as the latter doesn't exist in IE <= 8
  var className = elem.className.replace(/^\s+|\s+$/g, '')
  var classes = className.split(/\s+/)

  this._elem = elem
  this.length = 0

  if (!className) return

  for (var i = 0; i < classes.length; i += 1) {
    arr.push.call(this, classes[i])
  }
}

ClassList.prototype.item = function (index) {
  if (index >= this.length) {
    return null
  }

  return this[index]
}

ClassList.prototype.add = function () {
  for (var i = 0; i < arguments.length; i += 1) {
    var token = String(arguments[i])

    if (indexOf(this, token) >= 0) {
      continue
    }

    arr.push.call(this, token)
  }

  this._elem.className = this.toString()
}

ClassList.prototype.remove = function () {
  for (var i = 0; i < arguments.length; i += 1) {
    var token = String(arguments[i])
    var index = indexOf(this, token)

    if (index < 0) continue

    arr.splice.call(this, index, 1)
  }

  this._elem.className = this.toString()
}

ClassList.prototype.contains = function (token) {
  return indexOf(this, String(token)) >= 0
}

ClassList.prototype.toggle = function (token, force) {
  if (force !== undefined) {
    if (force) {
      this.add(token)
    } else {
      this.remove(token)
    }
  } else {
    if (this.contains(token)) {
      this.remove(token)
    } else {
      this.add(token)
    }
  }

  return this.contains(token)
}

ClassList.prototype.replace = function (token, newToken) {
  var index = indexOf(this, token)

  if (index < 0) {
    return false
  }

  arr.splice.call(this, index, 1, newToken)
  this._elem.className = this.toString()
  return true
}

ClassList.prototype.toString = function () {
  return arr.join.call(this, ' ')
}

// IE <= 8 doesn't have a native Array#indexOf
function indexOf (array, item) {
  var len = array.length
  for (var i = 0; i < len; i += 1) {
    if (array[i] === item) {
      return i
    }
  }
  return -1
}
