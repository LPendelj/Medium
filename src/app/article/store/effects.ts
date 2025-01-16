import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticleService } from "../../shared/services/article.service";
import { catchError, map, of, switchMap } from "rxjs";
import { articleActions } from "./actions";
import { ArticleInterface } from "../../shared/types/article.interface";


export const getArticleEffect = createEffect(
    (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
        return actions$.pipe(
            ofType(articleActions.getArticle),
            switchMap(({slug}) => {
                return articleService.getArticle(slug)
                    .pipe(map((article: ArticleInterface) =>{
                            return articleActions.getArticleSuccess({article})
                        }),
                        catchError(()=>{
                            return of(articleActions.getArticleFailure())
                        })
                    )
            })
        )
    },
    {functional: true}
)