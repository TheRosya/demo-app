import TaskItem from "./TaskItem";
import styles from './../styles/TaskList.module.css'
import DateInfo from "./DateInfo";


const TaskList = ({ tasks, setTasks }) => {
    

    if (!tasks.length) {
        return (
            <p className={styles.task_no_found}>Нет задач</p>
        )
    }
    
    // Функция для форматирования даты на русском языке
    const formatDate = (date) => {
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        };


        let formattedDate = date.toLocaleDateString('ru-RU', options);

        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        return formattedDate;
    };

    // Функция для отображения блока с задачами для конкретной даты
    const renderTaskBlock = (date) => {
        const tasksForDate = tasks.filter(task => new Date(task.date).toDateString() === date.toDateString());

        return (
            <div key={date.toDateString()}>
                <h3 className={styles.relative_date}><DateInfo date={date} />{formatDate(date)}</h3>
                <ul>
                    {tasksForDate.map(task => (
                        <TaskItem key={task.id} task={task} setTasks={setTasks}/>
                    ))}
                </ul>
            </div>
            );
    };

    // Создаем массив уникальных дат из задач
    const uniqueDates = Array.from(new Set(tasks.map(task => new Date(task.date).toDateString()))).map(dateString => new Date(dateString));

    return (
        <div className="container mx-auto mt-8">
          <div className="grid md:grid-cols-1" style={{marginBottom: 60}}>
          {uniqueDates.map(date => renderTaskBlock(date))}
          </div>
        </div>
    )
};

export default TaskList;
