import {useCallback} from 'react'
import Alert from '@material-ui/lab/Alert';

export const useMessage =()=>{
    return useCallback(text=>{
        if(window.M && text){
            window.M.toast({html:text})
        }
    },[])
}