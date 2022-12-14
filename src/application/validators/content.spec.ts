import { faker } from '@faker-js/faker';
import { Content } from './content';

describe('Content', () => {
  it('should be able to create a content', async () => {
    const text = faker.lorem.sentence();
    const content = new Content(text);

    expect(content).toBeInstanceOf(Content);
    expect(content.value).toBe(text);
  });

  it('should not be able to create a content with less than 5 characters ', async () => {
    const content = faker.word.noun(4);

    expect(() => new Content(content)).toThrow(Error);
  });

  it('should not be able to create a content with more than 255 characters ', async () => {
    const content = faker.lorem.word(5).repeat(255 / 5 + 1);

    expect(() => new Content(content)).toThrow(Error);
  });
});
