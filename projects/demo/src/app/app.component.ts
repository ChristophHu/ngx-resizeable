import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NgxResizeableDirective, ResizeEvent, ResizeHandleDirective } from '../../../ngx-resizeable/src/public-api';
import { AsyncPipe, CommonModule, NgIf, NgStyle } from '@angular/common';
import { NgxResizeableDirective, ResizeEvent, ResizeHandleDirective } from '@christophhu/ngx-resizeable';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NgxResizeableDirective,
    ResizeHandleDirective,
    RouterOutlet,
    NgStyle,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  user$: Observable<any> = of()

  private readonly _repos = new BehaviorSubject<{}[]>([])
  repos$: Observable<any> = this._repos.asObservable()
  topRepos$: Observable<any> = of()

  events$: Observable<any> = of()
  topEvents$: Observable<any> = of()

  user: any
  repos: any
  username: string = 'christophhu'
  apiURL = "https://api.github.com"

  TOKEN = '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'
  NXT_TOKEN = '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'

  header = {
    headers: {
      Accept: "application/vnd.github.v3.raw+json", "Content-Type": "application/json;charset=UTF-8",
      Authorization: `token ${this.TOKEN}`,
    },
  }
  header_org = {
    headers: {
      Accept: "application/vnd.github.v3.raw+json", "Content-Type": "application/json;charset=UTF-8",
      Authorization: `token ${this.NXT_TOKEN}`,
    },
  }

  constructor(private http: HttpClient) {
    this.getSingleUser(this.username).subscribe(data => {
      this.user = data
       
    })
    this.user$ = this.getSingleUser(this.username)
    this.repos$ = this.getRepos(this.username)
    this.events$ = this.getEvents(this.username)

    this.getRecentUpdates(5)
  }

  getSingleUser(username: string) {
    return this.http.get(`${this.apiURL}/users/${username}`, this.header).pipe(take(1))
  }
  getRepo(name: string) {
    return this.http.get(`${this.apiURL}/repos/${name}`, this.header).pipe(take(1))
  }
  getOrgRepo(org: string) {
    return this.http.get(`${this.apiURL}/repos/${name}`, this.header).pipe(take(1))
  }
  getRepos(username: string) {
    return this.http.get(`${this.apiURL}/users/${username}/repos`, this.header).pipe(take(1))
  }
  getEvents(username: string) {
    return this.http.get(`${this.apiURL}/users/${username}/events`, this.header).pipe(take(1))
  }
  getRecentUpdates(top: number) {
    this.events$
    .pipe(take(1))
    .subscribe(data => {
      let repos: any[] = []
      if (data) {
        data.forEach((repo: any) => {
          if (repo.type == 'PushEvent') repos.push(repo.repo.name)
        })
      }
      Array.from(new Set(repos)).slice(0, top).forEach(repo => {
        this.getRepo(repo).pipe(take(1)).subscribe({
          next: data => {
            console.log('repo', data)
          },
          error: error => {
            this.getOrgRepo(repo).pipe(take(1)).subscribe({
              next: data => {
                console.log('repo', data)
              },
              error: error => {
                console.error('error', error)
              }
            })
          }
        })
      })
      console.log('repos', Array.from(new Set(repos)).slice(0, top))
      this.topEvents$ = of(Array.from(new Set(repos)).slice(0, top))
    })
  }

  public style: object = {}

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50
    if (event.rectangle.width && event.rectangle.height && (event.rectangle.width < MIN_DIMENSIONS_PX || event.rectangle.height < MIN_DIMENSIONS_PX)) {
      return false
    }
    return true
  }

  onResizeEnd(event: any): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    }
  }
}
