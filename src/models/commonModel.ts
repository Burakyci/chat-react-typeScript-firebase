export interface IOperationResult<T> {
  success: boolean;
  message?: string;
  data?: T | null;
}

export class OperationResult<T> implements IOperationResult<T> {
  success = false;
  message?: string;
  data?: T | null = null;

  constructor(params?: IOperationResult<T>) {
    Object.assign(this, params);
  }
}
