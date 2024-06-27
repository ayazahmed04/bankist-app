"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovement = (movem , sort = false) => {

  containerMovements.innerHTML = "";

  let sortMov = sort ? movem.slice().sort( (a, b ) => a -b) : movem
  sortMov.forEach((mov, ind) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    //
    let html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${ind + 1} ${type}
          </div>
          <div class="movements__value">${mov}</div>
        </div>
          `;
    // console.log(mov);
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovement(account1.movements)

// Sort Button 
  let sorted;
btnSort.addEventListener('click' , (e) => { 
  e.preventDefault()
  displayMovement(currentAccount.movements, sorted)
  sorted = !sorted
})

// Total Balance Value
const calcTotalBalance = (acc) => {
  console.log(acc.movements);
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.innerHTML = `${balance} EUR`;
};

// calcTotalBalance(account1.movements)

// Display total summary
const calcTotalSummary = (acc) => {
  // Total Income
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => mov + acc, 0);
  labelSumIn.textContent = incomes;

  // Total Deposit
  const deposit = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = -deposit;

  // Total Summary
  let allPostMoney = [];
  for (let i = 0; i < acc.movements.length; i++) {
    if (acc.movements[i] < 0) {
      allPostMoney.push(-acc.movements[i]);
    } else {
      allPostMoney.push(acc.movements[i]);
    }
  }
  const totalSumIn = allPostMoney.reduce((acc, mov) => (acc + mov) * 0.05, 0);

  labelSumInterest.innerHTML = Math.floor(totalSumIn);
};

console.log(calcTotalSummary(account1));
// calcTotalSummary(account1.movements)
// CreateUserName
const createUserName = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => {
        return name[0];
      })
      .join("");
  });
};

createUserName(accounts);

let currentAccount;
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and messages

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    UpdateUI(currentAccount);
  } else {
    alert("Plz enter the correct passwd");
  }
});

// Transfer button functionality set
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const transferValue = Number(inputTransferAmount.value);
  const transferTo = inputTransferTo.value;

  accounts.find((acc) => {
    if (acc.username === transferTo) {
      currentAccount.movements.push(-transferValue);
      acc.movements.push(transferValue);
    } else {
      // Alert Box from the the alertbox.js.org
      alertbox.render({
        alertIcon: "error",
        title: "Sorry",
        message: "Plz Enter Correct User Name",
        border: true,
        btnTitle: "Ok",
      });
    }
    UpdateUI(currentAccount);
  });
});

// Update UI
function UpdateUI(acc) {
  // displayMovements
  displayMovement(acc.movements);

  // display Balance
  calcTotalBalance(acc);
  // Display Summary
  calcTotalSummary(acc);
}

// Loan Button functionality added
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loanValue = Number(inputLoanAmount.value);

  currentAccount.movements.push(loanValue);
  UpdateUI(currentAccount);
});

// Delete the user account btn
btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === Number(currentAccount.pin)) 
  {
    // finding the index of the number
    const index = accounts.findIndex( acc => acc.username === currentAccount.username);
    
    // Delete Accounts 
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0;
    
    // Set value to 0 
    inputCloseUsername.value = inputClosePin.value = '';
  }
  
 
});

// Some and every Method learning in js 
