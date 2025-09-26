/**
 * Create a memory grid of n x n size
 * Clicking on any grid cell makes the cell active and changes its color
 * Clicking on any active grid cell makes it inactive and resets the color
 * Once all the cells have been clicked and are active, reset their colors in the order
 * such that the cell which was clicked, is reset first
 */

(function (gridSide) {
  const grid = document.getElementById('grid');

  const stack = [];
  const gridSize = gridSide * gridSide;
  let disableClick = false;

  const createGrid = (side, size) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.id = i.toString();
      fragment.appendChild(cell);
    }
    grid.appendChild(fragment);
    grid.style.gridTemplateColumns = `repeat(${side}, 1fr)`;
  };

  const getCellNode = (id) => {
    return document.querySelector(`[data-id="${id}"]`);
  };

  const resetCells = () => {
    const intervalId = setInterval(() => {
      const top = stack.pop();
      const cellNode = getCellNode(top);
      cellNode.classList.remove('cell-active');
      if (!stack.length) {
        disableClick = false;
        clearInterval(intervalId);
      }
    }, 1000);
  };

  const handleCellClickHandler = (cell) => {
    const { id } = cell.dataset;
    const cellIndex = stack.findIndex((cellId) => cellId === id);
    const cellNode = getCellNode(id);
    if (cellIndex >= 0) {
      stack.splice(cellIndex, 1);
      cellNode.classList.remove('cell-active');
    } else {
      stack.push(id);
      cellNode.classList.add('cell-active');

      if (stack.length === gridSize) {
        disableClick = true;
        resetCells();
      }
    }
  };

  createGrid(gridSide, gridSize);

  grid.addEventListener('click', (event) => {
    const node = event.target;
    if (node.classList.contains('cell') && !disableClick) {
      handleCellClickHandler(node);
    }
  });
})(3)