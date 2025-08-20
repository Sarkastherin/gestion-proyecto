export class ProjectCreationError extends Error {
  step: string;

  constructor(step: string, message: string) {
    super(message);
    this.name = "ProjectCreationError";
    this.step = step;
  }
}