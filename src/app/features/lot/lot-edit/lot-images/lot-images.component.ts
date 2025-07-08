import { Component, signal } from '@angular/core';
import { IconComponent } from "../../../../shared/icon/icon.component";
import { Color } from '../../../../shared/enums/color.enum';
import { LotImageDto } from '../../../../models/lot/lot.model';

@Component({
  selector: 'app-lot-images',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './lot-images.component.html',
  styleUrl: './lot-images.component.scss'
})
export class LotImagesComponent {
  Color = Color;

  images = signal<LotImageDto[]>([]);
}
