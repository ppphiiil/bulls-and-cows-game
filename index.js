


function getSecretNumber(n = 4) {
    let random = 0;
    do {
        random = (Math.floor(Math.random() * ((Math.pow(10, n) - 1) - Math.pow(10, (n - 1))))) + Math.pow(10, (n - 1));
    } while (!unique(random))
    return random;
}
//console.log(getSecretNumber());

function unique(number) {
    //make an array
    let arr = [];
    arr = numberToArray(number);

    for (let num of arr) {
        counter = 0;
        for (let i in arr) {
            if (arr[i] == num) {
                counter++;
            }
        }
        //wenn öfter als 1 mal vorhanden return false
        if (counter > 1) {
            return false; //not unique
        }

    }
    return true; //is unique
}
//!console.log(checkUnique(0224)); works not with 0

function getHints(input, secret) {
    let bullcounter = 0;
    let cowcounter = 0;
    let restInputArr = [];
    //number to array
    let inputArr = [];
    inputArr = numberToArray(input);
    //console.log(inputArr);

    secretArr = numberToArray(secret);
    //console.log(secretArr);


    //look for bulls
    for (let i in inputArr) {

        if (inputArr[i] === secretArr[i]) {
            bullcounter++;
        } else {
            restInputArr.push(inputArr[i]);

        }
    }

    //console.log(restInputArr);

    //look for cows
    for (let i in inputArr) {

        if (restInputArr.includes(secretArr[i])) {
            cowcounter++;
        }
    }
    restInputArr = [];

    // console.log(`/TEST/ Bullcounter: ${bullcounter}`);
    // console.log(`/TEST/ Cowcounter: ${cowcounter}`);

    return { input: parseInt(input), secret: secret, bulls: bullcounter, cows: cowcounter };

}

function numberToArray(number) {
    let array = number.toString().split("");//stringify the number, then make each digit an item in an array
    return array.map(x => parseInt(x));//convert all the items back into numbers
}

function checkInput(input, digitLength) {
    let message = "";

    if (input.length == 0) {
        message = "Please, guess a number...";
    }
    if (input.length < digitLength && input.length > 0 && input != "exit") {
        message = "less digits, 4 digits please";
    }
    if (!unique(input) && input != "exit") {
        message = "please use unique digits...";
    }
    // if (input == "exit") {
    //     message = "";
    // }

    return message;
}


function play() {
    let input = 0;
    let bulls = 0;
    let cows = 0;
    let secret = [];
    let digitLength = 4;
    let error = "";

    // Import package
    const prompt = require('prompt-sync')({ sigint: true });

    //welcome text
    console.log("\n\n*****************************************************");
    console.log("*****     HELLO PLAYER1! LET'S PLAY A GAME      *****");
    console.log("*****     Try to guess the 4 digit numbers      *****");
    console.log("*****                                           *****");
    console.log("*****     to EXIT: write 'exit' and Enter       *****");
    console.log("*****************************************************");



    process.stdout.write("\nSecret Number:");
    for (let index = 0; index < digitLength; index++) {
        process.stdout.write("*");

    }
    process.stdout.write("Try to guess the number...\n");

    secret = getSecretNumber(digitLength);


    do {
        //get input
        console.log("\n");
        do {
            input = prompt('Guess a number with 4 unique digits: ');
            error = checkInput(input, digitLength);

            if (error != "") {
                console.log(error);
            };
        } while (error != "");


        let hints = getHints(input, secret);

        if (hints.bulls == digitLength) {
            console.log("WINNER !!!");
            input = "exit";
        }
        console.log(hints);


        // console.log(`/TEST/ secret number: \t${secret}`);
        // console.log(`/TEST/ input number: \t${input}`);

    } while (input != "exit");
}

play();