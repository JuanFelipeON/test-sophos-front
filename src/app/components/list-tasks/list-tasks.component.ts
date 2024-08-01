import {
  Component,
  AfterViewInit,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../shared/shared-material/shared-material.module';

import { Task } from '../../interfaces/task';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css',
})
export class ListTasksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'owner',
    'date',
    'actions',
  ];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly addEditaTask = inject(MatDialog);

  user: string;

  constructor(
    private _taskService: TaskService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _userService: UserService,
  ) {
    this.dataSource = new MatTableDataSource();
    this.user = '';
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('userName') || '';
    this.getAllTaks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Tareas por pagina';
    this.dataSource.sort = this.sort;
  }

  getAllTaks() {
    this._taskService.getTasks().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditTask(id?: number): void {
    const addEditaTaskRef = this.addEditaTask.open(AddEditTaskComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });
    addEditaTaskRef.afterClosed().subscribe((result) => {
      this.getAllTaks();
    });
  }

  deleteTask(id: number) {
    this._taskService.deleteTask(id).subscribe(() => {
      this.getAllTaks();
      this.successfulDeletion();
    });
  }

  successfulDeletion() {
    this._snackBar.open('La tarea fue eliminada con exito', '', {
      duration: 2000,
    });
  }

  logout() {
    localStorage.clear();
    this._userService.logout();
    this.router.navigate(['/login']);
  }
}
