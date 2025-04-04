import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EditArticleService } from "../services/edit-article.service";
import { editArticleActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ArticleInterface } from "../../shared/types/article.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { SharedArticleService } from "../../shared/services/article.service";

export const getArticleEffect = createEffect(
    (actions$ = inject(Actions), articleService = inject(SharedArticleService)) => {
        return actions$.pipe(
            ofType(editArticleActions.getArticle),
            switchMap(({slug}) => {
                return articleService.getArticle(slug)
                    .pipe(map((article: ArticleInterface) =>{
                            return editArticleActions.getArticleSuccess({article})
                        }),
                        catchError(()=>{
                            return of(editArticleActions.getArticleFailure())
                        })
                    )
            })
        )
    },
    {functional: true}
)


export const updateArticleEffect = createEffect(
    (actions$ = inject(Actions), editArticleService = inject(EditArticleService)) => {
        return actions$.pipe(
            ofType(editArticleActions.updateArticle),
            switchMap(({slug, request}) => {
                return editArticleService.updateArticle(slug, request)
                    .pipe(
                        map((article: ArticleInterface) =>{
                            return editArticleActions.updateArticleSuccess({article})
                        },
                        catchError((errorResponse: HttpErrorResponse)=>{
                            return of(editArticleActions.updateArticleFailure({errors: errorResponse.error.errors}))
                        })
                    )
                )
            })
        )
    },
    {functional: true}
)



export const redirectAfterEditEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(editArticleActions.updateArticleSuccess),
            tap(({article}) => {
                return router.navigate(['/articles', article.slug]);
            })
        );
    },
    {functional: true, dispatch: false}
)