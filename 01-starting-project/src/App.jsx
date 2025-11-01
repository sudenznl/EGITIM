import { useState } from 'react';

import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSeleceted from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });


  function handleSelectProject(id){
      setProjectsState((prevState) => {
      return{
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleCancelAddProject(){
    setProjectsState((prevState) => {
      return{
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleDeleteProject (){
    setProjectsState((prevState) =>{
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId  
        ),
      };
    });
  }
 
  const selectedProjectData = projectsState.projects.find(
  (project) => project.id === projectsState.selectedProjectId
);

let content = (
  <SelectedProject project={SelectedProject} onDelete={handleDeleteProject} />
);

if (projectsState.selectedProjectId === null) 
{
  content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
} 
else if (projectsState.selectedProjectId === undefined) 
{
  content = <NoProjectSeleceted onStartAddProject={handleStartAddProject}  />;
} 
else 
{
  content = <SelectedProject project={selectedProjectData} onDelete={handleDeleteProject}/>;
}

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectsState.projects} 
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
