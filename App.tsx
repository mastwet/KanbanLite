import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Plus, 
  Trash2, 
  X, 
  Layout, 
  MoreHorizontal, 
  ChevronDown, 
  Edit2, 
  Menu,
  Check,
  LayoutDashboard
} from 'lucide-react';
import { Board, Column, Card } from './types';
import { useI18n } from './i18n';
import { LanguageSelector } from './components/LanguageSelector';

// --- Utility Functions ---

const generateId = () => Math.random().toString(36).substring(2, 9);

const createInitialBoard = (t: any): Board => ({
  id: 'default-board',
  title: t.board.myFirstBoard,
  createdAt: Date.now(),
  columns: [
    { id: 'col-1', title: t.column.toDo, cardIds: ['card-1'] },
    { id: 'col-2', title: t.column.doing, cardIds: [] },
    { id: 'col-3', title: t.column.done, cardIds: [] },
  ],
  cards: {
    'card-1': { id: 'card-1', title: t.card.welcomeTitle, description: t.card.welcomeDescription, createdAt: Date.now() },
  },
});

// --- Icons & UI Components ---

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }> = ({ 
  className = '', 
  variant = 'primary', 
  children, 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400 shadow-sm",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
    ghost: "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 focus:ring-slate-400",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title?: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const CardItem: React.FC<{ 
  card: Card; 
  onClick: () => void; 
  onDragStart: (e: React.DragEvent) => void 
}> = ({ card, onClick, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="group relative bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all active:scale-95"
    >
      <h4 className="text-sm font-medium text-slate-800 leading-snug mb-1">{card.title}</h4>
      {card.description && (
         <div className="flex items-center text-xs text-slate-400 mt-2">
           <div className="i-lucide-align-left w-3 h-3 mr-1" /> 
           <span className="truncate max-w-[150px]">{card.description}</span>
         </div>
      )}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2 size={12} className="text-slate-400" />
      </div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const { t } = useI18n();
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Modals state
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [editBoardTitle, setEditBoardTitle] = useState("");

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('kanban-lite-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBoards(parsed.boards || []);
        setActiveBoardId(parsed.activeBoardId || null);
      } catch (e) {
        console.error("Failed to load data", e);
        const defaultBoard = createInitialBoard(t);
        setBoards([defaultBoard]);
        setActiveBoardId(defaultBoard.id);
      }
    } else {
      const defaultBoard = createInitialBoard(t);
      setBoards([defaultBoard]);
      setActiveBoardId(defaultBoard.id);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kanban-lite-data', JSON.stringify({ boards, activeBoardId }));
    }
  }, [boards, activeBoardId, isLoaded]);

  // Derived state
  const activeBoard = boards.find(b => b.id === activeBoardId);

  // --- Actions ---

  const createBoard = () => {
    if (!newBoardTitle.trim()) return;
    const newBoard: Board = {
      id: generateId(),
      title: newBoardTitle,
      createdAt: Date.now(),
      columns: [
        { id: generateId(), title: t.column.toDo, cardIds: [] },
        { id: generateId(), title: t.column.doing, cardIds: [] },
        { id: generateId(), title: t.column.done, cardIds: [] },
      ],
      cards: {},
    };
    setBoards(prev => [...prev, newBoard]);
    setActiveBoardId(newBoard.id);
    setNewBoardTitle("");
    setIsCreateBoardModalOpen(false);
  };

  const deleteBoard = (boardId: string) => {
    if (confirm(t.board.deleteBoardConfirm)) {
      const newBoards = boards.filter(b => b.id !== boardId);
      setBoards(newBoards);
      if (activeBoardId === boardId) {
        setActiveBoardId(newBoards.length > 0 ? newBoards[0].id : null);
      }
    }
  };

  const renameBoard = (boardId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setBoards(boards.map(b => b.id === boardId ? { ...b, title: newTitle } : b));
  };

  const openEditBoardModal = (boardId: string) => {
    const board = boards.find(b => b.id === boardId);
    if (board) {
      setEditingBoardId(boardId);
      setEditBoardTitle(board.title);
      setIsEditBoardModalOpen(true);
      setIsBoardMenuOpen(false);
    }
  };

  const addColumn = () => {
    if (!activeBoard) return;
    const newCol: Column = { id: generateId(), title: t.column.newList, cardIds: [] };
    const updatedBoard = { ...activeBoard, columns: [...activeBoard.columns, newCol] };
    updateBoardState(updatedBoard);
  };

  const deleteColumn = (columnId: string) => {
    if (!activeBoard) return;
    if (!confirm(t.column.deleteColumnConfirm)) return;
    
    // Remove cards that are in this column from the normalized store to keep it clean
    const column = activeBoard.columns.find(c => c.id === columnId);
    const newCards = { ...activeBoard.cards };
    column?.cardIds.forEach(id => delete newCards[id]);

    const updatedBoard = {
      ...activeBoard,
      cards: newCards,
      columns: activeBoard.columns.filter(c => c.id !== columnId)
    };
    updateBoardState(updatedBoard);
  };

  const renameColumn = (columnId: string, newTitle: string) => {
    if (!activeBoard) return;
    const updatedBoard = {
      ...activeBoard,
      columns: activeBoard.columns.map(c => c.id === columnId ? { ...c, title: newTitle } : c)
    };
    updateBoardState(updatedBoard);
  };

  const addCard = (columnId: string, title: string) => {
    if (!activeBoard || !title.trim()) return;
    const newCard: Card = {
      id: generateId(),
      title,
      description: '',
      createdAt: Date.now()
    };
    const updatedBoard = {
      ...activeBoard,
      cards: { ...activeBoard.cards, [newCard.id]: newCard },
      columns: activeBoard.columns.map(c => 
        c.id === columnId ? { ...c, cardIds: [...c.cardIds, newCard.id] } : c
      )
    };
    updateBoardState(updatedBoard);
  };

  const deleteCard = (cardId: string) => {
    if (!activeBoard) return;
    
    // Find which column has the card
    const newColumns = activeBoard.columns.map(c => ({
      ...c,
      cardIds: c.cardIds.filter(id => id !== cardId)
    }));

    const newCards = { ...activeBoard.cards };
    delete newCards[cardId];

    updateBoardState({
      ...activeBoard,
      columns: newColumns,
      cards: newCards
    });
    setEditingCardId(null);
  };

  const updateCardDetails = (cardId: string, updates: Partial<Card>) => {
    if (!activeBoard) return;
    const updatedBoard = {
      ...activeBoard,
      cards: {
        ...activeBoard.cards,
        [cardId]: { ...activeBoard.cards[cardId], ...updates }
      }
    };
    updateBoardState(updatedBoard);
  };

  const updateBoardState = (updatedBoard: Board) => {
    setBoards(boards.map(b => b.id === updatedBoard.id ? updatedBoard : b));
  };

  // --- Drag and Drop Logic (HTML5 Native) ---

  const handleDragStart = (e: React.DragEvent, cardId: string, sourceColId: string) => {
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('sourceColId', sourceColId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const sourceColId = e.dataTransfer.getData('sourceColId');

    if (!activeBoard || !cardId || !sourceColId) return;

    if (sourceColId === targetColId) {
      // Reordering within same column could go here, but for simplicity we'll just append to end if same col 
      // or implement detailed reordering index later. For now, simple move between columns.
      return; 
    }

    // Remove from source
    const sourceCol = activeBoard.columns.find(c => c.id === sourceColId);
    const targetCol = activeBoard.columns.find(c => c.id === targetColId);
    
    if (!sourceCol || !targetCol) return;

    const newSourceCol = {
      ...sourceCol,
      cardIds: sourceCol.cardIds.filter(id => id !== cardId)
    };

    const newTargetCol = {
      ...targetCol,
      cardIds: [...targetCol.cardIds, cardId]
    };

    const updatedBoard = {
      ...activeBoard,
      columns: activeBoard.columns.map(c => {
        if (c.id === sourceColId) return newSourceCol;
        if (c.id === targetColId) return newTargetCol;
        return c;
      })
    };

    updateBoardState(updatedBoard);
  };


  if (!isLoaded) return <div className="flex items-center justify-center h-screen bg-slate-50 text-slate-400">{t.common.loading}</div>;

  return (
    <div className="flex flex-col h-screen bg-[#F0F2F5] text-slate-800 font-sans">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-10 shadow-sm flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-blue-600 font-bold text-xl tracking-tight">
            <LayoutDashboard className="mr-2" size={24} />
            <span>{t.app.title}</span>
          </div>
          
          <div className="h-6 w-px bg-slate-300 mx-2 hidden md:block"></div>

          <div className="relative group">
            <button 
              onClick={() => setIsBoardMenuOpen(!isBoardMenuOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
            >
              <span>{activeBoard?.title || t.board.selectBoard}</span>
              <ChevronDown size={16} className={`transition-transform ${isBoardMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isBoardMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10 cursor-default" 
                  onClick={() => setIsBoardMenuOpen(false)}
                />
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-20 py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.board.yourBoards}</div>
                  {boards.map(board => (
                    <div 
                      key={board.id} 
                      className="flex items-center justify-between px-4 py-2 hover:bg-slate-50 cursor-pointer group/item"
                      onClick={() => {
                        setActiveBoardId(board.id);
                        setIsBoardMenuOpen(false);
                      }}
                    >
                      <span className={`text-sm ${activeBoardId === board.id ? 'text-blue-600 font-medium' : 'text-slate-700'}`}>
                        {board.title}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); openEditBoardModal(board.id); }}
                          className="text-slate-400 hover:text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                        >
                          <Edit2 size={14} />
                        </button>
                        {boards.length > 1 && (
                           <button 
                             onClick={(e) => { e.stopPropagation(); deleteBoard(board.id); }}
                             className="text-slate-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                           >
                             <Trash2 size={14} />
                           </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-slate-100 my-1"></div>
                  <button 
                    onClick={() => { setIsCreateBoardModalOpen(true); setIsBoardMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    {t.board.createNewBoard}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
            <LanguageSelector />
            {/* <span className="text-xs text-slate-400 hidden sm:inline-block">{t.app.version}</span> */}
        </div>
      </header>

      {/* Main Board Area */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden w-full">
        {activeBoard ? (
          <div className="h-full p-4 md:p-6 flex items-start space-x-4 min-w-fit">
            
            {/* Columns */}
            {activeBoard.columns.map(column => (
              <div 
                key={column.id} 
                className="w-72 md:w-80 flex-shrink-0 flex flex-col max-h-full bg-slate-100 rounded-xl border border-slate-200 shadow-sm"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="p-3 px-4 flex items-center justify-between group cursor-grab active:cursor-grabbing border-b border-slate-200/50">
                  <input 
                    type="text"
                    className="bg-transparent font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-400 rounded px-1.5 py-0.5 -ml-1.5 text-sm w-full mr-2 truncate"
                    value={column.title}
                    onChange={(e) => renameColumn(column.id, e.target.value)}
                  />
                  <div className="relative">
                    <button 
                      onClick={() => deleteColumn(column.id)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded opacity-0 group-hover:opacity-100 transition-all"
                      title={t.column.deleteList}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Cards List */}
                <div className="flex-1 overflow-y-auto custom-scroll p-2 space-y-2.5 min-h-[50px]">
                  {column.cardIds.map(cardId => {
                    const card = activeBoard.cards[cardId];
                    if (!card) return null;
                    return (
                      <CardItem 
                        key={card.id} 
                        card={card} 
                        onClick={() => setEditingCardId(card.id)}
                        onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                      />
                    );
                  })}
                </div>

                {/* Add Card Footer */}
                <div className="p-3 pt-1">
                   <InlineAddCard onAdd={(title) => addCard(column.id, title)} />
                </div>
              </div>
            ))}

            {/* Add Column Button */}
            <div className="w-72 md:w-80 flex-shrink-0">
              <button 
                onClick={addColumn}
                className="w-full flex items-center justify-center space-x-2 py-4 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all group font-medium"
              >
                <Plus size={20} className="group-hover:scale-110 transition-transform" />
                <span>{t.column.addAnotherList}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Layout size={64} className="mb-4 text-slate-200" />
            <p className="text-lg">{t.board.noBoardSelected}</p>
            <Button onClick={() => setIsCreateBoardModalOpen(true)} className="mt-4">{t.board.createBoard}</Button>
          </div>
        )}
      </main>

      {/* --- Modals --- */}

      {/* Create Board Modal */}
      <Modal 
        isOpen={isCreateBoardModalOpen} 
        onClose={() => setIsCreateBoardModalOpen(false)}
        title={t.board.createNewBoard}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.board.boardTitle}</label>
            <input 
              autoFocus
              type="text" 
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={t.board.boardTitlePlaceholder}
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createBoard()}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setIsCreateBoardModalOpen(false)}>{t.board.cancel}</Button>
            <Button onClick={createBoard} disabled={!newBoardTitle.trim()}>{t.board.createBoard}</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Board Modal */}
      <Modal 
        isOpen={isEditBoardModalOpen} 
        onClose={() => setIsEditBoardModalOpen(false)}
        title={t.board.editBoard}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.board.boardTitle}</label>
            <input 
              autoFocus
              type="text" 
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={t.board.boardTitlePlaceholder}
              value={editBoardTitle}
              onChange={(e) => setEditBoardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && editingBoardId && editBoardTitle.trim()) {
                  renameBoard(editingBoardId, editBoardTitle);
                  setIsEditBoardModalOpen(false);
                }
              }}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setIsEditBoardModalOpen(false)}>{t.board.cancel}</Button>
            <Button onClick={() => {
              if (editingBoardId && editBoardTitle.trim()) {
                renameBoard(editingBoardId, editBoardTitle);
                setIsEditBoardModalOpen(false);
              }
            }} disabled={!editBoardTitle.trim()}>{t.board.saveBoard}</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Card Modal */}
      {editingCardId && activeBoard && activeBoard.cards[editingCardId] && (
        <Modal 
          isOpen={true} 
          onClose={() => setEditingCardId(null)}
          title={t.card.cardDetails}
        >
          <div className="space-y-6">
            
            {/* Title Edit */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.card.title}</label>
              <input 
                type="text" 
                className="w-full text-lg font-bold text-slate-800 border-b-2 border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none bg-transparent transition-colors py-1"
                value={activeBoard.cards[editingCardId].title}
                onChange={(e) => updateCardDetails(editingCardId, { title: e.target.value })}
              />
            </div>

            {/* Description Edit */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.card.description}</label>
              <textarea 
                className="w-full min-h-[120px] bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all resize-y"
                placeholder={t.card.descriptionPlaceholder}
                value={activeBoard.cards[editingCardId].description}
                onChange={(e) => updateCardDetails(editingCardId, { description: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
               <div className="text-xs text-slate-400">
                  {t.card.id}: {editingCardId}
               </div>
               <Button variant="danger" onClick={() => deleteCard(editingCardId)}>
                 <Trash2 size={16} className="mr-2" />
                 {t.card.deleteCard}
               </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Helper Component for adding cards inline
const InlineAddCard: React.FC<{ onAdd: (title: string) => void }> = ({ onAdd }) => {
  const { t } = useI18n();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title);
      setTitle("");
      // Keep input open for rapid entry
      inputRef.current?.focus();
    } else {
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
    }
  };

  if (isAdding) {
    return (
      <div className="bg-white p-2 rounded-lg shadow ring-2 ring-blue-500 animate-in fade-in duration-150">
        <textarea
          ref={inputRef}
          className="w-full resize-none text-sm text-slate-800 placeholder-slate-400 outline-none block mb-2"
          placeholder={t.card.enterCardTitle}
          rows={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
             // Optional: close on blur if empty. 
             // If not empty, we might want to save? Let's keep it manual save via button or Enter for safety.
             if(!title.trim()) setIsAdding(false);
          }}
        />
        <div className="flex items-center justify-between">
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            {t.card.addCardButton}
          </button>
          <button 
            onClick={() => setIsAdding(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setIsAdding(true)}
      className="flex items-center text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 w-full px-2 py-1.5 rounded text-sm transition-colors font-medium text-left"
    >
      <Plus size={16} className="mr-2" />
      {t.card.addCard}
    </button>
  );
};