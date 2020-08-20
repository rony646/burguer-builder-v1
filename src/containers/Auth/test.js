const regex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/, "g")

console.log(regex.test("test@gmail.com"))
console.log(regex.test("test@.com"))