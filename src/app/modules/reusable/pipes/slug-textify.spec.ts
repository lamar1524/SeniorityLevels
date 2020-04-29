import { SlugTextifyPipe } from './slug-textify';

describe('SlugTextifyPipe', () => {
  let pipe: SlugTextifyPipe;

  beforeEach(() => {
    pipe = new SlugTextifyPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform properly', () => {
    const mockedSlug = 'general-programming';
    const mockedText = 'General Programming';
    expect(pipe.transform(mockedSlug)).toEqual(mockedText);
  });
});
