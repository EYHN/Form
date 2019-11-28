import { createAction } from "typesafe-actions";
import { LOAD_PANEL_PAGE, LOAD_PANEL_PAGE_SUCCESS, LOAD_PANEL_PAGE_ERROR, DELETE_SAVED_FORMS } from "./constants";
import { IForm } from "@interface/Form";

export const loadPanelPage = createAction(LOAD_PANEL_PAGE, resolve => () => resolve());
export const panelPageLoaded = createAction(LOAD_PANEL_PAGE_SUCCESS, resolve => (forms: IForm[]) => resolve(forms));
export const panelPageLoadingError = createAction(LOAD_PANEL_PAGE_ERROR, resolve => (err: Error) => resolve(err));

export const deleteSavedForms = createAction(DELETE_SAVED_FORMS, resolve => (id: string) => resolve({id}));