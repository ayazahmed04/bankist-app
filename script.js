'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = movem => {
  containerMovements.innerHTML = '';

  movem.forEach((mov, ind) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
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
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovement(account1.movements);

// const createUserNames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//   });
// };
// createUserNames(accounts);

// console.log(accounts);

// const createUserName = accs => {
//   accs.forEach(acc => {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//   });
// };

const createUserName = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => {
        return name[0];
      })
      .join('');
  });
};
createUserName(accounts);
console.log(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = [0, 1, 2, 3, 4];
let arr2 = [1, 2, 3, 4, 5];

console.log(arr.slice(3));
let allArray = [...arr, ...arr2];
console.log(allArray);
console.log(
  allArray.reduce(e => {
    console.log(e);
  })
);

console.log(arr.reverse());
console.log(arr.concat(allArray));
console.log(arr);
arr.push(...allArray);
console.log(arr);
// console.log(arr.splice(2, 5));

console.log(arr.at(-1));
*/
/*

const mmovements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (let [ind, mov] of mmovements.entries()) {
  if (mov > 0) {
    console.log(`Movement ${ind + 1}: You deposit ${mov}`);
  } else {
    console.log(`Movement ${ind + 1}: You withdraw ${mov}`);
  }
}

console.log('-----FOR EACH LOOP using method');

mmovements.forEach((val, ind, arr) => {
  console.log(val, ind, arr[ind]);
});
*/
/*
const dummyAccount = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

dummyAccount.movements.forEach((val, ind, arr) => {
  console.log(val, ind, arr[++ind]);
  console.log(arr.at(5));
});

*/

/*
const currencian = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencian.forEach((val, ind, map) => {
  console.log(ind, val);
});

let currencianUnique = new Set(['usd', 'gbp', 'usd', ' usd', 'pkr']);
console.log(currencianUnique);
currencianUnique.forEach((value, index, set) => {
  console.log(index, value);
});

*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
let JuliaData = [3, 5, 2, 12, 7];
let kateData = [4, 1, 15, 8, 3];

let JuliaData1 = [9, 16, 6, 8, 3];
let katedata1 = [10, 5, 6, 1, 4];



const checkDogs = (dogsJulia, dogsKate) => {
  console.log();
  let JuliaOnlyDog = [];
  dogsJulia.forEach((dog, ind) => {
    if (ind == 0 || ind == 3 || ind == 4) {
      console.log('These are cats');
    } else JuliaOnlyDog.push(dog);
  });

  console.log(JuliaOnlyDog);

  JuliaOnlyDog.forEach((dog, ind) => {
    if (dog > 3) {
      console.log(
        `Dog number ${ind + 1} of Julia  is and adult, and it's ${dog} year old`
      );
    } else {
      console.log(`Dog number ${ind + 1} of Julia is still a puppy`);
    }
  });
  dogsKate.forEach((dog, ind) => {
    if (dog > 3) {
      console.log(
        `Dog number ${ind + 1} of Kate  is and adult, and it's ${dog} year old`
      );
    } else {
      console.log(`Dog number ${ind + 1} of Kate is still a puppy`);
    }
  });
};

const checkDogs = (juliaD, kateD) => {
  // slice method is to create the copy of the array
  // let correctedJulia = juliaD.slice();
  console.log(juliaD);
  let correctedJulia = [...juliaD];
  correctedJulia.splice(0, 1);
  correctedJulia.splice(2, 2);

  let allData = [...correctedJulia, ...kateD];
  console.log(allData);

  allData.forEach((dog, ind) => {
    if (dog > 3) {
      console.log(`The dog number ${ind + 1} is ${dog} year old `);
    } else {
      let puppyDog = `The dog number ${ind + 1} is still a puppy 🐶`;
      console.log(puppyDog);
    }
  });
};

checkDogs(JuliaData, kateData);

*/

// const movWithMap = account1.movements.map((val, i, arr) => {
//   console.log();
//   let result = `You ${
//     val > 0 ? 'deposited' : 'withdrawl'
//   } money at the index ${i}`;
//   return result;
// });

// console.log(movWithMap);

// Challenge on map someone have
// const array = [
//   [{ id: 1 }, { id: 2 }],
//   [{ id: 'a' }, { id: 'b' }],
//   [{ id: 'string' }],
// ];

// // const newArray = ["1_a_string", "2_a_string", "1_b_string", "2_b_string"] => Person want this type of array
// const newArray = array.map((val, ind, arr) => {
//   console.log(val[ind]);
// });
