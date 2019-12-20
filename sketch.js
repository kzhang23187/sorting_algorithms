let values = [];
let states = [];
let w = 5;
let wait = 10;

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  values = new Array(floor(width/w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(500);
    states[i] = -1;
  }
}
function quickSortButton() {
  quickSort(values, 0, values.length - 1);
}
function mergeSortButton() {
  mergeSort(values, 0, values.length - 1);
}

//MERGE SORT
async function mergeSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let mid =  Math.floor((start + end) / 2);
  await mergeSort(arr, start, mid);
  await mergeSort(arr, mid + 1, end);
  await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
  await sleep(wait);
  let start2 = mid + 1;
  if (arr[mid] <= arr[start2]) {
    return;
  } 
  while (start <= mid && start2 <= end) {
    if (arr[start] <= arr[start2]) {

      states[start] = -1;
      start++;
      states[start] = 0;
    } else {
      let value = arr[start2];
      let index = start2;
      //shift all elements between element 1,
      //element2, right by 1
      while (index > start) {
        await sleep(0.05);
        arr[index] = arr[index - 1];
        index-=1;
      }
      arr[start] = value;
      states[start] = -1;
      start++;
      mid++;
      start2++;
      states[start] = 0;
    }
  }
  states[start] = -1;
}




//QUICK SORT
async function quickSort(arr, start, end) {
  // for (let i = start; i < end; i++) {
  //   states[i] = 1;
  // }
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;
  await Promise.all(
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  );
}

async function partition(arr, start, end) {
  min = Math.ceil(start);
  max = Math.floor(end);
  let swap_idx = Math.floor(Math.random() * (max - min + 1)) + min
  await swap(arr, swap_idx, end)
  let part_val = arr[end];
  let idx = start;
  states[idx] = 0;
  for (let k = start; k < end; k++) {
    if (arr[k] < part_val) {
      await swap(arr, k, idx);

      states[idx] = -1;
      idx++;
      states[idx] = 0;
    }
  }
  await swap(arr, idx, end);
  return idx;
}

async function swap(arr, i, j) {
  await sleep(wait); 
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}









function draw() {
  background(51);

  // for ( let i = values.length - 1; i >= 0; i--) {
  //     stroke(0);
  //     fill(255);
  //     rect((values.length - i)*w, height - values[i], w, values[i]);
  // }
  for ( let i = 0; i < values.length; i++) {
    stroke(0);
    if (states[i] == 0) {
      fill(255, 0, 0);
    } else if (states[i] == 1) {
      fill('#E12345');
    } else {
       fill(255);
    }
    rect(i*w, height - values[i], w, values[i]);
}
  
}