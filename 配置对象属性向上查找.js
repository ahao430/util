var a = {
  style: {color: 'red'},
  b: {
    style: {color: 'blue'},
    c: {
      style: {},
      d: {
        style: {}
      }
    },
    c2: {
      style: {},
      d: {
        style: {}
      }
    }
  },
}

console.log(a.b.c)
function trans (obj, proto = {}) {
  for (let key in obj) {
    if (key === 'style') {
      for (let styleKey in obj.style) {
        if (obj.style.hasOwnProperty(styleKey)) {
          proto[styleKey] = obj.style[styleKey]
        }
      }
      obj['style'] = proto
    } else {
      obj[key] = trans(obj[key], Object.create(obj.style))
    }
  }
  return obj
}

console.log(trans(a))
console.log(trans(a).b.c.d)
console.log(trans(a).b.c.d.style.color)
