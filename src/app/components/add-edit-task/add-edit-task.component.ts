import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { SharedMaterialModule } from '../../shared/shared-material/shared-material.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  imports: [
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class AddEditTaskComponent {
  form: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  flag: string = 'Agregar ';
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.maxDate = new Date();
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      owner: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.required],
      date: [null, Validators.required],
    });
    this.id = data.id;
  }

  ngOnInit(): void {
    this.addOrUpdate(this.id);
  }

  addOrUpdate(id: number | undefined) {
    if (id !== undefined) {
      this.flag = 'Editar ';
      this.getTask(id);
    }
  }

  getTask(id: number) {
    this._taskService.getTask(id).subscribe((data) => {
      this.form.setValue({
        name: data.name,
        owner: data.owner,
        description: data.description,
        date: new Date(data.date),
      });
    });
  }

  addEditTask() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const task: Task = {
      name: this.form.value.name,
      owner: this.form.value.owner,
      description: this.form.value.description,
      date: this.form.value.date.toISOString().slice(0, 10),
    };

    if (this.id == undefined) {
      this._taskService.addTask(task).subscribe(() => {
        this.successfulAdd();
      });
    } else {
      this._taskService.updateTask(this.id, task).subscribe(() => {
        this.successfulUpdate();
      });
    }
    this.loading = true;
  }

  successfulAdd() {
    this._snackBar.open('La tarea fue Agregada con exito', '', {
      duration: 2000,
    });
  }

  successfulUpdate() {
    this._snackBar.open('La tarea fue actualizada con exito', '', {
      duration: 2000,
    });
  }
}
