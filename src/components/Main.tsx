import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import "../css/main.css";

interface Task {
  text: string;
  deadline: string;
}

interface MainProps {
  onTaskAdd: (newTask: Task) => void;
  tasksCounter: number;
  setTasksCounter: React.Dispatch<React.SetStateAction<number>>;
  setTasksCounterBig: React.Dispatch<React.SetStateAction<number>>;
  propTasks: Task[]; // Use the correct Task interface
  updatePropTasks: React.Dispatch<React.SetStateAction<Task[]>>; // Use the correct SetStateAction type
}

const Main: React.FC<MainProps> = ({
  onTaskAdd,
  tasksCounter,
  setTasksCounter,
  setTasksCounterBig,
  propTasks,
  updatePropTasks,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksDone, setTasksDone] = useState<Task[]>([]);
  const [tasksDoneVisible, setTasksDoneVisible] = useState(false);
  const [tasksContainerVisible, setTasksContainerVisible] = useState(false);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);

    setTasks(newTasks);
    updatePropTasks(newTasks);
    setTasksCounter((prevCounter) => prevCounter - 1);
    updateTaskCounters();
    showTasks();
  };

  const deleteDoneTask = (index: number) => {
    const newTasksDone = tasksDone.filter((_, i) => i !== index);

    setTasksDone(newTasksDone);
    updateDoneCounter();
    hideTasks();
  };

  useEffect(() => {
    setTasks(propTasks);
  }, [propTasks]);

  const updateTaskCounters = () => {
    updateTaskCounterBig();
    updateDoneCounter();
  };

  const handleColorChangeClick = () => {
    const colorChangeCapsule = document.querySelector(
      ".capsule.color-change"
    ) as HTMLElement;
    if (colorChangeCapsule) {
      colorChangeCapsule.style.backgroundColor = "lightblue";
    }
  };

  const showTasks = () => {
    setTasksContainerVisible(!tasksContainerVisible);
  };

  const hideTasks = () => {
    setTasksContainerVisible(false);
  };

  const updateTaskCounterBig = () => {
    const taskCounterBigElement = document.getElementById(
      "taskCounterBig"
    ) as HTMLElement;
    if (taskCounterBigElement) {
      taskCounterBigElement.textContent = tasks.length.toString();
    }
  };

  const toggleTasksDoneVisibility = () => {
    setTasksDoneVisible(!tasksDoneVisible);
  };

  const updateDoneCounter = () => {
    const tasksDoneCounter = document.getElementById(
      "tasksDoneCounter"
    ) as HTMLElement;
    if (tasksDoneCounter) {
      tasksDoneCounter.textContent = tasksDone.length.toString();
    }
  };

  const markTaskAsDone = (index: number) => {
    const task = propTasks[index];

    setTasksDone((prevTasksDone) => [...prevTasksDone, task]);
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));

    updateTaskCounters();

    const newPropTasks = [...propTasks];
    newPropTasks.splice(index, 1);
    updatePropTasks(newPropTasks);

    setTasksCounter((prevCounter) => prevCounter - 1);
  };

  const markTaskAsUndone = (index: number) => {
    const task = tasksDone[index];

    setTasksDone((prevTasksDone) =>
      prevTasksDone.filter((_, i) => i !== index)
    );

    setTasks((prevTasks) => [...prevTasks, task]);

    updateTaskCounters();
    setTasksCounter(tasksCounter + 1);
    showTasks();
  };

  const updateTasksAndCounters = (newTasks: Task[]) => {
    updatePropTasks(newTasks);
    setTasks(newTasks);
    updateTaskCounters();
    showTasks();
  };

  const updateCounterDaily = () => {
    updateDaysBeforeMonthCounter();
    setTimeout(updateCounterDaily, 86400000);
  };

  const updateDaysBeforeMonthCounter = () => {
    const daysBeforeMonthCounter = document.getElementById(
      "daysBeforeMonth"
    ) as HTMLElement;
    const daysLeft = daysUntilEndOfMonth();
    if (daysBeforeMonthCounter) {
      daysBeforeMonthCounter.textContent = daysLeft.toString();
    }
  };

  const daysUntilEndOfMonth = () => {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const daysLeft = Math.ceil(
      (lastDayOfMonth.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysLeft;
  };

  const generateStyledCalendar = () => {
    const calendarContainer = document.querySelector(
      ".calendar-container"
    ) as HTMLElement;
    calendarContainer.innerHTML = ""; // Clearing previous content

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();

    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = offset; i > 0; i--) {
      const previousMonthDay = document.createElement("div");
      previousMonthDay.classList.add("calendar-day", "previous-month");
      previousMonthDay.textContent = (daysInMonth - i + 1).toString();
      calendarContainer.appendChild(previousMonthDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const calendarDay = document.createElement("div");
      calendarDay.classList.add("calendar-day");

      const dayHasTask = tasks.some((task) => {
        const taskDate = new Date(task.deadline);
        return (
          taskDate.getDate() === day &&
          taskDate.getMonth() + 1 === currentMonth &&
          taskDate.getFullYear() === currentYear
        );
      });

      if (dayHasTask) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.textContent = ".";
        calendarDay.appendChild(dot);
      }

      const dayNumber = document.createElement("span");
      dayNumber.textContent = day.toString();
      calendarDay.appendChild(dayNumber);

      calendarContainer.appendChild(calendarDay);
    }

    const calendarH1 = document.querySelector(
      ".container.calendarh h1"
    ) as HTMLElement;
    if (calendarH1) {
      calendarH1.textContent = `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${currentDate.getFullYear()}`; // Change header to current month and year
    }
  };

  useEffect(() => {
    generateStyledCalendar();
  }, [tasks, currentDate]);

  useEffect(() => {
    updateTaskCounters();
    updateCounterDaily();
  }, [updatePropTasks, tasksCounter]);

  const handleAddTaskClick = () => {
    setShowAddTaskDialog(true);
  };

  const handleAddTask = () => {
    if (newTaskText.trim() === "") {
      // Handling empty task text, show error message or prevent addition
      return;
    }

    const newTask: Task = {
      text: newTaskText,
      deadline: newTaskDeadline,
    };

    onTaskAdd(newTask);

    setNewTaskText("");
    setNewTaskDeadline("");
    setShowAddTaskDialog(false);

    const updatedTasks = [...tasks, newTask];

    updateTasksAndCounters(updatedTasks);

    setNewTaskText("");
    setNewTaskDeadline("");
    setShowAddTaskDialog(false);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  return (
    <>
      <div className="bigcapsule" onClick={showTasks}>
        <h1 id="taskCounterBig">{tasks.length}</h1>
        <p>tasks in progress</p>
        {tasksContainerVisible && (
          <div className="tasks-container">
            {tasks.map((task, index) => (
              <div key={index} className="task-item">
                {task && task.text && <p>{task.text}</p>}
                {task && task.deadline && <p>{task.deadline}</p>}
                <button onClick={() => markTaskAsDone(index)}>Done</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="capsules-row">
        <div
          className="capsule"
          id="tasksDoneCapsule"
          onClick={toggleTasksDoneVisibility}
        >
          <h1 id="tasksDoneCounter">{tasksDone.length}</h1>
          <p>tasks done</p>
          <div className="tasks-done-container">
            {tasksDoneVisible &&
              tasksDone.map((task, index) => (
                <div key={index} className="task-item">
                  {task && task.text && <p>{task.text}</p>}
                  {task && task.deadline && <p>{task.deadline}</p>}
                  <button onClick={() => markTaskAsUndone(index)}>
                    Undone
                  </button>
                  <button onClick={() => deleteDoneTask(index)}>Delete</button>
                </div>
              ))}
          </div>
        </div>
        <div className="capsule color-change" onClick={handleColorChangeClick}>
          <h1 id="daysBeforeMonth">0</h1>
          <p>days before new month</p>
        </div>
      </div>

      <div className="calbuttons-container">
        <button onClick={() => changeMonth(-1)}>Previous Month</button>
        <button onClick={() => changeMonth(1)}>Next Month</button>
      </div>

      <div className="container calendarh">
        <h1>Calendar</h1>
        <div className="calendar-capsule">
          <div className="calendar-container" id="calendarContainer"></div>
        </div>
      </div>
    </>
  );
};

export default Main;
