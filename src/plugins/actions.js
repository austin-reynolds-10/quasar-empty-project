export default ({ Vue, store }) => {
  let t = Vue.prototype
  let pageName = 'pluginActions'

  /*
  Description: A logger helper
  msg(Required): The log message/title
  payload: Can be text, objects, etc
  page: Specificy a page you want to get information from, if null it'll allow all
  saveToDB: Do you want to save it to the database?
  Examples:
    log('test message')
    log('User Properties', user.properties)
    log('Video Paused', pausedTime, true)
  */
  t.$log = function (page, msg, payload, saveToDB) {
    // isPage = false: Will display all logs in the console.
    // isPage = ['ExamplePageName1', 'ExamplePageName2']: Will only display all logs in console if on that page.
    // Typically leave it set to isPage = false unless trying to debug something specific and your annoyed with all your messages.
    let isPage = false
    // let isPage = ['ManageSitePage']
    let pagesMatch = true

    if (isPage && _.indexOf(isPage, page) === -1) {
      pagesMatch = false
    }

    if (t.$consts.DEBUG && pagesMatch) {
      msg = page + ' - ' + msg

      if (payload) {
        console.log(msg, payload)
      } else {
        console.log(msg)
      }
    }

    // Keep this outside of the check above so we can save to DB if we want without logging to console.
    if (saveToDB) {
      console.log('TODO: Setup this general logger')
    }
  }

  /*
  Description: In the event we need to "sleep" before continuing we can use this.
  time(Required): the amount of time you want to sleep
  Examples:
    sleep(500).then(() => { Do something here })
  */
  t.$sleep = function (time) {
    t.$log(pageName, 'Sleeping: ' + time)
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  /*
    Description: Retrieves the first child child element it finds.
    element(Required): The element to search within
    className(Required): The element to find within the element
    Examples:
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
    Description: Helper function to set focus
    elName(Required): The element we're trying to select
    Examples:
      this.$focusElement('.someel')
  */
  t.$focusElement = function (elName) {
    document.querySelector(elName).focus()
  }

  /*
    Description: Helper to scroll to an element.
    elName(Required): The element we want to scroll to
    mainOptions: Must be an object
      - delay: How fast should we scroll
      - offsetX: Do we need to offset due to a menu or something on the x axis
      - offsetY: Do we need to offset due to a menu or something on the y axis
    Examples:
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

  /*
    Description: Just a helper for scrolling to the top of a page.
    Examples:
      this.$scrollToTop()
  */
  t.$scrollToTop = function () {
    window.scrollTo(0, 0)
  }

  /*
    Description: Returns back the offset of an element
    el(Required): The element we are getting the offset from
    Examples:
      this.$offset('.someel')
  */
  t.$offset = function (el) {
    let rect = el.getBoundingClientRect()
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  /*
    Description: Validation helper for email addresses
    email(Required): This is the string we are trying to validate
    Examples:
      this.$validateEmail('asomeasdf@asdf.com')
  */
  t.$validateEmail = function (email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  /*
    Description: If your using localForage you can use this to get data you have saved.
    key(Required): The key of the data you saved
    Examples:
      this.$getData('token')
  */
  t.$getData = function (key) {
    return new Promise((resolve, reject) => {
      t.$log(pageName, 'calling getData key: ' + key)
      t.$localforage.getItem(key).then((resp) => {
        t.$log(pageName, 'getData response key: ' + key, resp)
        resolve(resp)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  /*
    Description: If your using localForage you can use this to save data locally.
    key(Required): The key of the data your saving
    data(Required): The data you need to save
    Examples:
      this.$storeData('token','lkasdf90a843fklj323423sfel2k3j42lk3j42lk3#$#LJ$L@#JLJKlkj32l4jk234')
      this.$storeData('user', {first_name: 'test', last_name: 'user'})
  */
  t.$storeData = function (key, data) {
    return new Promise((resolve, reject) => {
      t.$log(pageName, 'calling storeData ' + key, data)
      t.$localforage.setItem(key, data).then((resp) => {
        t.$log(pageName, 'storeData response key: ' + key, resp)
        resolve(resp)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  /*
    Description: Strips any html tags out of a string
    text(Required): The text containing a tag
    Examples:
      this.$stripTags('<b>What is this</b>')
  */
  t.$stripTags = function (text) {
    return text.replace(/(<([^>]+)>)/ig, '')
  }

  /*
    Description: Helper to add classes to an element
    elements(Required): The element/s your trying to add a class too
    className: The class your adding
    Examples:
      this.$addClass('.some-el', 'new-class-name')
      this.$addClass(['.some-el1','some-el2'], 'new-class-name')
  */
  t.$addClass = function (elements, className) {
    if (!elements) {
      return
    }

    if (typeof (elements) === 'string') {
      elements = document.querySelectorAll(elements)
    } else if (elements.tagName) {
      elements = [elements]
    }

    for (var i = 0; i < elements.length; i++) {
      if ((' ' + elements[i].className + ' ').indexOf(' ' + className + ' ') < 0) {
        elements[i].className += ' ' + className
      }
    }
  }

  /*
    Description: Helper to remove classes to an element
    elements(Required): The element/s your trying to remove a class from
    className: The class your removing
    Examples:
      this.$removeClass('.some-el', 'old-class-name')
      this.$removeClass(['.some-el1','some-el2'], 'old-class-name')
  */
  t.$removeClass = function (elements, className) {
    if (!elements) {
      return
    }

    if (typeof (elements) === 'string') {
      elements = document.querySelectorAll(elements)
    } else if (elements.tagName) {
      elements = [elements]
    }

    let reg = new RegExp('(^| )' + className + '($| )', 'g')

    for (var i = 0; i < elements.length; i++) {
      elements[i].className = elements[i].className.replace(reg, ' ')
    }
  }
}
