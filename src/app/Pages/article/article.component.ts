import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Keyword } from 'src/app/model/Keyword';
import { ContentService } from 'src/app/services/content.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddKeywordComponent } from '../add-keyword/add-keyword.component';
import { MatRadioChange } from '@angular/material/radio';
import { Article } from 'src/app/model/Article';
import { Router } from '@angular/router';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  showArticles = false;
  content = '';
  min!: string;
  selectedArticle!: number;
  formArticle!: FormGroup;
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  objetoCtrl = new FormControl();
  filteredKeyword: Observable<string[]>;
  keywordsCons: Keyword[] = [];
  keywordSel: number[] = [];
  keywords: string[] = [];
  allKeyword: string[] = [];
  articles!: Article[];
  articlesAll!: Article[];
  @ViewChild('objetoInput')
  objetoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;
  articleReg: Article = new Article;
  articleS = new FormControl();
  url: string = "";
  formResource!: FormGroup;
  file: any;
  constructor(private router: Router, private serviceKey: ContentService, private formBuilder: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.loadKeyword();
    this.filteredKeyword = this.objetoCtrl.valueChanges.pipe(
      startWith(null),
      map((objeto: string | null) => objeto ? this._filter(objeto) : this.allKeyword.slice()));
  }


  ngOnInit(): void {
    this.min = new Date().toISOString().substring(0, 10);
    this.initForm();
  }

  initForm() {
    this.formArticle = new FormGroup({
      'articleSe': this.articleS,
      'title': new FormControl(''),
      'author': new FormControl(''),
      'date': new FormControl(''),
      'content': new FormControl(''),
      'resource': new FormControl(''),
      'description': new FormControl(''),
      'type': new FormControl(''),
      'articleRoot': new FormControl(''),
      'state_act': new FormControl(''),
      'privacity': new FormControl(''),
    });
    this.formResource = this.formBuilder.group({
      fileAr: ['']
    });
  }
  loadKeyword() {
    setTimeout(() => {
      this.serviceKey.consultKeyword().subscribe((result: { data: Keyword[]; }) => {
        if (!result) {
          return;
        };
        this.keywordsCons = result.data;
        for (var i = 0; i < result.data.length; i++) {
          this.allKeyword[i] = result.data[i].name;
        }
        this.keywords.push(this.allKeyword[0]);
      })
    }, 1000);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our objeto
    if ((value || '').trim()) {
      this.keywords.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.objetoCtrl.setValue(null);
  }

  remove(objeto: string): void {
    const index = this.keywords.indexOf(objeto);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var status = false;
    setTimeout(() => {
      for (let key of this.keywords) {
        if (key == event.option.viewValue) {
          status = true;
        }
      }
      if (status == false) {
        this.keywords.push(event.option.viewValue);
        this.objetoCtrl.setValue(null);

      }

    }, 1000);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allKeyword.filter(objeto => objeto.toLowerCase().indexOf(filterValue) === 0);
  }

  addKeyword() {
    this.dialog.open(AddKeywordComponent, {
    });
  }

  changeRadio(event: MatRadioChange) {
    if (event.value == '2') {
      this.showArticles = true;
      this.consultArticles();
    } else {
      this.showArticles = false;
      this.selectedArticle = 0;
    }
  }

  consultArticles() {
    this.serviceKey.consultArticles().subscribe((result: { data: Article[]; }) => {
      if (!result) {
        return;
      };
      this.articlesAll = result.data;
      this.articles = this.articlesAll;
    });
  }
  addArticle() {
    if (this.file != null) {
      this.getBase64(this.file);
    }
    setTimeout(() => {
      if (this.showArticles)
        this.articleReg.article_id = this.formArticle.value["articleSe"];
      this.articleReg.author = this.formArticle.value["author"];
      this.articleReg.content = this.formArticle.value["content"];
      this.articleReg.date = this.formArticle.value["date"];
      this.articleReg.extract = this.formArticle.value["description"];
      this.articleReg.primary_image = this.url;
      for (let keyword of this.keywords) {
        for (let key of this.keywordsCons) {
          if (key.name == keyword) {
            this.keywordSel.push(key.id);
          }
        }
      }
      this.articleReg.keywords = this.keywordSel;
      this.articleReg.state = this.formArticle.value["privacity"];
      this.articleReg.state_act = this.formArticle.value["state_act"];
      this.articleReg.title = this.formArticle.value["title"];
      this.articleReg.total_score = 0;
      this.articleReg.type = this.formArticle.value["type"];
      this.articleReg.visibility = this.formArticle.value["privacity"];
      this.serviceKey.addArticle(this.articleReg).subscribe(data => {
        this.showMessage("Articulo registrado exitosamente", "Insertar");
      }, error => {
        this.showMessage(error, "Insertar");
      });
      this.initForm();
      this.consultArticles();
    }, 1000);
  }
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });

  }

  loadFile(event: any) {
    this.file = event.srcElement.files[0];
    this.formResource.get('fileAr')?.setValue(this.file);
  }

  getBase64(file: any) {

    var image = "";
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      image = reader.result == null ? "" : reader.result.toString();
    };
    setTimeout(() => {
      this.url = image;
      reader.onerror = function (error) {
        console.log(error);;
      };
    }, 1000);

  }

  showData() {
    console.log(this.formArticle.value["content"]);
  }

  cancel() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/usr/articulos`]));
  }

  searchArticle(event: any) {
    setTimeout(() => {
      let keyword = event.target.value;
      this.articles = this.articlesAll.filter(art => art.title.includes(keyword));
    }, 100)
  }
}



