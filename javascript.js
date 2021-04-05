const DOM = {
  lightMode: document.querySelector(".switch-light"),
  darkMode: document.querySelector(".switch-dark"),
  buttons: document.querySelectorAll(".num"),
  question: document.querySelector(".question"),
  answer: document.querySelector(".answer"),
  equate: document.querySelector(".equals"),
  clear: document.querySelector(".clear"),
};

//TOGGLE DARK AND LIGHT MODE

DOM.lightMode.addEventListener("click", () => {
  console.log(document.body.classList.add("light"));
});

DOM.darkMode.addEventListener("click", () => {
  console.log(document.body.classList.remove("light"));
});

//LOGIC
var finalInputs = ["start"];
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];


var calculation = (arr) => {
  let question, mathTerms, inputUI, answer;

  mathTerms = arr.map((item) => {
    return item.math;
  });

  inputUI = arr.map((item) => {
    return item.input;
  });

  question = inputUI.join(" ");
  console.log(mathTerms.join(""))
  DOM.question.textContent = question;
  answer = eval(mathTerms.join(""));
  DOM.answer.textContent = answer;

 
};

//Add into finalInputs array
var addToFinalInputs = (input) => {
  finalInputs.push(...input);
  calculation(finalInputs);
};

//Clear "CLR" button function
DOM.clear.addEventListener("click", () => {
  finalInputs.pop(finalInputs[finalInputs.length - 1]);
  calculation(finalInputs);
});

//Equate "=" button function
DOM.equate.addEventListener("click", () => {

    let question, mathTerms, inputUI, answer;

  mathTerms = finalInputs.map((item) => {
    return item.math;
  });

  inputUI = finalInputs.map((item) => {
    return item.input;
  });

  question = inputUI.join(" ");
  console.log(mathTerms.join(""))
  DOM.question.textContent = question;

  try {
    answer = eval(mathTerms.join(""));
    DOM.answer.textContent = answer;
  } catch (e) {
    answer = e.message;
    answer = "Math Error";
    DOM.answer.textContent = answer;
  }
  
});




for (let i = 0; i < DOM.buttons.length; i++) {
  

  DOM.buttons[i].addEventListener("click", (e) => {

    //CLICK UX CLICK CHANGE
     DOM.buttons[i].classList.toggle("pressed");

    setTimeout(() => {
      DOM.buttons[i].classList.toggle("pressed");
    }, 200);


    //LOGIC

    let input, currentInputs;
    input = e.target.textContent;
    currentInputs = [];
    console.log(finalInputs)

    if (input !== "CLR " && !input.includes("=")) {
      if (input == "AC") {
        DOM.question.textContent = "";
        finalInputs = [];
      }

      if (finalInputs.length > 0 && input !== "AC") {
        class Number {
          constructor(number) {
            this.number = number;
            if (number === "^") {
              this.math = "**";
            } else if (number === "√(") {
              this.math = "Math.sqrt(";
            } else if (number === "log2(") {
              this.math = "Math.log2(";
            } else if (number === "log10(") {
              this.math = "Math.log10(";
            } else if (number === "x") {
              this.math = "*";
            } else if (number === "AC") {
              this.math = "";
              this.Number = "";
              finalInputs = [];
            } else if (number === "=") {
              this.math = "";
              this.Number = "";
            }  
            
            //  Enables brackets "()" as multiplication

            else if (number === "(" && numbers.includes(finalInputs[finalInputs.length - 1].input) 
            || number === "(" &&finalInputs[finalInputs.length - 1].input ===")") {
                this.math = "*(";
            }else if( finalInputs[finalInputs.length - 1].input ==")" && numbers.includes(number)){
              this.math = "*"+ number;

            }else{
                this.math =  number; 
            }
           
          }

          addToStuff() {
            return {
              math: this.math,
              input: this.number,
            };
          }
        }
        var classOutput1 = new Number(input);
        var classOutput2 = classOutput1.addToStuff();

        currentInputs.push(classOutput2);
        addToFinalInputs(currentInputs);
      } else {
        currentInputs.push(input);
        addToFinalInputs(currentInputs);
      }
    }
  });
}
