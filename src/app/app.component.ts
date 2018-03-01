import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Article } from './article';
import { ArticleService } from './article.service';

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

  constructor(private articleService: ArticleService) {
    this.title = 'Better ngBlog';
    this.articles = new Array();
    this.editArticle = new Article(0,'');
    this.edit = false;
    this.articles.push(new Article(99, 'Article de test', 'description test', 'nab'));
  }
  ngOnInit(){
    this.articleService.list().subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (response) => {
        console.log('impossible de recuperer les articles dans le fichier json', response);
      }
    });
  }
  addArticle() {
    this.edit = true;
  }
  backToList() {
    this.edit = false;
  }
  saveArticle(myForm: NgForm) {
    //Json serialiser et deserialiser article pour avoir une nouvelle instance objet
    if(this.editArticle.id){
    this.articleService.update(this.editArticle).subscribe((article) => {
      //remplacer l'article a jour dans la liste
      let index = this.articles.findInde(
      (value: Article) =>value.id === aricle.id
    );
    this.articles.splice(index, 1, article);
    });
  }else {
    this.articleService.create(this.editArticle).subscribe((article) => this.articles.push(article));
  }
    this.articles.push(JSON.parse(JSON.stringify(this.editArticle)));
    myForm.resetForm();    
    this.edit = false;
  }
  deleteArticle(id: number, index: number){
    this.articles.splice(index, 1);
  }
  modifyArticle(id: number, index: number){
    this.editArticle = this.articles[index];
    //basculer l'affichage vers le formulair.
    this.addArticle();
  }
}
