import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Color } from '../enums/color.enum';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnChanges {
  @Input() name!: string;
  @Input() size: number = 24;
  @Input() color: Color = Color.ACCENT_ORANGE;

  svgContent: any;

  private colorMap: Record<Color, string> = {
    [Color.MAIN_GREEN]: '#253B2D',
    [Color.SECONDARY_GREEN]: '#355541',
    [Color.ACCENT_ORANGE]: '#E98A15',
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.name) {
      this.http
        .get(`./assets/icons/${this.name}.svg`, { responseType: 'text' })
        .subscribe(data => {
          const styledSvg = data
            .replace('<svg', `<svg width="${this.size}" 
                                   height="${this.size}" 
                                   viewBox="0 0 ${this.size} ${this.size}" 
                                   stroke="${this.colorMap[this.color]}"
                                   fill="none"`);
          this.svgContent = this.sanitizer.bypassSecurityTrustHtml(styledSvg);
        });
    }
  }
}
