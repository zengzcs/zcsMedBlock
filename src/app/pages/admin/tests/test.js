var argon2 = require("argon2");
console.log(argon2.hash("zhao").then((res) => {
    console.log(res)
}));
