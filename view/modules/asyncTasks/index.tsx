import { EventEmitter } from "events";
import { take } from "redux-saga/effects";
import { END } from "redux-saga";

export default class AsyncTaskManager extends EventEmitter {
  count = 0;

  startTask() {
    this.count++;
    this.emit('TASK_STARTED');
  }

  endTask() {
    this.count--;
    this.emit('TASK_ENDED');
    if (this.count == 0) {
      this.emit('ALL_TASK_ENDED');
    }
  }

  wait(event: string) {
    return new Promise(resolve => {
      this.on(event, resolve);
    });
  }

  static * saga(manager: AsyncTaskManager) {
    while (true) {
      const action = yield take('*');
      console.log(action);

      if (action === END) {
        return;
      }
      
      if (action.type) {
        if (action.type.includes(':ASYNC_START')) {
          manager.startTask();
        } else if (action.type.includes(':ASYNC_SUCCESS')) {
          manager.endTask();
        } else if (action.type.includes(':ASYNC_ERROR')) {
          manager.endTask();
        }
      }
    }
  }
}