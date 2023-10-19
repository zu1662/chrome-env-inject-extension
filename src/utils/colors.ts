const colors = ['#3488ff', '#43B883', '#e6a23c', '#f56c6c', '#748DA6', '#8EA1F0'];

export function randomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
