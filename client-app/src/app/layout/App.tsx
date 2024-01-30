import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Header, List } from 'semantic-ui-react'
import { Activity } from '../Models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import {v4 as uuid} from 'uuid';

function App() {

  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])

  function handleselectActivity(id:string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleselectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  //The three dots is to loop over the activities
  function handleCreateOrEditActivity(activity:Activity){
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id),activity])
      : setActivities([...activities,{...activity,id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=> x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm = {handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard 
        activities={activities} 
        selectedActivity = {selectedActivity}
        selectActivity = {handleselectActivity}
        cancelSelectActivity = {handleCancelSelectActivity}
        editMode = {editMode}
        openForm = {handleFormOpen}
        closeForm = {handleFormClose}
        createOrEdit = {handleCreateOrEditActivity}
        deleteActivity = {handleDeleteActivity}
        />
      </Container>

    </>
  )
}

export default App