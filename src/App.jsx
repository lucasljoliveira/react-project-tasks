import { useState, useRef } from 'react';

import ProjectDetail from './components/ProjectDetail.jsx';
import ProjectCreate from './components/ProjectCreate.jsx';
import ProjectEmpty from './components/ProjectEmpty.jsx';
import SideBar from './components/SideBar.jsx';
import Modal from './components/Modal.jsx';


function App() {
  const modal = useRef();
  const [currentState, setCurrentState] = useState(
    {
      currentState: undefined,
      projectList: [],
      taskList: []
    }
  ); // undefined / create / detail
  
  function handleAddTask(task){
    if (task.name.trim() === ""){
      modal.current.open()
      return;
    }
    let id;
    setCurrentState(prevCurrentState => {
      if (prevCurrentState["taskList"].length > 0) {
        id = Math.max(...prevCurrentState["taskList"].map((task) => {return task.id})) + 1;
      }
      else {
        id = 0;
      }

      task["id"] = id
      task["projectId"] = prevCurrentState.currentProjectId
      let tasks = [
        ...prevCurrentState.taskList,
        task
      ]
      return {
        ...prevCurrentState,
        taskList: tasks,
        selectedProjectTasks: tasks.filter(task => {return task.projectId == prevCurrentState.currentProjectId})
      }
    })
  }

  function handleDeleteTask(taskId){
    setCurrentState(prevCurrentState => {
      let tasks = prevCurrentState.taskList.filter(task => task.id !== taskId)
      return {
        ...prevCurrentState,
        taskList: tasks,
        selectedProjectTasks: tasks.filter(task => {return task.projectId == prevCurrentState.currentProjectId})
      }
    })
  }

  function handleStartAddProject() {
    setCurrentState(prevCurrentState => {
      return {
        projectList: prevCurrentState.projectList,
        taskList: prevCurrentState.taskList,
        currentState: "create"
      }
    })
  }
  
  function handleDetailProject(id) {
    setCurrentState(prevCurrentState => {
      return {
        ...prevCurrentState,
        currentState: "detail",
        currentProjectId: id,
        selectedProject: currentState.projectList.find(project => {return project.id == id}),
        selectedProjectTasks: currentState.taskList.filter(task => {return task.projectId == id})
      }
    })
  }

  function handleClose(){
    setCurrentState(prevCurrentState => {
      return {
        ...prevCurrentState,
        currentState: undefined
      }
    })
  }

  function handleAddProject(project) {
    let id;
    setCurrentState(prevCurrentState => {
      if (prevCurrentState["projectList"].length > 0) {
        id = Math.max(...prevCurrentState["projectList"].map((project) => {return project.id})) + 1;
      }
      else {
        id = 0;
      }

      project["id"] = id
      return {
        ...prevCurrentState,
        projectList: [
          ...prevCurrentState.projectList,
          project
        ] ,
        currentProjectId: id,
        selectedProject: project,
        selectedProjectTasks: [],
        currentState: "detail"
      }
    })
  }

  function handleDeleteProject() {
    setCurrentState(prevCurrentState => {
      return {
        projectList: prevCurrentState.projectList.filter(project => project.id !== prevCurrentState.currentProjectId),
        taskList: prevCurrentState.taskList.filter(task => task.projectId !== prevCurrentState.currentProjectId),
        currentState: undefined
      }
    })
  }

  return (
    <main className="h-screen my-8 flex gap-8">
        <Modal ref={modal} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
            <p className="text-stone-600 my-4">Oops ... looks like you forgot to enter a value.</p>
            <p className="text-stone-600 my-4">Please make sure you provide a valid value for every input field.</p>
        </Modal>
        <SideBar handleDetailProject={handleDetailProject} handleStartAddProject={handleStartAddProject} projects={currentState.projectList} selectedProjectId={currentState.currentProjectId}/>
        {currentState["currentState"] === "create" && <ProjectCreate ref={modal} handleAddProject={handleAddProject} handleClose={handleClose}></ProjectCreate>}
        {currentState["currentState"] === undefined && <ProjectEmpty handleStartAddProject={handleStartAddProject}></ProjectEmpty>}
        {currentState["currentState"] === "detail" && <ProjectDetail onDeleteProject={handleDeleteProject} project={currentState.selectedProject} tasks={currentState.selectedProjectTasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask}></ProjectDetail>}
    </main>
  );
}

export default App;
