// Helper function to create a deterministic equation
function createEquation(target) {
  if (target < 0 || target > 60) {
      throw new Error("Input must be between 0 and 60.");
  }

  const operators = ['+', '-', '*', '/'];
  let num1, num2, operator, result;

  // Determine the maximum number allowed
  const maxNum = target < 10 ? 10 : target;

  do {
      num1 = Math.floor(Math.random() * (maxNum + 1)); // Random number between 0 and maxNum
      num2 = Math.floor(Math.random() * (maxNum + 1)); // Random number between 0 and maxNum
      operator = operators[Math.floor(Math.random() * operators.length)]; // Random operator

      switch (operator) {
          case '+':
              result = num1 + num2;
              break;
          case '-':
              result = num1 - num2;
              break;
          case '*':
              result = num1 * num2;
              break;
          case '/':
              if (num2 !== 0 && Number.isInteger(num1 / num2)) {
                  result = num1 / num2;
              } else {
                  result = null; // Invalid division, retry
              }
              break;
          default:
              result = null;
      }
  } while (result !== target); // Keep generating until the equation matches the target

  return [num1, operator, num2];
}


// Function to update the clock
function updateClock() {

  //get time
  let date = new Date();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59

  //get hours/minutes equation
  const hourEquation = createEquation(h);
  const minuteEquation = createEquation(m);

  //split hour equation
  h11  = zeroPad(hourEquation[0]).substring(0, 1);
  h12  = zeroPad(hourEquation[0]).substring(1, 2);
  hop  = zeroPad(hourEquation[1]);
  h21  = zeroPad(hourEquation[2]).substring(0, 1);
  h22  = zeroPad(hourEquation[2]).substring(1, 2);

  //split minute equation
  m11  = zeroPad(minuteEquation[0]).substring(0, 1);
  m12  = zeroPad(minuteEquation[0]).substring(1, 2);
  mop  = zeroPad(minuteEquation[1]);
  m21  = zeroPad(minuteEquation[2]).substring(0, 1);
  m22  = zeroPad(minuteEquation[2]).substring(1, 2);

  //map operators to strings
  let opMap = {
    '+': 'p',
    '-': 'm',
    '*': 'x',
    '/': 'd'
  };

  //replace operators with strings
  hop = opMap[hop];
  mop = opMap[mop];

  const img_loc = "images/arabic/";

  //Hour images
  let img_h11 = "<img src=\""+ img_loc + "n" + h11 + ".png\" alt=\"\" />";
  let img_h12 = "<img src=\""+ img_loc + "n" + h12 + ".png\" alt=\"\" />";
  let img_hop = "<img src=\""+ img_loc + "o" + hop + ".png\" alt=\"\" />";
  let img_h21 = "<img src=\""+ img_loc + "n" + h21 + ".png\" alt=\"\" />";
  let img_h22 = "<img src=\""+ img_loc + "n" + h22 + ".png\" alt=\"\" />";
  //Minute images
  let img_m11 = "<img src=\""+ img_loc + "n" + m11 + ".png\" alt=\"\" />";
  let img_m12 = "<img src=\""+ img_loc + "n" + m12 + ".png\" alt=\"\" />";
  let img_mop = "<img src=\""+ img_loc + "o" + mop + ".png\" alt=\"\" />";
  let img_m21 = "<img src=\""+ img_loc + "n" + m21 + ".png\" alt=\"\" />";
  let img_m22 = "<img src=\""+ img_loc + "n" + m22 + ".png\" alt=\"\" />";

  document.getElementById("h11").innerHTML=img_h11;
  document.getElementById("h12").innerHTML=img_h12;
  document.getElementById("hop").innerHTML=img_hop;
  document.getElementById("h21").innerHTML=img_h21;
  document.getElementById("h22").innerHTML=img_h22;

  document.getElementById("m11").innerHTML=img_m11;
  document.getElementById("m12").innerHTML=img_m12;
  document.getElementById("mop").innerHTML=img_mop;
  document.getElementById("m21").innerHTML=img_m21;
  document.getElementById("m22").innerHTML=img_m22;

}

function zeroPad(num) {
  return (num < 10 ? "_"  : '') + num;
}


// Initialize the clock and set it to update on every minute change
function initializeClock() {
  // Call updateClock immediately to set initial state
  updateClock();

  // Use setInterval to ensure updates every minute
  setInterval(() => {
    const now = new Date();
    if (now.getSeconds() === 0) {
      updateClock();
    }
    else {
      console.log("Not a minute change");
    }
  }, 1000); // Check every second for the start of a new minute
}

// Start the clock
initializeClock();
