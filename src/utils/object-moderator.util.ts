export default class ObjectModerator {
  static removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as Partial<T>
  }

  static generateSocketRoomId(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('_')
  }
}
