const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------

const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'Start Page';

// ------------------------------
// Helper Functions
// ------------------------------

function showCurrentPage(action) {
  console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log(`Back page = ${backPages.peek()}`);
  console.log(`Next page = ${nextPages.peek()}`);
}

function newPage(page) {
  backPages.push(currentPage);
  currentPage = page;
  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage('NEW: ');
}

function backPage() {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage('BACK: ');
}

function nextPage() {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage('NEXT: ');
}

/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------

let finish = false;
let showBack = false;
let showNext = false;

showCurrentPage(currentPage);

while (finish === false) {
  let instructions = baseInfo;
  if (!backPages.isEmpty()) {
    instructions = `${instructions}, ${backInfo}`;
    showBack = true;
  } else {
    showBack = false;
  }
  if (!nextPages.isEmpty()) {
    instructions = `${instructions}, ${nextInfo}`;
    showNext = true;
  } else {
    showNext = false;
  }
  instructions = `${instructions}, ${quitInfo}`;
  console.log(instructions);

  // ------------------------------
  // User Interface Part 2
  // ------------------------------

  const answer = prompt(question);
  let lowerCaseAnswer = answer.toLowerCase();

  if ((lowerCaseAnswer !== 'b') && (lowerCaseAnswer !== 'n') && (lowerCaseAnswer !== 'q')) {
    newPage(answer);
  } else if ((showBack === true) && (lowerCaseAnswer === 'b')) {
    backPage();
  } else if ((showNext === true) && (lowerCaseAnswer === 'n')) {
    nextPage();
  } else if ((showBack === false) && (lowerCaseAnswer === 'b')) {
    console.log('Cannot move back, stack is empty!');
  } else if ((showNext === false) && (lowerCaseAnswer === 'n')) {
    console.log('Cannot move forward, stack is empty!');
  } else if (lowerCaseAnswer === 'q') {
    finish = true;
  }
}