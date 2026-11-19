import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppMaterialModule } from '../../../pasta/app-material/app-material-module';
import { CursosService } from '../../services/cursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from '../../model/curso';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from '../../../pasta/form/form-utils.service';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [AppMaterialModule, CommonModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss',
})
export class CursoFormComponent implements OnInit {

      form!: FormGroup;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: CursosService,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    public formUtils: FormUtilsService) {
  }

  ngOnInit(): void {
    const curso: Curso = this.route.snapshot.data['curso'];

this.form = this.formBuilder.group({
  _id: [curso?._id ?? ''],
  name: [curso?.name ?? '', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)]],
  category: [curso?.category ?? '', [Validators.required]],
  lessons: this.formBuilder.array(this.retrieveLessons(curso), Validators.required)
  });
}

  private retrieveLessons(curso: Curso) {
    const lessons = [];
    if (curso?.lessons) {
      curso.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {_id: '', name: '', youtubeUrl: '' }): FormGroup {
    return this.formBuilder.group({
      id: [lesson._id],
      name: [lesson.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)]]
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLesson(){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());
  } else {
    this.formUtils.validateAllFormFields(this.form);
  }
}

  onCancel(): void {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 3000 });
  }
}
