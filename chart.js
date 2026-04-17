const ctx = document.getElementById("myChart");
const rawData = [
    { date: "2026-02-03", sales: 120, purchase: 100 },
    { date: "2026-02-04", sales: 150, purchase: 130 },
    { date: "2026-02-05", sales: 180, purchase: 140 },
    { date: "2026-02-06", sales: 170, purchase: 150 },
    { date: "2026-02-07", sales: 200, purchase: 160 },
    { date: "2026-02-08", sales: 220, purchase: 180 },
    { date: "2026-02-09", sales: 250, purchase: 190 },
];

//   Week
function transformToWeek(data) {
    return {
        labels: data.map((item) =>
            new Date(item.date).toLocaleDateString("en-US", {
                weekday: "short",
            }),
        ),
        sales: data.map((item) => item.sales),
        purchase: data.map((item) => item.purchase),
    };
}

//   Month
function transformToMonth(data) {
    const weeks = {};

    data.forEach((item) => {
        const week = Math.ceil(new Date(item.date).getDate() / 7);

        if (!weeks[week]) {
            weeks[week] = { sales: 0, purchase: 0 };
        }

        weeks[week].sales += item.sales;
        weeks[week].purchase += item.purchase;
    });

    return {
        labels: Object.keys(weeks).map((w) => `Week ${w}`),
        sales: Object.values(weeks).map((w) => w.sales),
        purchase: Object.values(weeks).map((w) => w.purchase),
    };
}

const dataSet = {
    week: transformToWeek(rawData),
    month: transformToMonth(rawData),
};

let chart;

const filterEl = document.getElementById("rangeDate");

filterEl.addEventListener("change", () => {
    const val = filterEl.value;
    renderChart(
        dataSet[val].labels,
        dataSet[val].sales,
        dataSet[val].purchase,
    );
});

// โหลดครั้งแรก
renderChart(
    dataSet.week.labels,
    dataSet.week.sales,
    dataSet.week.purchase,
);

function renderChart(labels, salesData, purchaseData) {
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Sales",
                    data: salesData,
                    backgroundColor: "#F7A085",
                    borderRadius: 8,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                },
                {
                    label: "Purchase",
                    data: purchaseData,
                    backgroundColor: "#E66239",
                    borderRadius: 8,
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRadio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                    },
                },
                tooltip: {
                    backgroundColor: "#000",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                    padding: 10,
                    cornerRadius: 6,
                },
            },
            animation: {
                duration: 1000,
                easing: "easeOutQuart",
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(0,0,0,0.05)",
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
            animation: {
                duration: 1500,
                y: {
                    from: 0,
                },
            },
        },
    });
}