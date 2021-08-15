import {SAVE_IMAGE
} from "../action/assignmentOneAction";

const initialImages ={
    saveImage:{},
    
}

export function saveImageReducer(state=initialImages,action){
    switch (action.type) {
        case SAVE_IMAGE:
            return{...state, saveImage: action.saveImage}
       
        default:
            return {...state}
    }

}