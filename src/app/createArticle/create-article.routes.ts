import { Route } from "@angular/router";
import { CreateArticleComponent } from "./create-article/create-article.component";

export const routes: Route[] = [
    {
        path:'',
        component: CreateArticleComponent
    }
]