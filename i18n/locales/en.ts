export const en = {
  app: {
    title: 'KanbanLite',
    version: 'v1.0 Local Storage'
  },
  board: {
    myFirstBoard: 'My First Board',
    selectBoard: 'Select Board',
    yourBoards: 'Your Boards',
    createNewBoard: 'Create New Board',
    boardTitle: 'Board Title',
    boardTitlePlaceholder: 'e.g., Marketing Campaign',
    createBoard: 'Create Board',
    editBoard: 'Edit Board',
    saveBoard: 'Save Board',
    cancel: 'Cancel',
    deleteBoardConfirm: 'Are you sure you want to delete this board? This action cannot be undone.',
    noBoardSelected: 'No board selected.'
  },
  column: {
    toDo: 'To Do',
    doing: 'Doing',
    done: 'Done',
    newList: 'New List',
    deleteList: 'Delete List',
    deleteColumnConfirm: 'Delete this column and all its cards?',
    addAnotherList: 'Add Another List'
  },
  card: {
    welcomeTitle: 'Welcome to KanbanLite!',
    welcomeDescription: 'Click me to edit details.',
    addCard: 'Add a card',
    addCardButton: 'Add Card',
    enterCardTitle: 'Enter a title for this card...',
    cardDetails: 'Card Details',
    title: 'Title',
    description: 'Description',
    descriptionPlaceholder: 'Add a more detailed description...',
    deleteCard: 'Delete Card',
    id: 'ID'
  },
  settings: {
    settings: 'Settings',
    language: 'Language',
    english: 'English',
    chinese: '中文'
  },
  common: {
    loading: 'Loading...'
  }
} as const;

export type Translation = typeof en;
