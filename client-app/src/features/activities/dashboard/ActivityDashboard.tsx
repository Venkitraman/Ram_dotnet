import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore(); //The useStore returns StoreContext ,Our Store Context contains an object with ActivityStore inside;
    const {loadActivities,activityRegistry} = activityStore;
    
    useEffect(() => {
      if(activityRegistry.size <= 1)loadActivities();
    }, [loadActivities,activityRegistry.size])
  
    //The three dots is to loop over the activities
    
    if(activityStore.loadingInitial) return <LoadingComponent content='Loading app...' />
    return (

        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                 <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
})