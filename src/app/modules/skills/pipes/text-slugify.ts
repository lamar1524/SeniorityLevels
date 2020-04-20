import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slugify' })
export class TextSlugifyPipe implements PipeTransform {
  transform(text: string, exponent?: number): string {
    return text.toLowerCase().replace(' ', '-');
  }
}
