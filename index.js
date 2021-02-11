function getSecretNumber(n = 4) {
    let random = 0
    do {
        random =
            Math.floor(Math.random() * (Math.pow(10, n) - 1 - Math.pow(10, n - 1))) +
            Math.pow(10, n - 1)
    } while (!unique(random))
    return random
}

function unique(number) {
    //make an array
    let arr = []
    arr = numberToArray(number)

    for (let num of arr) {
        counter = 0
        for (let i in arr) {
            if (arr[i] == num) {
                counter++
            }
        }
        //wenn öfter als 1 mal vorhanden return false
        if (counter > 1) {
            return false //not unique
        }
    }
    return true //is unique
}

function winner() {
    document.getElementById(
        'welcome',
    ).innerHTML = `Yea! ${playerName} you win this game !!!`
    document.getElementById('hints').style.color = '#ff0000'
    confetti.start(10000)
    winnerFlag = 1;
}

function getHints() {

    //dont give hints if winnerflag 
    if (winnerFlag) {
        return
    }

    //reset
    let bullcounter = 0
    let cowcounter = 0
    let restInputArr = []

    //if there is a element inside, than remove it
    if (document.getElementById('funny-images').lastChild) {
        document
            .getElementById('funny-images')
            .removeChild(document.getElementById('funny-images').lastChild)
    }

    //get input from textfield
    input = document.getElementById('input').value


    error = checkInput(input)
    document.getElementById('error').innerHTML = error

    // if there is an error, dont run the whole function
    if (error != '') {
        return
    }

    //start count after error handling
    hintsCounter++

    //number to array
    let inputArr = []
    inputArr = numberToArray(input)
    secretArr = numberToArray(secret)

    //look for bulls
    for (let i in inputArr) {
        if (inputArr[i] === secretArr[i]) {
            bullcounter++
        } else {
            restInputArr.push(inputArr[i])
        }
    }

    //look for cows
    for (let i in inputArr) {
        if (restInputArr.includes(secretArr[i])) {
            cowcounter++
        }
    }
    restInputArr = []

    //add hints
    let newestHint = `${hintsCounter}:   ${parseInt(
        input,
    )} , bulls: ${bullcounter} , cows: ${cowcounter}`
    //addHints(newestHint);
    addHintsImages(bullcounter, cowcounter, newestHint)

    if (input == secret) {
        winner()
    }

    //reset inputs
    document.getElementById('input').value = ''
}

function getRandomMotivationMessage() {
    let random = Math.ceil(Math.random() * motivationMessage.length - 1)
    console.log(random)
    document.getElementById('error').innerHTML = motivationMessage[random]
}
function addHints(newestHint) {
    var para = document.createElement('p')
    para.innerHTML = newestHint
    document.getElementById('hints').appendChild(para)
}

function addHintsImages(bullcounter, cowcounter, newestHint) {
    var para = document.createElement('p')
    para.innerHTML = newestHint
    document.getElementById('images').appendChild(para)

    //put the element at the beginning of element list
    var element = document.getElementById('images')
    element.insertBefore(para, element.firstChild)

    let arr = []

    //! for testing
    console.log(cowcounter, bullcounter)

    //put all cows into array
    for (let index = 0; index < cowcounter; index++) {
        image = document.createElement('IMG')
        image.src = 'src/images/icons/image-cows1.png'
        arr.push(image)
    }

    //put all bulls into array
    for (let index = 0; index < bullcounter; index++) {
        var image = document.createElement('IMG')
        image.src = 'src/images/icons/image-bulls1.png'

        arr.push(image)
    }

    console.log(arr)

    //print all cows and bulls
    for (let index = 0; index < arr.length; index++) {
        //print it
        document.getElementById('images').appendChild(arr[index])

        //put it to the top off list
        //! because of this it is in reverse order!!!!
        var element = document.getElementById('images')
        element.insertBefore(arr[index], element.firstChild)
    }

    //print random funny image and random message
    if (bullcounter == 0 && cowcounter == 0) {
        var image = document.createElement('IMG')
        let random = Math.ceil(Math.random() * 9)
        image.src = `src/images/funny/${random}.jpg`
        document.getElementById('funny-images').appendChild(image)

        getRandomMotivationMessage()
    }
}

function numberToArray(number) {
    let array = number.toString().split('') //stringify the number, then make each digit an item in an array
    return array.map((x) => parseInt(x)) //convert all the items back into numbers
}

function checkInput(input, digitLength = 4) {
    let message = ''

    if (input == 'exit') {
        return 'It was nice to play with you ;) BYE BYE'
    } else if (!input.length) {
        return 'Please, guess a number'
    } else if (isNaN(parseInt(input))) {
        return 'Thats not a number ;) '
    } else if (!unique(input)) {
        return 'please use unique digits'
    } else if (input.length < digitLength) {
        return 'less digits, 4 digits please'
    } else return (message = '')
}

function getInput() {
    input = document.getElementById('input').value
    document.getElementById('log').innerHTML = input
}

function startGame() {
    // playerName = prompt('Hi, whats your name? ');

    //hide start-section
    document.getElementById('start-section').style.display = 'none'
    document.getElementById('settings-section').style.display = 'none'
    document.getElementById('game-section').style.display = 'flex'

    playerName = document.getElementById('name').value

    //welcome text
    document.getElementById('welcome').innerHTML = `Hello ${playerName}! `
    document.getElementById('info').innerHTML = 'Try to guess the number'

    //get the secret Number
    secret = getSecretNumber(digitLength)

    //print or hide secret number
    if (testFlag == 1) {
        document.getElementById('secret').innerHTML = ` ${secret} `
    } else {
        document.getElementById('secret').innerHTML = ` ? ? ? ? `
    }
}

function showSettings() {
    //hide start-section
    document.getElementById('start-section').style.display = 'none'
    document.getElementById('settings-section').style.display = 'flex'
    document.getElementById('game-section').style.display = 'none'

    //get the actual statuses from programm and show it
    document.getElementById('testFlag').value = testFlag
}

function saveSettings() {

    //save
    testFlag = document.getElementById('testFlag').value
    document.getElementById('log').innerHTML = `testflag: ${testFlag} `

    //hide start-section
    document.getElementById('start-section').style.display = 'none'
    document.getElementById('settings-section').style.display = 'none'
    document.getElementById('game-section').style.display = 'flex'

    //print or hide secret number (double in code!!!!!)
    if (testFlag == 1) {
        document.getElementById('secret').innerHTML = ` ${secret} `
    } else {
        document.getElementById('secret').innerHTML = ` ? ? ? ? `
    }
}

function newGame() {
    //adde gamecounter

    //lösche hints
    while (document.getElementById('images').firstChild) {
        document
            .getElementById('images')
            .removeChild(document.getElementById('images').lastChild)
    }
    //lösche hintcounter
    hintsCounter = 0

    //reset input
    document.getElementById('input').value = ''
    winnerFlag = 0;

    //start new
    startGame()
}



let secret = []
let input = 0
let digitLength = 4
let bulls = 0
let cows = 0
let error = ''
let playerName = 'Player1'
let testFlag = 1
let hintsCounter = 0
let motivationMessage = [
    'Come on, you can guess better ;)',
    'Maybe, you try again',
    'No cow and no bull. haha!',
]
let winnerFlag = 0;


//hide start-section
document.getElementById('start-section').style.display = 'visible'
document.getElementById('settings-section').style.display = 'none'
document.getElementById('game-section').style.display = 'none'