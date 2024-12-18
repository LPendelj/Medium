import { Route } from "@angular/router";
import { GlobalFeedComponent } from "./global-feed/global-feed.component";
// import { RegisterComponent } from "./components/register/register.component";

export const feedRoutes: Route[] = [
    {
        path: '',
        component: GlobalFeedComponent
    },
]
