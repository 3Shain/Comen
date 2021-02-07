import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { ComenAddonConfiguration, ConfigurationSection } from '@comen/common';

@Component({
  selector: 'comen-element-tree',
  templateUrl: './element-tree.component.html',
  styleUrls: ['./element-tree.component.scss']
})
export class ElementTreeComponent {

  @Input() config: ComenAddonConfiguration;

  @Input() selected: string;

  lastHover = '';

  @Output() sectionHover: EventEmitter<string> = new EventEmitter();

  @Output() leave: EventEmitter<void> = new EventEmitter();

  @Output() sectionClick: EventEmitter<string> = new EventEmitter();

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: MouseEvent) {
    this.leave.emit();
    this.lastHover = '';
  }

  onNodeHover(node: ConfigurationSection) {
    if (node.previewSelector != this.lastHover) {
      this.sectionHover.emit(node.previewSelector);
      this.lastHover = node.previewSelector;
    }
  }

  sortNull() { }
}
