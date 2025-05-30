import { Route } from "@angular/router";
import { ArticleComponent } from "./components/article.component";
import { provideEffects } from "@ngrx/effects";
import * as articleEffects from "./store/effects"
import { provideState } from "@ngrx/store";
import { articleFeatureKey, articleReducer } from "./store/reducers";
import { ArticleService } from "./services/article.service";

export const articleRoutes: Route[] = [
    {
        path: '',
        component: ArticleComponent,
        providers: [
            provideEffects(articleEffects),
            provideState(articleFeatureKey, articleReducer),
            ArticleService
        ]
    },
]