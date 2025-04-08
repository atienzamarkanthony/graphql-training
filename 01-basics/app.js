console.log("Started")
setTimeout(() => console.log("Timer"), 1500)
Promise.resolve().then(()=> console.log("Promise"))
console.log("Ended")
process.on("uncaughtException", () => {
    setTimeout(() => console.log("Catching exception here..."), 1500)
})