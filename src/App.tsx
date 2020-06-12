import React, { useState } from 'react';
import 'bootswatch/dist/sketchy/bootstrap.min.css'
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>
type InputElement = React.ChangeEvent<HTMLInputElement>
interface ITask {
  name: string;
  done: boolean
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);


  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
  }

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('')
  }

  const onChangeTask = (e: InputElement) => {
    setNewTask(e.target.value)
  }
  const toglleDoneTask = (i:number) =>{
    const newTasks:ITask[] = [...tasks]
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={onChangeTask}
                  value={newTask}
                  className="form-control"
                  autoFocus
                />
                <button type="submit" className="btn btn-outline-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => {
            return (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{textDecoration: t.done ? 'line-through':''}}>{t.name}</h2>
            <button className="btn btn-outline-secondary" onClick ={() =>toglleDoneTask(i)}>{t.done ? '✓': '✗'}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
