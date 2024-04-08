export default async function first() {
    const argon2 = require("argon2");
    console.log(await argon2.hash("zhao"));
}
first()