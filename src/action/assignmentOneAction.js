export const  SAVE_IMAGE="GET_ACCIDENTS";


export function saveImageAction(saveImage){
    return{
        type:SAVE_IMAGE,
        saveImage
    }
}

