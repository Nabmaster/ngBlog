import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Article } from './article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  articles: Array<Article>;
  edit: boolean;
  editArticle: Article;

  constructor() {
    this.title = 'Better ngBlog';
    this.articles = new Array();
    this.editArticle = new Article(0,'');
    this.edit = false;
    this.articles.push(new Article(99, 'Article de test', 'description test'));
  }
  addArticle() {
    this.edit = true;
  }
  backToList() {
    this.edit = false;
  }
  saveArticle(myForm: NgForm) {
    //Json serialiser et deserialiser article pour avoir une nouvelle instance objet
    this.articles.push(JSON.parse(JSON.stringify(this.editArticle)));
    myForm.resetForm();
    this.edit = false;
  }
}
