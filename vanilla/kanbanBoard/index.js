(function () {
  const board = document.getElementById('board');
  const addColumnBtn = document.getElementById('add-column-btn');
  const columnModal = document.getElementById('column-form-modal');
  const cardModal = document.getElementById('card-form-modal');
  const columnNameInput = document.getElementById('column-name');
  const cardNameInput = document.getElementById('card-name');
  const cardDescriptionInput = document.getElementById('card-description');

  const MODAL_ID = {
    COLUMN: 'column-form-modal',
    CARD: 'card-form-modal',
  };

  let currentColumnId = '';

  const generateId = () => {
    return Date.now();
  };

  const handleModalOpen = (id) => {
    const modal = id === MODAL_ID.CARD ? cardModal : columnModal;
    modal.classList.add('modal-open');
  };

  const handleModalClose = (id) => {
    const modal = id === MODAL_ID.CARD ? cardModal : columnModal;
    modal.classList.remove('modal-open');
  };

  const handleModalCloseClick = (event, id) => {
    if (event.target.classList.contains('modal-close-btn')) {
      handleModalClose(id);
    }
  };

  const handleModalSaveClick = (event, id) => {
    if (event.target.classList.contains('modal-save-btn')) {
      const elementAdditionHandler = id === MODAL_ID.CARD ? handleAddCard : handleAddColumn;
      elementAdditionHandler();
    }
  };

  const modalClickHandler = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    handleModalCloseClick(event, id);
    handleModalSaveClick(event, id);
  };

  const createElement = (elementType = 'div', classes = []) => {
    const element = document.createElement(elementType);
    element.classList.add(...classes);
    return element;
  };

  const handleAddColumn = () => {
    const value = columnNameInput?.value ?? '';
    if (!value) {
      handleModalClose(MODAL_ID.COLUMN);
      return;
    }

    const fragment = document.createDocumentFragment();
    const title = createElement('h3', ['column-title']);
    const column = createElement('div', ['column']);
    const cards = createElement('div', ['cards']);
    const addCardBtn = createElement('button', ['add-card-btn']);

    column.dataset.id = `column-${generateId()}`;
    title.textContent = value;
    addCardBtn.textContent = 'Add Card';

    fragment.appendChild(title);
    fragment.appendChild(cards);
    fragment.appendChild(addCardBtn);

    column.appendChild(fragment);
    board.appendChild(column);
    columnNameInput.value = '';
    handleModalClose(MODAL_ID.COLUMN);
  };

  const handleAddCard = () => {
    const cardTitle = cardNameInput?.value ?? '';
    const cardDescription = cardDescriptionInput?.value ?? '';
    if (!cardTitle || !cardDescription) {
      handleModalClose(MODAL_ID.CARD);
      return;
    }

    const fragment = document.createDocumentFragment();
    const title = createElement('h4');
    const description = createElement('p');
    const card = createElement('div', ['card']);

    card.dataset.id = `card-${generateId()}`;
    card.dataset.columnId = currentColumnId;
    title.textContent = cardTitle;
    description.textContent = cardDescription;

    fragment.appendChild(title);
    fragment.appendChild(description);

    card.appendChild(fragment);
    const cards = document.querySelector(`[data-id=${currentColumnId}] .cards`);
    cards.appendChild(card);
    cardNameInput.value = '';
    cardDescriptionInput.value = '';
    handleModalClose(MODAL_ID.CARD);
  };

  const addCardClickHandler = (event) => {
    const btn = event.target;
    if (btn.classList.contains('add-card-btn')) {
      const column = btn.closest('.column');
      currentColumnId = column.dataset.id;
      handleModalOpen(MODAL_ID.CARD);
    }
  };

  addColumnBtn.addEventListener('click', () => handleModalOpen(MODAL_ID.COLUMN));
  columnModal.addEventListener('click', (event) => {
    modalClickHandler(event, MODAL_ID.COLUMN);
  });
  cardModal.addEventListener('click', (event) => {
    modalClickHandler(event, MODAL_ID.CARD);
  });
  board.addEventListener('click', addCardClickHandler);
})()