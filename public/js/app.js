var url = 'http://localhost:3000/weather?address='
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const searchUrl = url+location
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch(searchUrl).then((body) => {
        body.json().then((data) => {
            if (data.error) {
                // return console.log(data.error)
                messageOne.textContent="Opps, looks like something goes wrong."
                messageTwo.textContent=data.error
            } else {
                // console.log(data.location)
                // console.log(data.forecast)
                // messageOne.textContent=(data.location)
                messageOne.textContent=(search.value)
                messageTwo.textContent=(data.forecast)
                
                var speach = new SpeechSynthesisUtterance();
                speach.text = messageOne.textContent + "の天気は" + messageTwo.textContent + 'ちなみに花粉症って大変ですね〜'
                speach.lang = 'ja-JP';
                speechSynthesis.speak(speach);
            }
        })
    })
})