import { action } from "typesafe-actions";
import { LOAD_PANEL_PAGE, LOAD_PANEL_PAGE_SUCCESS, LOAD_PANEL_PAGE_ERROR, DELETE_SAVED_FORMS } from "./constants";
import { IForm } from "@interface/Form";

export const loadPanelPage = () => action(LOAD_PANEL_PAGE);
export const panelPageLoaded = (forms: IForm[]) => action(LOAD_PANEL_PAGE_SUCCESS, forms);
export const panelPageLoadingError = (err: Error) => action(LOAD_PANEL_PAGE_ERROR, err);

export const deleteSavedForms = (id: string) => action(DELETE_SAVED_FORMS, {id});