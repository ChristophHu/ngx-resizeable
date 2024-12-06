import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NgxResizeableDirective, ResizeEvent, ResizeHandleDirective } from '../../../ngx-resizeable/src/public-api';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { NgxResizeableDirective, ResizeEvent, ResizeHandleDirective } from '@christophhu/ngx-resizeable';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
  repos$: Observable<{}[]> = this._repos.asObservable()

  user: any
  repos: any
  username: string = 'christophhu'
  apiURL = "https://api.github.com/users"

  constructor(private http: HttpClient) {
    this.getSingleUser(this.username).subscribe(data => {
      this.user = data
      console.log(data)
    })
    // this._user.next(this.getSingleUser('christophhu'))
    this.user$ = this.getSingleUser(this.username)
  }

  getSingleUser(username: string) {
    return this.http.get(`${this.apiURL}/${username}`)
  }
  getRepos(username: string) {
    return this.http.get(`${this.apiURL}/${username}/repos`)
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
