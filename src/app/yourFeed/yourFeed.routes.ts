import { Route } from "@angular/router";
import { YourFeedComponent } from "./your-feed/your-feed.component";
// import { RegisterComponent } from "./components/register/register.component";

export const feedRoutes: Route[] = [
    {
        path: '',
        component: YourFeedComponent
    },
]
