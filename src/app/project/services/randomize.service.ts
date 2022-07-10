export class RandomizeService {
  static generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
      // eslint-disable-next-line no-bitwise
      const r: number = (Math.random() * 16) | 0;
      // eslint-disable-next-line no-bitwise
      const v: number = c === 'x' ? r : (r & 0x3) | 0x8;

      return v.toString(16);
    });
  }
}
