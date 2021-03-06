import React from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

type ModalState = {
  loginOpen: boolean;
  registerOpen: boolean;
  newBudgetOpen: boolean;
  newRecordOpen: boolean;
  editBudgetOpen: boolean;
  editRecordOpen: boolean;
  editUserOpen: boolean;
};

const baseModalState: ModalState = {
  loginOpen: false,
  registerOpen: false,
  newBudgetOpen: false,
  newRecordOpen: false,
  editBudgetOpen: false,
  editRecordOpen: false,
  editUserOpen: false,
};

export enum ActionType {
  CLOSE_ALL,
  SHOW_LOGIN,
  SHOW_REGISTER,
  SHOW_NEW_BUDGET,
  SHOW_NEW_RECORD,
  SHOW_EDIT_BUDGET,
  SHOW_EDIT_RECORD,
  SHOW_EDIT_USER,
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
    case ActionType.SHOW_LOGIN:
      return { ...baseModalState, loginOpen: true};
    case ActionType.SHOW_REGISTER:
      return { ...baseModalState, registerOpen: true};
    case ActionType.SHOW_NEW_BUDGET:
      return { ...baseModalState, newBudgetOpen: true };
    case ActionType.SHOW_NEW_RECORD:
      return { ...baseModalState, newRecordOpen: true };
    case ActionType.SHOW_EDIT_BUDGET:
      return { ...baseModalState, editBudgetOpen: true };
    case ActionType.SHOW_EDIT_RECORD:
      return { ...baseModalState, editRecordOpen: true };
    case ActionType.SHOW_EDIT_USER:
      return { ...baseModalState, editUserOpen: true };
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