export function shuffle(arr) {
  const shuffledArr = [...arr];
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    let x = shuffledArr[i];
    shuffledArr[i] = shuffledArr[j];
    shuffledArr[j] = x;
  }
  return shuffledArr;
};