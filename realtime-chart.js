const realtimeChartEl = document.getElementById("realtimeChart");
// Step 1 Prepare Data
const mockupData = [
    { date: "2026-02-03", sales: 120, purchase: 100 },
    { date: "2026-02-04", sales: 150, purchase: 130 },
    { date: "2026-02-05", sales: 180, purchase: 140 },
    { date: "2026-02-06", sales: 170, purchase: 150 },
    { date: "2026-02-07", sales: 200, purchase: 160 },
    { date: "2026-02-08", sales: 220, purchase: 180 },
    { date: "2026-02-09", sales: 250, purchase: 190 },
];

// Step 2 Transform Data
function transform(data) {
    return {
        labels: data.map((item) => item.date),
        sales: data.map((item) => item.sales),
        purchase: data.map((item) => item.purchase),
    };
}

const chartData = transform(mockupData);

// Step 3 Chart render
const dd = realtimeChartEl.getContext("2d");

const gradient1 = dd.createLinearGradient(0, 0, 0, 300);
gradient1.addColorStop(0, "rgba(59,130,246,0.8)"); // ฟ้าเข้ม
gradient1.addColorStop(1, "rgba(59,130,246,0)");

const gradient2 = dd.createLinearGradient(0, 0, 0, 300);
gradient2.addColorStop(0, "rgba(230,98,57,0.8)");
gradient2.addColorStop(1, "rgba(230,98,57,0)");


const realtimeChart = new Chart(realtimeChartEl, {
    type: "line",
    data: {
        labels: chartData.labels,
        datasets: [
            {
                label: "Sales",
                data: chartData.sales,
                borderColor: "#0EA5E9",
                backgroundColor: gradient1,
                fill: true,
                tension: 0.4,
            },
            {
                label: "Purchase",
                data: chartData.purchase,
                borderColor: "#E66239",
                backgroundColor: gradient2,
                fill: true,
                tension: 0.4,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRadio: false,
        interaction: {
            mode: "index",
            intersect: false, // 👈 สำคัญ ทำให้ hover ลื่นทั้งแนวตั้ง
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    padding: 10
                }
            },
            tooltip: {
                enabled: true,
                mode: "index",
                intersect: false,
            },
        },
        animation: {
            duration: 400,
            easing: "linear", // สำคัญ! ให้มันไหล
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: true
                },
            },
            y: {
                beginAtZero: true,
            },
        }
    },
});

// Step 4 Update Chart
function addData() {
    let startDate = new Date("2026-02-10");
    startDate.setDate(startDate.getDate() + 1);

    const newLabel = startDate.toISOString().split("T")[0];
    const newSales = Math.floor(Math.random() * 500);
    const newPurchase = Math.floor(Math.random() * 500);

    realtimeChart.data.labels.push(newLabel);
    realtimeChart.data.datasets[0].data.push(newSales);
    realtimeChart.data.datasets[1].data.push(newPurchase);
    // 👉 จำกัดจำนวน (ทำให้มัน slide)
    if (realtimeChart.data.labels.length > 10) {
        realtimeChart.data.labels.shift();
        realtimeChart.data.datasets[0].data.shift();
        realtimeChart.data.datasets[1].data.shift();
    }
    realtimeChart.update();
}

setInterval(addData, 3000);