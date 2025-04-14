export type StatusGame =
  | 'idle' // игрок бездействует
  | 'ready' // игра готова
  | 'charging' // замах/подготовка
  | 'hit' // удар нанесён
  | 'win' // победа
  | 'lose' // проигрыш
