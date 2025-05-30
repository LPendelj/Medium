import { createFeature, createReducer, on } from '@ngrx/store';
import { editArticleActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { EditArticleStateInterface } from '../types/editArticleState.interface';

const initialState: EditArticleStateInterface = {
  article: null,
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
};

export const editArticleFeature = createFeature({
  name: 'editArticle',
  reducer: createReducer(
    initialState,
    on(editArticleActions.updateArticle, (state) => ({
      ...state,
      isSubmitting: true
    })),
    on(editArticleActions.updateArticleSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      article: action.article,
    })),
    on(editArticleActions.updateArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(editArticleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(editArticleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(editArticleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectValidationErrors,
  selectArticle,
} = editArticleFeature;
