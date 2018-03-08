export default ({ Vue }) => {
  let t = Vue.prototype

  /*
  msg(Required): The log message/title
  payload: Can be text, objects, etc
  saveToDB: Do you want to save it to the database?
  examples:
  log('test message')
  log('User Properties', user.properties)
  log('Video Paused', pausedTime, true)
  */
  t.$log = function (msg, payload, saveToDB) {
    var debug = t.$consts.LOG

    if (debug) {
      if (payload) {
        console.log(msg, payload)
      } else {
        console.log(msg)
      }
    }

    // Keep this outside of the check above so we can save to DB if we want without logging to console.
    if (saveToDB) {
      console.log('TODO: We need to set this up so it saves to the our database')
    }
  }

  /*
  time(Required): the amount of time you want to sleep
  examples:
  sleep(500).then(() => { Do something here })
  */
  t.$sleep = function (time) {
    t.$log('Sleeping: ' + time)
    return new Promise((resolve) => setTimeout(resolve, time))    
  }

  /*
    element(Required): The element to search within
    className(Required): The element to find within the element
    examples:
    let el = this.$findFirstChild(document.querySelector(element), '.form-error-msg')
  */
  t.$findFirstChild = function (element, className) {
    let foundElement = null
    let isClass = true

    if (className.charAt(0) === '#') {
      isClass = false
    }

    className = className.substring(1)

    function recurse (element, className, found) {
      for (var i = 0; i < element.childNodes.length && !found; i++) {
        var el = element.childNodes[i]

        if (isClass) {
          var classes = el.className !== undefined ? el.className.split(' ') : []
          for (var j = 0, jl = classes.length; j < jl; j++) {
            if (classes[j] === className) {
              found = true
              foundElement = element.childNodes[i]
              break
            }
          }
        } else {
          var ids = el.id !== undefined ? el.id.split(' ') : []
          for (var j1 = 0, jl1 = ids.length; j1 < jl1; j1++) {
            if (ids[j1] === className) {
              found = true
              foundElement = element.childNodes[i]
              break
            }
          }
        }

        if (found) {
          break
        }
        recurse(element.childNodes[i], className, found)
      }
    }

    recurse(element, className, false)

    return foundElement
  }

  /*
    elName(Required): The element we're trying to select
    examples:
    this.$focusElement('.someel')
  */
  t.$focusElement = function (elName) {
    document.querySelector(elName).focus()
  }

  /*
    elName(Required): The element we want to scroll to
    mainOptions: Must be an object
      - delay: How fast should we scroll
      - offsetX: Do we need to offset due to a menu or something on the x axis
      - offsetY: Do we need to offset due to a menu or something on the y axis
    examples:
    this.$scrollToElement('.someel')
    this.$scrollToElement('.someotherel', options)
    this.$scrollToElement('.someotherotherel', { delay: 500 })
  */
  t.$scrollToElement = function (elName, mainOptions = { delay: 200, offsetX: 0, offsetY: 0 }) {
    let rect = document.querySelector(elName).getBoundingClientRect()
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    let initialY = window.scrollY || window.scrollTop || document.getElementsByTagName('header')[0].scrollTop
    let offset = rect.top + scrollTop - 150 - initialY + mainOptions.offsetY

    let y = initialY + offset
    let baseY = (initialY + y) * 0.5
    let difference = initialY - baseY
    let startTime = performance.now()

    function step () {
      let normalizedTime = (performance.now() - startTime) / mainOptions.delay
      if (normalizedTime > 1) normalizedTime = 1

      window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI))
      if (normalizedTime < 1) window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  }
}
