const arr = [
  [1, 2, 3, 4, 5],
  [6, 7, 8],
  [11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21, 22, 23],
  [24, 25],
  [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  [41]
]

const stor = (arr) => {
  const newArr = []
  let len = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length + i + 1 >= len) {
      for (let j = len - 1; j < arr[i].length; j++) {
        let m = j
        let k = i
        while (m >= 0) {
          if (arr[k] && arr[k][m]) {
            newArr.push(arr[k][m])
          }
          m--
          k++
        }
      }
      arr[i].length > len && (len = arr[i].length - 1)
    }
  }
  return newArr
}
console.log(stor(arr))
