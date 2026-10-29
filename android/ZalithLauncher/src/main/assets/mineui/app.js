(function () {
  var state = { version: '', active: null, versions: [] }
  var selected = null

  var $ = function (id) { return document.getElementById(id) }

  function bridge() {
    return window.MineNative || null
  }

  function native(method, arg) {
    var b = bridge()
    if (!b || typeof b[method] !== 'function') return null
    try {
      return arg === undefined ? b[method]() : b[method](arg)
    } catch (e) {
      return null
    }
  }

  function toast(text) {
    var old = document.querySelector('.toast')
    if (old) old.remove()
    var el = document.createElement('div')
    el.className = 'toast'
    el.textContent = text
    document.body.appendChild(el)
    setTimeout(function () { el.remove() }, 2600)
  }

  function overlay(show, text) {
    var el = $('overlay')
    if (show) {
      $('overlayText').textContent = text || 'Запускаем игру'
      el.hidden = false
    } else {
      el.hidden = true
    }
  }

  function loaderClass(loader) {
    var name = String(loader || '').toLowerCase()
    if (name.indexOf('fabric') >= 0) return 'fabric'
    if (name.indexOf('neoforge') >= 0) return 'neoforge'
    if (name.indexOf('forge') >= 0) return 'forge'
    if (name.indexOf('quilt') >= 0) return 'quilt'
    return 'vanilla'
  }

  function render() {
    $('ver').textContent = state.version ? 'v' + state.version : ''

    var active = state.active
    $('nick').textContent = active || 'Нет аккаунта'
    $('nickSub').textContent = active ? 'offline' : 'Добавь в нативном режиме'
    $('avatar').textContent = active ? active.slice(0, 1).toUpperCase() : '?'

    if (!selected && state.versions.length) selected = state.versions[0].name
    if (selected && !state.versions.some(function (v) { return v.name === selected })) {
      selected = state.versions.length ? state.versions[0].name : null
    }

    var play = $('play')
    play.disabled = !selected || !active
    play.lastElementChild.textContent = active ? 'Играть' : 'Нужен аккаунт'

    var list = $('versionsList')
    list.textContent = ''

    state.versions.forEach(function (v) {
      var card = document.createElement('div')
      card.className = 'card' + (v.name === selected ? ' is-selected' : '')
      card.setAttribute('role', 'button')
      card.tabIndex = 0

      var badge = document.createElement('span')
      badge.className = 'badge ' + loaderClass(v.loader)
      badge.textContent = v.loader || 'Vanilla'

      var body = document.createElement('div')
      body.className = 'card-body'
      var name = document.createElement('span')
      name.className = 'card-name'
      name.textContent = v.name
      var meta = document.createElement('span')
      meta.className = 'card-meta'
      var bits = []
      if (v.mc) bits.push(v.mc)
      if (v.mods) bits.push(v.mods + ' мод' + plural(v.mods))
      meta.textContent = bits.join(' · ')
      body.appendChild(name)
      body.appendChild(meta)

      var playBtn = document.createElement('button')
      playBtn.className = 'card-play'
      playBtn.type = 'button'
      playBtn.title = 'Играть'
      playBtn.addEventListener('click', function (e) {
        e.stopPropagation()
        selected = v.name
        render()
        launch(v.name)
      })

      card.appendChild(badge)
      card.appendChild(body)
      card.appendChild(playBtn)
      card.addEventListener('click', function () {
        selected = v.name
        render()
      })
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          selected = v.name
          render()
        }
      })

      list.appendChild(card)
    })

    $('empty').hidden = state.versions.length > 0
    $('count').textContent = state.versions.length ? state.versions.length + ' шт.' : ''
    $('versionsList').hidden = state.versions.length === 0
  }

  function plural(n) {
    var mod10 = n % 10
    var mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return ''
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'а'
    return 'ов'
  }

  function applyState(json) {
    if (!json) return
    try {
      var next = typeof json === 'string' ? JSON.parse(json) : json
      if (next && next.versions) state = next
      render()
    } catch (e) {
      /* кривой ответ моста, оставляем прошлое состояние */
    }
  }

  function refreshState() {
    applyState(native('getState'))
  }

  function launch(name) {
    if (!name) return
    var result = native('launch', name)
    if (result === null && !window.MineNative) {
      toast('Запуск доступен только в приложении')
    }
  }

  function openNative() { native('openNative') }

  window.__mineEvent = function (type, payload) {
    if (type === 'state') {
      applyState(payload)
    } else if (type === 'launch-start') {
      overlay(true, 'Запускаем ' + payload)
    } else if (type === 'launch-done') {
      overlay(false)
    } else if (type === 'launch-error') {
      overlay(false)
      toast(payload || 'Не получилось запустить игру')
    } else if (type === 'need-account') {
      overlay(false)
      toast(payload || 'Сначала добавь аккаунт')
      openNative()
    }
  }

  $('play').addEventListener('click', function () {
    if (!state.active) { openNative(); return }
    launch(selected)
  })
  $('refresh').addEventListener('click', function () {
    native('refresh')
    setTimeout(refreshState, 800)
  })
  $('versions').addEventListener('click', openNative)
  $('install').addEventListener('click', openNative)
  $('openNative').addEventListener('click', openNative)

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) refreshState()
  })

  refreshState()
  // движок может догрузить версии чуть позже, добираем пару раз
  setTimeout(refreshState, 700)
  setTimeout(refreshState, 2000)
})()
