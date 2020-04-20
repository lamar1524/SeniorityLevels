import { TextSlugifyPipe } from './text-slugify';

describe('TextSlugifyPipe', () => {
  let pipe: TextSlugifyPipe;

  beforeEach(() => {
    pipe = new TextSlugifyPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform properly', () => {
    const mockedText = 'General Programming';
    const mockedSlug = 'general-programming';
    expect(pipe.transform(mockedText)).toEqual(mockedSlug);
  });
});
