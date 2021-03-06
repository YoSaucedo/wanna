import undoable, { includeAction } from 'redux-undo';

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        action.task,
      ];
    case 'DO_TASK':
      if (state[action.index].repetition) {
        const task = state[action.index];
        const period = task.end - task.start;
        return [
          ...state.slice(0, action.index),
          {
            ...state[action.index],
            start: task.end + (task.repetition * 86400000),
            end: task.end + (task.repetition * 86400000) + period,
          },
          ...state.slice(action.index + 1),
        ];
      }
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          done: true,
        },
        ...state.slice(action.index + 1),
      ];
    case 'EDIT_TASK':
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          task: action.newTask.task,
        },
        ...state.slice(action.index + 1),
      ];
    case 'DELETE_TASK':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
};

export default undoable(taskReducer, {
  limit: 1,
  filter: includeAction(['DO_TASK', 'DELETE_TASK']),
});
