function nameExtractor(arrayOfObjs){
  let arrOfNames = []
  for (var i = 0; i < arrayOfObjs.length; i++) {
    arrOfNames.push(arrayOfObjs[i].name)
  }
  return arrOfNames
}

function randomIndexFinder(maxNum, array) {
  let randomInt = Math.floor(Math.random()*maxNum);
  array.forEach((item) => {
    if (randomInt === item) {
      randomIndexFinder(maxNum, array);
    }
  });
  return randomInt
}

// function potentialProps(req, res) {
//   const knex = require('../../knex.js');
//   //future function to find all params of a cheese
// }

module.exports = {
  nameExtractor: nameExtractor,
  randomIndexFinder: randomIndexFinder//,
  //potentialProps: potentialProps
}
