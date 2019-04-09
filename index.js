const addSubtractDate = require('add-subtract-date');

function calcFactor(oldFac, quality) {
  // calculate factor according to supermemo2 formula
  let newFac = oldFac + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // check if factor within 1.3 - 2.5 boundaries
  if (newFac > 2.5) newFac = 2.5;
  if (newFac < 1.3) newFac = 1.3;

  return newFac;
}

/**
 * @params {number} a number between 0~5 representing the quality of review. 0 is the worse while 5 is the best.
 * @params {number} the factor of last schedual
 */
export default function(quality, lastSchedule, lastFactor, repetition) {
  let curSchedule, newFactor, newRepetition;

  if (!repetition) {
    // if initial or reseted repetion -> starting values
    newRepetition = 1;
    newFactor = 2.5;
  } else {
    newRepetition = repetition + 1;
  }
  if (quality < 3) {
    // reset values for poor quality
    newRepetition = 0;
    curSchedule = 0;

    if (lastFactor) {
      newFactor = calcFactor(lastFactor, quality);
    }
  } else {
    if (lastFactor) {
      newFactor = calcFactor(lastFactor, quality);
    }
    curSchedule = Math.round(lastSchedule * newFactor);
  }

  if (newRepetition === 1) {
    // 1st repetition intervals are fixed
    if (quality < 5) {
      curSchedule = 2;
    } else {
      curSchedule = 5;
    }
  }
  let dueDate = new Date();
  if (quality >= 3) {
    // calculate interval and due date if satisfactory quality
    if (quality === 5) {
      curSchedule = Math.round(curSchedule * 1.4);
    }
    dueDate = addSubtractDate.add(dueDate, curSchedule, 'days');
  }

  return {
    factor: newFactor,
    schedule: curSchedule,
    isRepeatAgain: quality < 4,
    repetition: newRepetition,
    dueDate
  };
}
