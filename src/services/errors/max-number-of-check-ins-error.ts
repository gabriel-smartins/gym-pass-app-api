export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super("You already reached max check-ins today");
  }
}
