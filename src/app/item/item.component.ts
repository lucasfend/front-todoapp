import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  emEdicao = false;
  erroEdicao = false;

  @Input() tarefa: Tarefa = new Tarefa('', false);
  @Output() removerTarefa = new EventEmitter<Tarefa>();
  @Output() modificaTarefa = new EventEmitter();

  onRemoverTarefa() {
    this.removerTarefa.emit(this.tarefa);
  }

  onSalvarEdicao(novoValor: string) {
    if (!novoValor || novoValor.trim() === '') {
      this.erroEdicao = true;
      return;
    }

    this.erroEdicao = false;
    this.tarefa.descricao = novoValor.trim();
    this.modificaTarefa.emit();
    this.emEdicao = false;
  }
}
