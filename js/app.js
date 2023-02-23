let mainEl = document.querySelector('.main')

let wrapper = document.createElement('div')

wrapper.classList.add('main__cards')

let formEl = document.createElement('form'),
    inputEl = document.createElement('input'),
    searchBtnEl = document.createElement('button')

formEl.classList.add('search')
formEl.addEventListener('submit', async function (e) {
  e.preventDefault()

  let inputsValue = Object.fromEntries(new FormData(e.target))
  let response = await fetch(`https://api.github.com/users/${inputsValue.name}`)
  if (response.ok) {
    let data = await response.json()

    wrapper.append(createBtn(data))
    mainEl.append(wrapper)
    inputEl.value = ''
  } else {
    alert("Пользователь не найден :(")
  }
})

inputEl.classList.add('search__input')
inputEl.setAttribute('name', 'name')
inputEl.setAttribute('placeholder', 'Поиск пользователей...')

searchBtnEl.classList.add('search__btn')
searchBtnEl.setAttribute('type', 'submit')
searchBtnEl.innerText = 'Поиск'

formEl.append(inputEl)
formEl.append(searchBtnEl)
mainEl.append(formEl)

function createBtn(profileData) {
  let div = document.createElement('div')

  div.classList.add('profile__card')
  div.innerHTML = `
    <img src="${profileData.avatar_url}" alt="${profileData.name}" class="profile__img">
    <p class="profile__txt">Имя: <span class="profile__txt-span">${profileData.name}</span></p>
    <p class="profile__txt">Город: <span class="profile__txt-span">${profileData.location}</span></p>
    <p class="profile__txt">О себе: <span class="profile__txt-span">${profileData.bio}</span></p>
    <button class="profile__btn">Удалить</button>
  `

  let btn = div.querySelector('button')
  btn.addEventListener('click', function (e) {
    div.remove()
  })

  return div
}