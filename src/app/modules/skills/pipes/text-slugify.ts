import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slugify' })
export class TextSlugifyPipe implements PipeTransform {
  transform(text: string, exponent?: number): string {
    const spaceLocation = text.search(' ');
    if (spaceLocation === -1) {
      return text;
    }
    return text.toLowerCase().replace(' ', '-');
  }
}
