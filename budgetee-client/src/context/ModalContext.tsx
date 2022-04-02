import React from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

type ModalState = {
  newBudgetOpen: boolean;
  newRecordOpen: boolean;
  editBudgetOpen: boolean;
  editRecordOpen: boolean;
};

const baseModalState: ModalState = {
  newBudgetOpen: false,
  newRecordOpen: false,
  editBudgetOpen: false,
  editRecordOpen: false,
};

export enum ActionType {
  CLOSE_ALL,
  SHOW_NEW_BUDGET,
  SHOW_NEW_RECORD,
  SHOW_EDIT_BUDGET,
  SHOW_EDIT_RECORD,
};

type ContextValue = {
  modalState: ModalState;
  dispatch: React.Dispatch<ActionType>;
};

const ModalContext = React.createContext<ContextValue>({} as ContextValue);

const modalReducer = (state: ModalState, action: ActionType): ModalState => {
  switch (action) {
    case ActionType.CLOSE_ALL:
      return { ...baseModalState };
    case ActionType.SHOW_NEW_BUDGET:
      return { ...baseModalState, newBudgetOpen: true };
    case ActionType.SHOW_NEW_RECORD:
      return { ...baseModalState, newRecordOpen: true };
    case ActionType.SHOW_EDIT_BUDGET:
      return { ...baseModalState, editBudgetOpen: true };
    case ActionType.SHOW_EDIT_RECORD:
      return { ...baseModalState, editRecordOpen: true };
    default:
      return state;
  }
};

export const ModalProvider = ({ children }: ProviderProps) => {
  const [modalState, dispatch] = React.useReducer(modalReducer, baseModalState);
  const value = { modalState, dispatch };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
};