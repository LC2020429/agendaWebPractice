document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const taskList = document.getElementById("taskList");
  const addTaskButton = document.getElementById("addTaskButton");

  addTaskButton.addEventListener("click", async () => {
    const taskValue = taskInput.value.trim();
    const priorityValue = prioritySelect.value;

    if (taskValue) {
      try {
        await addTask(taskValue, priorityValue);
        taskInput.value = "";
      } catch (error) {
        console.error(`Error al ingresar la tarea: ${error}`);
      }
    }
  });

  taskList.addEventListener("click", (event) => {
    const { target } = event;

    if (target.classList.contains("edit-btn")) {
      editTask(target.closest("li"));
    }

    if (target.classList.contains("delete-btn")) {
      deleteTask(target.closest("li"));
    }
  });

  const addTask = async (task, priority) => {
    try {
      await simulateServerRequest(task);
      const listItem = document.createElement("li");
      listItem.classList.add("task-item", priority);

      listItem.innerHTML = `
        <span class="task-text">${task}</span>
        <span class="priority-label">${priority.toUpperCase()}</span>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Eliminar</button>
      `;

      taskList.appendChild(listItem);
      sortTasks();
    } catch (error) {
      throw new Error(error);
    }
  };

  const editTask = (listItem) => {
    const taskText = listItem.querySelector(".task-text");
    const priorityLabel = listItem.querySelector(".priority-label");

    // Crear elementos de edición
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskText.textContent;

    const priorityDropdown = document.createElement("select");
    ["alta", "media", "baja"].forEach((level) => {
      const option = document.createElement("option");
      option.value = level;
      option.textContent = level.toUpperCase();
      if (priorityLabel.textContent.toLowerCase() === level) {
        option.selected = true;
      }
      priorityDropdown.appendChild(option);
    });

    const saveButton = document.createElement("button");
    saveButton.textContent = "Guardar";
    saveButton.classList.add("save-btn");

    // Reemplazar contenido de la tarea con los nuevos elementos
    listItem.innerHTML = "";
    listItem.appendChild(inputField);
    listItem.appendChild(priorityDropdown);
    listItem.appendChild(saveButton);

    // Evento para guardar los cambios
    saveButton.addEventListener("click", () => {
      const newTaskText = inputField.value.trim();
      const newPriority = priorityDropdown.value;

      if (newTaskText) {
        listItem.innerHTML = `
          <span class="task-text">${newTaskText}</span>
          <span class="priority-label">${newPriority.toUpperCase()}</span>
          <button class="edit-btn">Editar</button>
          <button class="delete-btn">Eliminar</button>
        `;
        listItem.classList.remove("alta", "media", "baja");
        listItem.classList.add(newPriority);
        sortTasks();
      }
    });
  };

  const sortTasks = () => {
    const tasks = [...taskList.children];
    const priorityOrder = { alta: 1, media: 2, baja: 3 };
    tasks.sort((a, b) => priorityOrder[a.classList[1]] - priorityOrder[b.classList[1]]);
    taskList.innerHTML = "";
    tasks.forEach((task) => taskList.appendChild(task));
  };

  const deleteTask = (listItem) => {
    listItem.remove();
  };

  const simulateServerRequest = (task) => {
    return new Promise((resolve, reject) => {
      resolve(`Tarea ${task} agregada con éxito`);
      reject("Error al agregar al servidor");
    });
  };
});
