let values = [];
let states = [];
let w = 5;
let wait = 10;

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  values = new Array(floor(width/w));
  scramble();
}
function scramble() {
  for (let i = 0; i < values.length; i++) {
    values[i] = i*w*height/width;
    states[i] = -1;
  }
  shuffles(values);
}
function shuffles(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function sorted() {
  for (let i = 0; i < states.length; i++) {
    await sleep(1);
    states[i] = 1;
  }
}
async function quickSortButton() {
  document.getElementById("Scramble").disabled = true;
  document.getElementById("Quicksort").disabled = true;
  document.getElementById("Mergesort").disabled = true;
  document.getElementById("Heapsort").disabled = true;
  await quickSort(values, 0, values.length - 1);
  sorted();
  document.getElementById("Scramble").disabled = false;
  document.getElementById("Quicksort").disabled = false;
  document.getElementById("Mergesort").disabled = false;
  document.getElementById("Heapsort").disabled = false;
}

async function mergeSortButton() {
  document.getElementById("Scramble").disabled = true;
  document.getElementById("Quicksort").disabled = true;
  document.getElementById("Mergesort").disabled = true;
  document.getElementById("Heapsort").disabled = true;
  await mergeSort(values, 0, values.length - 1);
  sorted();
  document.getElementById("Scramble").disabled = false;
  document.getElementById("Quicksort").disabled = false;
  document.getElementById("Mergesort").disabled = false;
  document.getElementById("Heapsort").disabled = false;
}

async function heapSortButton() {
  document.getElementById("Scramble").disabled = true;
  document.getElementById("Quicksort").disabled = true;
  document.getElementById("Mergesort").disabled = true;
  document.getElementById("Heapsort").disabled = true;
  await heapSort(values, values.length);
  sorted();
  document.getElementById("Scramble").disabled = false;
  document.getElementById("Quicksort").disabled = false;
  document.getElementById("Mergesort").disabled = false;
  document.getElementById("Heapsort").disabled = false;
}
//HEAP SORT
async function heapifyDown(arr, idx, end) {
  let largest = idx;
  let left_idx = Number(2*idx + 1);
  let right_idx = Number(2*idx + 2);
  if (left_idx < end && arr[largest] < arr[left_idx]) {
    largest = left_idx;
  }
  if (right_idx < end && arr[largest] < arr[right_idx]) {
    largest = right_idx;
  }
  if (largest != idx) {
    await swap(arr, largest, idx);
    await heapifyDown(arr, largest, end);
  }
}
async function heapSort(arr, n) {
  for (let i = Math.floor(n/2) - 1; i > -1; i--) {
    await heapifyDown(arr, i, n);
  }
  for (let i = n-1; i > -1; i--) {
    await swap(arr, 0, i);
    states[i] = 1;
    await heapifyDown(arr, 0, i);
    states[i] = -1;
  }
}







//MERGE SORT
async function mergeSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let mid =  Math.floor((start + end) / 2);
  await Promise.all([
    mergeSort(arr, start, mid),
    mergeSort(arr, mid + 1, end)
  ]);
  await merge(arr, start, mid, end);
  return;
}

async function merge(arr, start, mid, end) {
  await sleep(wait);
  let start2 = mid + 1;
  if (arr[mid] <= arr[start2]) {
    return;
  } 
  while (start <= mid && start2 <= end) {
    await sleep(1);
    
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
  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]
  );
  // await quickSort(arr, start, index - 1);
  // await quickSort(arr, index + 1, end);
  
  return;
}

async function partition(arr, start, end) {
  min = Math.ceil(start);
  max = Math.floor(end);
  let swap_idx = Math.floor(Math.random() * (max - min + 1)) + min
  await swap(arr, swap_idx, end)
  let part_val = arr[end];
  let idx = start;
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
    //stroke(0);
    noStroke();
    if (states[i] == 1) {
      fill(0, 255, 0);
    } else if (states[i] == 0) {
      fill('#E12345');
    } else {
       fill(255);
    }
    rect(i*w, height - values[i], w, values[i]);
}
  
}