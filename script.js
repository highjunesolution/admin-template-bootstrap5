const displayDateEl = document.getElementById("display-date")
const displayTimeEl = document.getElementById("display-time")

function render() {
    const now = new Date()

    const day = String(now.getDate()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = now.getFullYear()

    const hh = String(now.getHours()).padStart(2, "0")
    const mm = String(now.getMinutes()).padStart(2, "0")
    const ss = String(now.getSeconds()).padStart(2, "0")

    displayDateEl.textContent = `Date : ${day}/${month}/${year}`
    displayTimeEl.textContent = `Time : ${hh}:${mm}:${ss}`
}

render()
setInterval(render, 1000)

const realtimeChartEl = document.getElementById("realtimeChart")

// Step 1 Prepare Data
const mockupData = [
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: 2 },
    { id: Date.now(), sales: 2.3 },
    { id: Date.now(), sales: 2.3 },
    { id: Date.now(), sales: 2 },
    { id: Date.now(), sales: -2 },
    { id: Date.now(), sales: -2 },
    { id: Date.now(), sales: 2 },
    { id: Date.now(), sales: 2.3 },
    { id: Date.now(), sales: 2.3 },
    { id: Date.now(), sales: 2 },
    { id: Date.now(), sales: -2 },
    { id: Date.now(), sales: -2 },
    { id: Date.now(), sales: 10 },
    { id: Date.now(), sales: 10.3 },
    { id: Date.now(), sales: 10.3 },
    { id: Date.now(), sales: 10 },
    { id: Date.now(), sales: -2 },
    { id: Date.now(), sales: -2 },
    { id: Date.now(), sales: 2 },
    { id: Date.now(), sales: 2.3 },
    { id: Date.now(), sales: 2.3 },
    { id: Date.now(), sales: 2 },
    { id: Date.now(), sales: -2 },
    { id: Date.now(), sales: -2 },
    { id: Date.now(), sales: 2 },
    { id: Date.now(), sales: 2.3 },
    { id: Date.now(), sales: 2.3 },
    { id: Date.now(), sales: 2 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },
    { id: Date.now(), sales: -4 },

]

// Step 2 Transform Data
const transform = (data) => ({
    labels: data.map((item) => item.id),
    sales: data.map((item) => item.sales)
})

const chartData = transform([]); // เอาข้อมูลไป transform
console.log(chartData)

// Step 3 Chart Render
const dd = realtimeChartEl.getContext("2d")
const gradient1 = dd.createLinearGradient(0, 0, 0, 600);
gradient1.addColorStop(0, "rgba(59,130,246,0.8)"); // ฟ้าเข้ม
gradient1.addColorStop(1, "rgba(59,130,246,0)");

const gradient2 = dd.createLinearGradient(0, 0, 0, 600);
gradient2.addColorStop(0, "rgba(230,98,57,0.8)");
gradient2.addColorStop(1, "rgba(230,98,57,0)");

const realtimeChart = new Chart(realtimeChartEl, {
    type: "line",
    data: {
        labels: chartData.labels,
        datasets: [
            {
                label: "Your Money",
                data: chartData.sales,
                borderColor: "#0EA5E9",
                fill: true,
                tension: 0.5,
            }
        ]
    },
    options: {
        scales: {
            x: {
                ticks: {
                    display: false   // ปิด label แกน X ทั้งหมด
                }
            },
            y: {
                grace: "10%"
            }
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    padding: 10
                }
            }
        }
    }
});

// Step 4 Update Chart
let currentIndex = 0;
function addData() {
    if(currentIndex >= mockupData.length) {
        clearInterval()
        return
    }

    const item = mockupData[currentIndex]
    realtimeChart.data.labels.push(item.id)
    realtimeChart.data.datasets[0].data.push(item.sales)

    realtimeChart.update()
    currentIndex++
}

const intervalId = setInterval(addData, 100)