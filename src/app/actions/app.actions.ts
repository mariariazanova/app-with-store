export class GetUsers {
  static readonly type = '[Users] Fetch';
}

export class AddData {
  static readonly type = '[Data] Add';
  constructor(public payload: any) { }
}

export class AddDataFromFormDialog {
  static readonly type = '[Data] Add From Form';
  constructor(public payload: any) { }
}

export class EditData {
  static readonly type = '[Data] Edit';
  constructor(public payload: any) { } //, public id: number, public i: number) { }
}

export class EditCodeData {
  static readonly type = '[Data] Edit';
  constructor(public payload: any) { } //, public id: number, public i: number) { }
}

export class DeleteData {
  static readonly type = '[Data] Delete';
  constructor(public index: string) { }
}
