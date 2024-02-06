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
    loadingInitial = true;

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
        return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date) - Date.parse(b.date));
        //till this vill get all the values(activities)
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list(); //getting the list of activities
                activities.forEach(activity => { //looping through it and splitting it 
                    activity.date = activity.date.split('T')[0];
                    //this.activities.push(activity); //pushing the splitted activity to the activities Array .
                    this.activityRegistry.set(activity.id,activity);
                })
                this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
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

    selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(a=> a.id === id);
        this.selectedActivity = this.activityRegistry.get(id);//return the activity that matches the particular id
    }

    cancelSelectedActivity = () => {
        this.selectedActivity= undefined ;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

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
                if(this.selectedActivity ?.id === id) this.cancelSelectedActivity();
                this.loading=false;
            })
        } catch (error) {
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}