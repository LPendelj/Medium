import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { LoginRequestInterface } from "../types/loginRequestInterface";


export const authActions = createActionGroup({
    source: '[Auth]',
    events: {
        Register: props<{request: RegisterRequestInterface}>(),
        'Register success': props<{currentUser: CurrentUserInterface}>(),
        'Register failure': props<{errors: BackendErrorsInterface}>(),
        
        Login: props<{request: LoginRequestInterface}>(),
        'Login success': props<{currentUser: CurrentUserInterface}>(),
        'Login failure': props<{errors: BackendErrorsInterface}>(),
                
        'Get current user': emptyProps(),
        'Get current user success': props<{currentUser: CurrentUserInterface}>(),
        'Get current user failure': emptyProps(),
    }  
}   
);
