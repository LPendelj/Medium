import { Route } from "@angular/router";
import { EditArticleComponent } from "./editArticle/edit-article.component";
import * as editArticleEffects from "./store/effects";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { EditArticleService } from "./services/edit-article.service";
import { editArticleFeatureKey, editArticleReducer } from "./store/reducers";

export const routes: Route[] = [
    {
        path:'',
        component: EditArticleComponent,
        providers: [EditArticleService, provideEffects(editArticleEffects), provideState(editArticleFeatureKey, editArticleReducer)],
    }
]