import {useState} from 'react';

import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSeleceted from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddproject() {
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: null,
      };
    } );
  }

  let content;
  if(projectsState.selectedProjectId === null) 
  {
    content = <NewProject />
  }else if(projectsState.selectedProjectId === undefined)
  {
    content = <NoProjectSeleceted onStartAddProject={handleStartAddproject} /> 
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddproject} />
      {content}
    </main>
  );
}

export default App;
