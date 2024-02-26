import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

//create an interface 
interface Store{
    activityStore: ActivityStore; //properties
    commonStore: CommonStore;
}
                 // type is Store
export const store: Store = {
    // We need to add new stores or new instances of new stores into this object(store).
    activityStore: new ActivityStore(), // this is an instance of the ActivityStore
    commonStore: new CommonStore()
}

//React Context for 
export const StoreContext = createContext(store);

//create simple react hook ,that allows us to use our store inside our components 
export function useStore(){
    //Why we use UseContext is to use out Context when we call function
    return useContext(StoreContext)
}