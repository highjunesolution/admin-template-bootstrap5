const displayDateEl = document.getElementById("display-date")

document.addEventListener("DOMContentLoaded", async () => {
    const raw = await getData()
    const data = raw.map(item=> item.MeasureData)
    const realData = data.map(item=> JSON.parse(item))
    console.log(realData)
})


async function getData() {
    const res = await fetch("data.json")
    const result = await res.json()
    return result
}