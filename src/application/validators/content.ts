export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validationContentLength(content: string): boolean {
    return content.length > 5 && content.length <= 255;
  }

  constructor(content: string) {
    if (!this.validationContentLength(content)) {
      throw new Error('Content must be between 5 and 255 characters');
    }
    this.content = content;
  }
}
