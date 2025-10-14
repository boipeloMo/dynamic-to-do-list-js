// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select key elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = do not save again
    }

    // Function to add a new task
    function addTask(taskTextParam, save = true) {
        let taskText = taskTextParam;

        // If called from input, retrieve and trim
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        }

        // Check if input is empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new list item (li)
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add click event to remove task
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            // Update Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append remove button to the task
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input field if task added from input
        if (taskInput.value.trim() === taskText) {
            taskInput.value = '';
        }

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Add event listener to button
    addButton.addEventListener('click', () => addTask());

    // Allow pressing Enter to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
