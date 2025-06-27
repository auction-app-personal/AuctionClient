import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Color } from '../enums/color.enum';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnInit{
  @Input() name!: string;
  @Input() size: number = 24;
  @Input() color: Color = Color.ACCENT_ORANGE;
  @Input() hoverColor:Color = Color.ACCENT_ORANGE;

  rawSvg: string = '';
  svgContent: any;
  hovered = false;

  get effectiveColor(): Color {
    return this.hovered ? this.hoverColor : this.color;
  }

  private colorMap: Record<Color, string> = {
    [Color.MAIN_GREEN]: '#253B2D',
    [Color.SECONDARY_GREEN]: '#355541',
    [Color.ACCENT_ORANGE]: '#E98A15',
    [Color.TEXT_WHITE]: '#E9F1F7',
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if(this.hovered) return;
    this.hovered = true;
    this.renderSvg();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if(!this.hovered) return;
    this.hovered = false;
    this.renderSvg();
  }

  ngOnInit(): void {
    this.loadSvg();
  }

  private loadSvg(): void {
  this.http
    .get(`assets/icons/${this.name}.svg`, { responseType: 'text' })
    .subscribe(data => {
      this.rawSvg = data;
      this.renderSvg();
    });
}

  private renderSvg(): void{
    console.log(2)
      const styledSvg = this.rawSvg
        .replace('<svg', `<svg width="${this.size}" 
                                height="${this.size}" 
                                viewBox="0 0 ${this.size} ${this.size}" 
                                stroke="${this.colorMap[this.effectiveColor]}"
                                fill="none"`);
      this.svgContent = this.sanitizer.bypassSecurityTrustHtml(styledSvg);
  }
}
