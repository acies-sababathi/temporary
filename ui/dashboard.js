

document.addEventListener("DOMContentLoaded", function () {
    const barCtx = document.getElementById('barChart').getContext("2d");
    const pieCtx = document.getElementById('pieChart').getContext("2d");
    const lineCtx = document.getElementById('lineChart').getContext("2d");
    const todos = [];

    fetchTodos();

    function fetchTodos() {
        fetch("http://localhost:3000/api/todos")
            .then((response) => response.json())
            .then((fetchTodos) => {
                fetchTodos.forEach(todo => {
                    todos.push(todo)
                });
                renderBarChart();
                renderPieChart();

            }).catch((error) =>
                console.error("error in fetching tasks", error)
            )

    }

    function renderBarChart() {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Completed', 'InCompleted'],
                datasets: [{
                    label: 'Tasks',
                    data: [
                        todos.filter(t => t.completed === 1).length,
                        todos.filter(t => t.completed === 0).length
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function renderPieChart() {
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: [
                    'Completed', 'InCompleted'
                ],
                datasets: [{
                    label: 'Tasks',
                    data: [
                        todos.filter(t => t.completed === 1).length,
                        todos.filter(t => t.completed === 0).length
                    ],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            }
        });

    }

    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });
})

