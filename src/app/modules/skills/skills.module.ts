import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@core/material/material.module';
import { SharedUiModule } from '@modules/reusable/shared-ui.module';
import { SkillsComponent, SkillComponent } from '@modules/skills/components';
import { SlugTextifyPipe } from '@modules/skills/pipes/slug-textify';
import { TextSlugifyPipe } from '@modules/skills/pipes/text-slugify';
import { SkillsRoutingModule } from '@modules/skills/skills-routing.module';

@NgModule({
  declarations: [SkillsComponent, SkillComponent, TextSlugifyPipe, SlugTextifyPipe],
  imports: [CommonModule, MaterialModule, SkillsRoutingModule, SharedUiModule],
})
export class SkillsModule {}
