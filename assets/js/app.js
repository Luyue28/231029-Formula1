// This variable represents the entire list of race data. 
const racedata = fetchFormula1Data();

/**
 * Initializes the app. 
 */
function init() {
  for(let i = 0; i < racedata.length; i++){
    displayDrivers(racedata[i]);
    displayOption(racedata[i]);
  }
  displayTheFastest();
  document.getElementById('submit').addEventListener('click', addNewItem);
}

// This function is called when the page is fully loaded.
window.addEventListener('load', init);

/**
 * Display all drivers name on left side and their total race times on right side.
 * @param {*} obj take racedata[i] as a parameter
 */
function displayDrivers(obj){
  const driversBox = document.createElement('tr');
  document.getElementById('laps').appendChild(driversBox);
  const driverName = document.createElement('td');
  driverName.innerHTML = obj.name;
  driversBox.appendChild(driverName);
  const totalTimeForEach = document.createElement('td');
  totalTimeForEach.className = 'time';
  totalTimeForEach.innerHTML = totalTime(obj.laps);
  driversBox.appendChild(totalTimeForEach);
}

/**
 * Calculate the total race times for each driver and convert them in format.
 * @param {*} arr take racedata[i].laps as a parameter
 * @returns a formatted total time 
 */
function totalTime(arr){
  const sum = arr.reduce(function(total, current){
    return total + current;
  }, 0);
  return convertTimeFormat(sum);
}

/**
 * Convert total race times in format.
 * @param {*} aTime take the formatted total race times as a parameter
 * @returns a formatted time with minutes and seconds
 */
function convertTimeFormat(aTime){
  let seconds = aTime % 60;
  const minutes = (aTime - seconds) / 60;
  seconds = seconds.toFixed(3);
  if(minutes >= 1){
    return `${minutes}:${seconds.toString().padStart(6, '0')}`;
  }else{
    return `${seconds}`;
  }
}

/**
 * Display all options in selection box.
 * @param {*} obj take racedata[i] as a parameter
 */
function displayOption(obj){
  const anOption = document.createElement('option');
  anOption.innerHTML = obj.name;
  anOption.value = obj.carNumber;
  document.getElementById('driver').appendChild(anOption);
}

/**
 * Display the fastest driver name and his best score.
 */
function displayTheFastest(){
  const fastestDriverInside = newArrWithFastestItem();
  const fastestName = document.createElement('td');
  fastestName.innerHTML = fastestDriverInside[0].name;
  document.getElementById('fastest').appendChild(fastestName);
  const fastestLapTime = document.createElement('td');
  fastestLapTime.className = 'time';
  fastestLapTime.innerHTML = convertTimeFormat(fastestDriverInside[0].laps);
  document.getElementById('fastest').appendChild(fastestLapTime);
}

/**
 * Sort the laps array for each driver, then laps[0] will be the fastest time in each array.
 * Create a new object and write all the best scores inside.
 * Sort the new object by laps, then obj[0] would have the best driver's name and his best score.
 * @returns an array with many objects, and the first object has best driver's name and his best score
 */
function newArrWithFastestItem(){
  const arrWithFastestItem = [];
  for(let j = 0; j < racedata.length; j++){
    sortArr(racedata[j].laps);
    const fastestObject = {};
    fastestObject.name = racedata[j].name;
    fastestObject.laps = racedata[j].laps[0];
    arrWithFastestItem.push(fastestObject);
  }
  return sortObj(arrWithFastestItem);
}

/**
 * Sort an array with numbers, the first one will be the smallest.
 * @param {*} arr take racedata[r].laps as a parameter
 * @returns an arr has been sorted
 */
function sortArr(arr){
  arr.sort(function(indexA, indexB){
    return indexA - indexB;
  });
  return arr;
}

/**
 * Sort an array by its object's property(a number), the first object's property will be the smallest.
 * @param {*} objInArr take arrWithFastestItem(an array with many objects inside) as a parameter
 * @returns an arr(has objects inside) has been sorted
 */
function sortObj(objInArr){
  objInArr.sort(function(indexA, indexB){
    return indexA.laps - indexB.laps;
  });
  return objInArr;
}

/**
 * When user click the commit button, this function will be run.
 * It will match the carNumber with specific racebase object, then add the new lapTime into the array.
 * For recalculating total time, it should delete all data have already inside Dom then rewrite.
 */
function addNewItem(){
  const userInput = getUserInput();
  for(let i = 0; i < racedata.length; i++){
    if(userInput.carNumber === racedata[i].carNumber){
      racedata[i].laps.push(userInput.lapTime);
      document.getElementById('laps').innerHTML = '';
      document.getElementById('fastest').innerHTML = '';
      init();
    }
  }
}

/**
 * Return the values of user inputted as an object. 
 * @returns an object containing the values
 */
function getUserInput() {
  return {
    // use `parseInt()` to convert a string into a number
    carNumber: parseInt(document.getElementById('driver').value),
    // use `parseFloat()` to convert a string into a number
    lapTime: parseFloat(document.getElementById('lapTime').value)
  };
}
