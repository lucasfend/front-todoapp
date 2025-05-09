import { Component } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TODOapp';
  arrayDeTarefas: Tarefa[] = [];
  apiURL: string;
  mostrarErro = false;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://back-todoapp-j75t.onrender.com';
    this.READ_tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    if (!descricaoNovaTarefa || descricaoNovaTarefa.trim() === '') {
      this.mostrarErro = true;
      return;
    }

    this.mostrarErro = false;
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http
      .post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }

  DELETE_tarefa(tarefaASerRemovida: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaASerRemovida);
    var id = this.arrayDeTarefas[indice]._id;
    this.http
      .delete<Tarefa>(`${this.apiURL}/api/delete/${id}`)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }

  READ_tarefas() {
    this.http
      .get<Tarefa[]>(`${this.apiURL}/api/getAll`)
      .subscribe((resultado) => (this.arrayDeTarefas = resultado));
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    // Verificar se a descrição da tarefa está vazia ou apenas com espaços
    if (!tarefaAserModificada.descricao || tarefaAserModificada.descricao.trim() === '') {
      this.mostrarErro = true; // Exibir erro
      console.log("Erro: A descrição da tarefa não pode estar vazia.");
      return; // Não faz nada, a tarefa não é salva ou atualizada
    }
  
    this.mostrarErro = false; // Limpa a mensagem de erro se a descrição for válida
  
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;
  
    this.http
      .patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas(); // Recarregar as tarefas após a atualização
      });
  }
  
}
