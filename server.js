const express = require("express");
const app = express();
const multer = require("multer");
const uploadFile = require("./services/storage.services");

app.use(express.json());
let upload = multer({ storage: multer.memoryStorage() });

app.post("/create", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const uploadedFile = await uploadFile(req.file);
  console.log({ uploadedFile });

  res.send(uploadedFile);
});

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/prime/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;

  const checkPrime = (num) => {
    if (num <= 1) return false;

    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }

    return true;
  };

  const primeNum = [];

  for (let i = num1; i <= num2; i++) {
    if (checkPrime(i)) primeNum.push(i);
  }

  res.send(primeNum);
});

app.post("/palindrome/:num", (req, res) => {
  let num = parseInt(req.params.num);
  let temp = num;
  let rem = 0,
    result = 0;

  while (temp > 0) {
    rem = temp % 10;
    result = result * 10 + rem;
    temp = Math.floor(temp / 10);
  }

  if (result === num) return res.send("Number is Pallindrome");
  else return res.send("Not a Pallindrome");
});

app.post("/stringPallindrome/:str", (req, res) => {
  let { str } = req.params;
  let start = 0,
    end = str.length - 1;

  while (start < end) {
    if (str[start] !== str[end]) return res.send("Not a Pallindrome");
    start++;
    end--;
  }

  res.send("Pallindrome");
});

app.post("/rvsStr/:str", (req, res) => {
  let { str } = req.params;
  let reverse = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reverse += str[i];
  }
  res.send(reverse);
});

// olleh dlrow
app.post("/str1", (req, res) => {
  let { str } = req.body;
  let result = "";
  let word = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      word = str[i] + word;
    } else {
      if (word.length > 0) {
        result += word + " ";
        word = "";
      }
    }
  }

  if (word.length > 0) {
    result += word + " ";
    word = "";
  }

  res.send(result);
});

// world hello
app.post("/str2", (req, res) => {
  let { str } = req.body;

  let result = "";
  let word = "";

  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] !== " ") {
      word = str[i] + word;
    } else {
      if (word.length > 0) {
        result += word + " ";
        word = "";
      }
    }
  }

  if (word.length > 0) {
    result += word;
  }

  res.send(result);
});

// dlrow olleh
app.post("/str3", (req, res) => {
  let { str } = req.body;

  let result = "";
  let word = "";

  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] !== " ") {
      word += str[i];
    } else {
      if (word.length > 0) {
        result += word + " ";
        word = "";
      }
    }
  }

  if (word.length > 0) {
    result += word;
  }

  res.send(result);
});

app.post("/frequency", (req, res) => {
  let { arr } = req.body;

  let obj = {};

  arr.forEach((dets) => {
    if (obj[dets] == undefined) {
      obj[dets] = 1;
    } else {
      obj[dets]++;
    }
  });

  res.send(obj);
});

app.post("/unique", (req, res) => {
  let { arr } = req.body;
  let newArr = [];
  arr.forEach((num) => {
    if (!newArr.includes(num)) newArr.push(num);
  });

  res.send(newArr);
});

app.post("/largestWord", (req, res) => {
  let { str } = req.body;
  let longestWord = "",
    word = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " " && i !== str.length) {
      word += str[i];
    } else {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
      word = "";
    }
  }

  if (word.length > longestWord.length) {
    longestWord = word;
  }

  res.send(longestWord);
});

app.post("/tribonnaci/:num", (req, res) => {
  let { num } = req.params;

  if (num == 0) return res.send(0);
  if (num == 1 && num == 2) return res.send(1);

  let a = 0,
    b = 1,
    c = 1,
    next;

  for (let i = 3; i <= num; i++) {
    next = a + b + c;
    a = b;
    b = c;
    c = next;
  }

  res.send(c);
});

app.post("/printfibb/:num", (req, res) => {
  let { num } = req.params;

  let fib = [];
  let a = 0,
    b = 1;
  if (num >= 0) fib.push(a);
  if (num >= 1) fib.push(b);

  for (let i = 3; i <= num; i++) {
    let next = a + b;
    fib.push(next);
    a = b;
    b = next;
  }

  res.send(fib);
});

app.post("/countVowels", (req, res) => {
  let { str } = req.body;
  let vowels = "aeiou";
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      if (vowels.includes(str[i])) count++;
    }
  }

  res.send(count);
});

app.post("/randomInteger/:a/:b", (req, res) => {
  let a = +req.params.a;
  let b = +req.params.b;

  if (a > b) return res.send("Choose correct numbers");

  let result = Math.floor(Math.random() * (b - a + 1) + a);

  res.send(result);
});

app.listen(3000, () => {
  console.log("server is runing on port : 3000");
});
