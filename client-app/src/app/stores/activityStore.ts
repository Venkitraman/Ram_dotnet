import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../Models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid'

export default class ActivityStore {
    // title = "Hello from MobX";
    //activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    //Map is an object <key(that is activity Id, Activity Object(as value))>
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this) //This Autoobser will automatically observe the property title .

        // makeObservable(this, {
        //     title:observable,
        //     // setTitle:action.bound //This bindes the setTitle function to the class ActivityStore
        //     setTitle:action
        // })
    }

    //Computed Property to sort the activities by date
    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=> 
            Date.parse(a.date) - Date.parse(b.date));
        //till this will get all the values(activities)
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                //This line checks if there's already an array of activities for the current date in the activities object. If there is, it appends the current activity to that array using the spread operator .... If not, it creates a new array containing only the current activity.
                activities[date] = activities[date] ? [...activities[date],activity] : [activity];
                return activities;
            },{} as {[key: string]: Activity[]}) //So in each date(key) contains array of activity .
        )
    }

    //To get the whole activity  
    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list(); //getting the list of activities
                activities.forEach(activity => { //looping through it and splitting it 
                    this.setActivity(activity);
                })
                this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    //To get the activity based on Id 
    loadActivity = async (id:string) => {
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity = activity;
            return activity;
        } 
        else{
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => this.selectedActivity = activity);
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity)=>{
        activity.date = activity.date.split('T')[0];
        //this.activities.push(activity); //pushing the splitted activity to the activities Array .
        this.activityRegistry.set(activity.id,activity);
    }

     private getActivity = (id:string)=>{
        return this.activityRegistry.get(id);
     }

    // setTitle(){
    //     this.title = this.title+'!';
    // }
    //Instead of the above code if we use arrow function we can directly bound the function to class .
    // setTitle=()=>{
    //     this.title = this.title+'!';
    // }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // selectActivity = (id: string) => {
    //     //this.selectedActivity = this.activities.find(a=> a.id === id);
    //     this.selectedActivity = this.activityRegistry.get(id);//return the activity that matches the particular id
    // }

    // cancelSelectedActivity = () => {
    //     this.selectedActivity= undefined ;
    // }

    // openForm = (id?: string) => {
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }

    createActivity = async(activity : Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity)
            runInAction(()=>{
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
            
        }
    }
    updateActivity =  async(activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                //this.activities= [...this.activities.filter(a=>a.id != activity.id),activity];
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
            
        }
    }

    deleteActivity=async(id:string)=>{
        this.loading;
        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
                //this.activities= [...this.activities.filter(a=>a.id != id)];
                this.activityRegistry.delete(id); //because we have advantage of using Map<key,value>
                this.loading=false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}